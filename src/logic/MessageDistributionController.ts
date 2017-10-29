let _ = require('lodash');
let async = require('async');

import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { BadRequestException } from 'pip-services-commons-node';
import { ConfigException } from 'pip-services-commons-node';
import { NotFoundException } from 'pip-services-commons-node';
import { IOpenable } from 'pip-services-commons-node';

import { EmailSettingsV1 } from 'pip-clients-emailsettings-node';
import { IEmailSettingsClientV1 } from 'pip-clients-emailsettings-node';
import { SmsSettingsV1 } from 'pip-clients-smssettings-node';
import { ISmsSettingsClientV1 } from 'pip-clients-smssettings-node';

import { EmailMessageV1 } from 'pip-clients-email-node';
import { EmailRecipientV1 } from 'pip-clients-email-node';
import { IEmailClientV1 } from 'pip-clients-email-node';
import { SmsMessageV1 } from 'pip-clients-sms-node';
import { SmsRecipientV1 } from 'pip-clients-sms-node';
import { ISmsClientV1 } from 'pip-clients-sms-node';

import { IMessageTemplatesClientV1 } from 'pip-clients-msgtemplates-node';

import { MessageV1 } from '../data/version1/MessageV1';
import { DeliveryMethodV1 } from '../data/version1/DeliveryMethodV1';
import { IMessageDistributionController } from './IMessageDistributionController';
import { MessageDistributionCommandSet } from './MessageDistributionCommandSet';

export class MessageDistributionController implements IConfigurable, IReferenceable, ICommandable, IMessageDistributionController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.emailsettings', 'pip-services-emailsettings:client:*:*:1.0',
        'dependencies.smssettings', 'pip-services-smssettings:client:*:*:1.0',
        'dependencies.emaildelivery', 'pip-services-email:client:*:*:1.0',
        'dependencies.smsdelivery', 'pip-services-sms:client:*:*:1.0',
        'dependencies.msgtemplates', 'pip-services-msgtemplates:client:*:*:1.0'
    );

    private _config: ConfigParams = new ConfigParams();
    private _dependencyResolver: DependencyResolver = new DependencyResolver(MessageDistributionController._defaultConfig);
    private _emailSettingsClient: IEmailSettingsClientV1;
    private _smsSettingsClient: ISmsSettingsClientV1;
    private _emailDeliveryClient: IEmailClientV1;
    private _smsDeliveryClient: ISmsClientV1;
    private _templatesClient: IMessageTemplatesClientV1;
    private _commandSet: MessageDistributionCommandSet;

    public configure(config: ConfigParams): void {
        config = config.setDefaults(MessageDistributionController._defaultConfig);
        this._dependencyResolver.configure(config);
        this._config = config;
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);

        this._emailSettingsClient = this._dependencyResolver.getOneOptional<IEmailSettingsClientV1>('emailsettings');
        this._smsSettingsClient = this._dependencyResolver.getOneOptional<ISmsSettingsClientV1>('smssettings');
        this._emailDeliveryClient = this._dependencyResolver.getOneOptional<IEmailClientV1>('emaildelivery');
        this._smsDeliveryClient = this._dependencyResolver.getOneOptional<ISmsClientV1>('smsdelivery');
        this._templatesClient = this._dependencyResolver.getOneOptional<IMessageTemplatesClientV1>('msgtemplates');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new MessageDistributionCommandSet(this);
        return this._commandSet;
    }

    public sendMessageToRecipient(correlationId: string, recipientId: string, subscription: string,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void) {
        
        this.sendMessageToRecipients(correlationId, [ recipientId ], subscription, message, parameters, method, callback);
    }
    
    private getMessage(correlationId: string, message: MessageV1,
        callback: (err: any, message: MessageV1) => void): void {
        // Validate for present message
        if (message == null) {
            let err = new BadRequestException(
                correlationId,
                'MSG_MISSING',
                'Message cannot be null'
            );
            callback(err, null);
            return;
        }

        // Process regular messages
        if (message.template == null) {
            if (message.subject == null && message.html == null && message.text == null) {
                let err = new BadRequestException(
                    correlationId,
                    'MSG_EMPTY',
                    'Message subject, text and html cannot all be empty at the same time'
                );
                callback(err, null);
                return;
            }

            callback(null, message);
            return;
        }

        // Process message templates
        if (this._templatesClient == null) {
            let err = new ConfigException(
                correlationId,
                'MSG_TEMPLATE_CLIENT_UNDEFINED',
                'MessageTemplateClient is not defined'
            );
            callback(err, null);
            return;
        }

        // Retrieve template from message template service
        this._templatesClient.getTemplateByIdOrName(correlationId, message.template, (err, template) => {
            if (err == null && template == null) {
                err = new NotFoundException(
                    correlationId,
                    'MSG_TEMPLATE_NOT_FOUND',
                    'Message template ' + message.template + ' was not found',
                ).withDetails('name', message.template);
            }

            if (err) {
                callback(err, null);
            } else {
                let message = <MessageV1> {
                    from: template.from,
                    subject: template.subject,
                    text: template.text,
                    html: template.html
                };

                callback(null, message);
            }
        });
    }

    private sendEmailMessages(correlationId: string, recipientIds: string[], subscription: string,
        message: MessageV1, parameters: ConfigParams,
        callback: (err: any) => void): void {

        let settings: EmailSettingsV1[];
        let recipients: EmailRecipientV1[];
            
        if (this._emailSettingsClient == null || this._emailSettingsClient == null) {
            callback(null);
            return;
        }

        async.series([
            // Retrieve recipient settings
            (callback) => {
                this._emailSettingsClient.getSettingsByIds(correlationId, recipientIds, (err, data) => {
                    settings = data;
                    callback(err);
                });
            },
            // Define recipients recipients
            (callback) => {
                if (subscription) {
                    // To send via subscriptions email must be verified
                    settings = _.filter(settings, s => s.verified);

                    // Check subscriptions (defined means allowed)
                    settings = _.filter(settings, s => {
                        let subscriptions = s.subscriptions || {};
                        return _.isEmpty(subscriptions) || subscriptions[subscription];
                    });
                }
                
                // Define recipients
                recipients = _.map(settings, s => <EmailRecipientV1>{ 
                    id: s.id,
                    name: s.name,
                    email: s.email,
                    language: s.language
                });

                callback();
            },
            // Deliver messages
            (callback) => {
                if (recipients.length == 0) {
                    callback();
                    return;
                }

                let emailMessage = <EmailMessageV1>{
                    from: message.from,
                    subject: message.subject,
                    text: message.text,
                    html: message.html
                };

                this._emailDeliveryClient.sendMessageToRecipients(
                    correlationId, recipients, emailMessage, parameters, callback
                );
            }
        ], callback);
    }

    private sendSmsMessages(correlationId: string, recipientIds: string[], subscription: string,
        message: MessageV1, parameters: ConfigParams,
        callback: (err: any) => void): void {
            
        let settings: SmsSettingsV1[];
        let recipients: SmsRecipientV1[];
            
        if (this._smsSettingsClient == null || this._smsSettingsClient == null) {
            callback(null);
            return;
        }

        async.series([
            // Retrieve recipient settings
            (callback) => {
                this._smsSettingsClient.getSettingsByIds(correlationId, recipientIds, (err, data) => {
                    settings = data;
                    callback(err);
                });
            },
            // Define recipients recipients
            (callback) => {
                if (subscription) {
                    // To send via subscriptions email must be verified
                    settings = _.filter(settings, s => s.verified);

                    // Check subscriptions (defined means allowed)
                    settings = _.filter(settings, s => {
                        let subscriptions = s.subscriptions || {};
                        return _.isEmpty(subscriptions) || subscriptions[subscription];
                    });
                }
                
                // Define recipients
                recipients = _.map(settings, s => <SmsRecipientV1>{ 
                    id: s.id,
                    name: s.name,
                    phone: s.phone,
                    language: s.language
                });

                callback();
            },
            // Deliver messages
            (callback) => {
                if (recipients.length == 0) {
                    callback();
                    return;
                }

                let smsMessage = <SmsMessageV1>{
                    from: message.from,
                    text: message.text || message.subject,
                };
                
                this._smsDeliveryClient.sendMessageToRecipients(
                    correlationId, recipients, smsMessage, parameters, callback
                );
            }
        ], callback);
    }
    
    public sendMessageToRecipients(correlationId: string, recipientIds: string[], subscription: string,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void): void {

        async.series([
            // Validate message or retrieve template
            (callback) => {
                this.getMessage(correlationId, message, (err, newMessage) => {
                    message = newMessage;
                    callback(err);
                });
            },
            // Deliver messages
            (callback) => {
                async.parallel([
                    // Send via Email
                    (callback) => {
                        if (method == DeliveryMethodV1.Email || method == DeliveryMethodV1.All)
                            this.sendEmailMessages(correlationId, recipientIds, subscription, message, parameters, callback);
                        else callback();
                    },
                    // Send via SMS
                    (callback) => {
                        if (method == DeliveryMethodV1.Sms || method == DeliveryMethodV1.All)
                            this.sendSmsMessages(correlationId, recipientIds, subscription, message, parameters, callback);
                        else callback();
                    }
                ], callback);
            },
        ], callback);
    }

}

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
import { RecipientV1 } from '../data/version1/RecipientV1';
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
                let message = <MessageV1>{
                    from: template.from,
                    subject: template.subject,
                    text: template.text,
                    html: template.html
                };

                callback(null, message);
            }
        });
    }

    private sendEmailMessages(correlationId: string, recipients: any[],
        message: MessageV1, parameters: ConfigParams,
        callback: (err: any) => void): void {

        console.log("!!! sendEmailMessages ")

        if (this._emailDeliveryClient == null) {
            let err = new ConfigException(
                correlationId,
                'EMAIL_DELIVERY_CLIENT_UNDEFINED',
                'Email client is not defined'
            );
            console.log("!!! _emailDeliveryClient == null")
            callback(err);
            return;
        }

        let emailMessage = <EmailMessageV1>{
            from: message.from,
            subject: message.subject,
            text: message.text,
            html: message.html
        };

        let emailRecipients = _.filter(recipients, r => r.email != null);

        if (emailRecipients.length == 0) {
            console.log("!!! emailRecipients.length == 0 ")
            let err = new BadRequestException(
                correlationId,
                'NO_EMAIL_RECIPIENTS',
                'email recipients.email not set; emailRecipients.length equals 0'
            );
            callback(err);
            return;
        }

        this._emailDeliveryClient.sendMessageToRecipients(
            correlationId, emailRecipients, emailMessage, parameters, callback
        );
    }

    private sendSmsMessages(correlationId: string, recipients: any[],
        message: MessageV1, parameters: ConfigParams,
        callback: (err: any) => void): void {

        if (this._smsDeliveryClient == null) {
            let err = new ConfigException(
                correlationId,
                'SMS_DELIVERY_CLIENT_UNDEFINED',
                'Sms client is not defined'
            );
            callback(err);
            return;
        }

        let smsMessage = <SmsMessageV1>{
            from: message.from,
            text: message.text || message.subject,
        };
        let smsRecipients = _.filter(recipients, r => r.phone != null);

        if (smsRecipients.length == 0) {
            let err = new BadRequestException(
                correlationId,
                'NO_SMS_RECIPIENTS',
                'sms recipients.phone not set; smsRecipients.length equals 0'
            );
            callback(err);
            return;
        }

        this._smsDeliveryClient.sendMessageToRecipients(
            correlationId, smsRecipients, smsMessage, parameters, callback
        );
    }


    public sendMessage(correlationId: string, recipient: RecipientV1,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void) {

        this.sendMessages(correlationId, [recipient], message, parameters, method, callback);
    }

    public sendMessages(correlationId: string, recipients: RecipientV1[],
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void): void {

        console.log("!!! sendMessages ")

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
                            this.sendEmailMessages(correlationId, recipients, message, parameters, callback);
                        else callback();
                    },
                    // Send via SMS
                    (callback) => {
                        if (method == DeliveryMethodV1.Sms || method == DeliveryMethodV1.All)
                            this.sendSmsMessages(correlationId, recipients, message, parameters, callback);
                        else callback();
                    }
                ], callback);
            },
        ], callback);
    }

    private sendEmailMessageToRecipients(correlationId: string, recipientIds: string[], subscription: string,
        message: MessageV1, parameters: ConfigParams,
        callback: (err: any) => void): void {

        let settings: EmailSettingsV1[];
        let recipients: EmailRecipientV1[];

        if (this._emailDeliveryClient == null || this._emailSettingsClient == null) {
            let err = new ConfigException(
                correlationId,
                'EMAIL_OR_EMAIL_SETTINGS_CLIENT_UNDEFINED',
                'Email or emailSettings client is not defined'
            );
            callback(err);
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
                this.sendEmailMessages(correlationId, recipients, message, parameters, callback);
            }
        ], callback);
    }

    private sendSmsMessageToRecipients(correlationId: string, recipientIds: string[], subscription: string,
        message: MessageV1, parameters: ConfigParams,
        callback: (err: any) => void): void {

        let settings: SmsSettingsV1[];
        let recipients: SmsRecipientV1[];

        if (this._smsDeliveryClient == null || this._smsSettingsClient == null) {
            let err = new ConfigException(
                correlationId,
                'SMS_OR_SMS_SETTINGS_CLIENT_UNDEFINED',
                'Sms or smsSettings client is not defined'
            );
            callback(err);
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
                this.sendSmsMessages(correlationId, recipients, message, parameters, callback);
            }
        ], callback);
    }

    public sendMessageToRecipient(correlationId: string, recipientId: string, subscription: string,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void) {

        this.sendMessageToRecipients(correlationId, [recipientId], subscription, message, parameters, method, callback);
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
                            this.sendEmailMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, callback);
                        else callback();
                    },
                    // Send via SMS
                    (callback) => {
                        if (method == DeliveryMethodV1.Sms || method == DeliveryMethodV1.All)
                            this.sendSmsMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, callback);
                        else callback();
                    }
                ], callback);
            },
        ], callback);
    }

}

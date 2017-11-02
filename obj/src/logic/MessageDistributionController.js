"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const DeliveryMethodV1_1 = require("../data/version1/DeliveryMethodV1");
const MessageDistributionCommandSet_1 = require("./MessageDistributionCommandSet");
class MessageDistributionController {
    constructor() {
        this._config = new pip_services_commons_node_1.ConfigParams();
        this._dependencyResolver = new pip_services_commons_node_2.DependencyResolver(MessageDistributionController._defaultConfig);
    }
    configure(config) {
        config = config.setDefaults(MessageDistributionController._defaultConfig);
        this._dependencyResolver.configure(config);
        this._config = config;
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._emailSettingsClient = this._dependencyResolver.getOneOptional('emailsettings');
        this._smsSettingsClient = this._dependencyResolver.getOneOptional('smssettings');
        this._emailDeliveryClient = this._dependencyResolver.getOneOptional('emaildelivery');
        this._smsDeliveryClient = this._dependencyResolver.getOneOptional('smsdelivery');
        this._templatesClient = this._dependencyResolver.getOneOptional('msgtemplates');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new MessageDistributionCommandSet_1.MessageDistributionCommandSet(this);
        return this._commandSet;
    }
    getMessage(correlationId, message, callback) {
        // Validate for present message
        if (message == null) {
            let err = new pip_services_commons_node_3.BadRequestException(correlationId, 'MSG_MISSING', 'Message cannot be null');
            callback(err, null);
            return;
        }
        // Process regular messages
        if (message.template == null) {
            if (message.subject == null && message.html == null && message.text == null) {
                let err = new pip_services_commons_node_3.BadRequestException(correlationId, 'MSG_EMPTY', 'Message subject, text and html cannot all be empty at the same time');
                callback(err, null);
                return;
            }
            callback(null, message);
            return;
        }
        // Process message templates
        if (this._templatesClient == null) {
            let err = new pip_services_commons_node_4.ConfigException(correlationId, 'MSG_TEMPLATE_CLIENT_UNDEFINED', 'MessageTemplateClient is not defined');
            callback(err, null);
            return;
        }
        // Retrieve template from message template service
        this._templatesClient.getTemplateByIdOrName(correlationId, message.template, (err, template) => {
            if (err == null && template == null) {
                err = new pip_services_commons_node_5.NotFoundException(correlationId, 'MSG_TEMPLATE_NOT_FOUND', 'Message template ' + message.template + ' was not found').withDetails('name', message.template);
            }
            if (err) {
                callback(err, null);
            }
            else {
                let message = {
                    from: template.from,
                    subject: template.subject,
                    text: template.text,
                    html: template.html
                };
                callback(null, message);
            }
        });
    }
    sendEmailMessages(correlationId, recipients, message, parameters, callback) {
        if (recipients.length == 0) {
            callback(null);
            return;
        }
        let emailMessage = {
            from: message.from,
            subject: message.subject,
            text: message.text,
            html: message.html
        };
        let emailRecipients = _.filter(recipients, r => r.email != null);
        this._emailDeliveryClient.sendMessageToRecipients(correlationId, emailRecipients, emailMessage, parameters, callback);
    }
    sendSmsMessages(correlationId, recipients, message, parameters, callback) {
        if (recipients.length == 0) {
            callback(null);
            return;
        }
        let smsMessage = {
            from: message.from,
            text: message.text || message.subject,
        };
        let smsRecipients = _.filter(recipients, r => r.phone != null);
        this._smsDeliveryClient.sendMessageToRecipients(correlationId, smsRecipients, smsMessage, parameters, callback);
    }
    sendMessage(correlationId, recipient, message, parameters, method, callback) {
        this.sendMessages(correlationId, [recipient], message, parameters, method, callback);
    }
    sendMessages(correlationId, recipients, message, parameters, method, callback) {
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
                        if (method == DeliveryMethodV1_1.DeliveryMethodV1.Email || method == DeliveryMethodV1_1.DeliveryMethodV1.All)
                            this.sendEmailMessages(correlationId, recipients, message, parameters, callback);
                        else
                            callback();
                    },
                    // Send via SMS
                    (callback) => {
                        if (method == DeliveryMethodV1_1.DeliveryMethodV1.Sms || method == DeliveryMethodV1_1.DeliveryMethodV1.All)
                            this.sendSmsMessages(correlationId, recipients, message, parameters, callback);
                        else
                            callback();
                    }
                ], callback);
            },
        ], callback);
    }
    sendEmailMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, callback) {
        let settings;
        let recipients;
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
                recipients = _.map(settings, s => ({
                    id: s.id,
                    name: s.name,
                    email: s.email,
                    language: s.language
                }));
                callback();
            },
            // Deliver messages
            (callback) => {
                this.sendEmailMessages(correlationId, recipients, message, parameters, callback);
            }
        ], callback);
    }
    sendSmsMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, callback) {
        let settings;
        let recipients;
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
                recipients = _.map(settings, s => ({
                    id: s.id,
                    name: s.name,
                    phone: s.phone,
                    language: s.language
                }));
                callback();
            },
            // Deliver messages
            (callback) => {
                this.sendSmsMessages(correlationId, recipients, message, parameters, callback);
            }
        ], callback);
    }
    sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, callback) {
        this.sendMessageToRecipients(correlationId, [recipientId], subscription, message, parameters, method, callback);
    }
    sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, callback) {
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
                        if (method == DeliveryMethodV1_1.DeliveryMethodV1.Email || method == DeliveryMethodV1_1.DeliveryMethodV1.All)
                            this.sendEmailMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, callback);
                        else
                            callback();
                    },
                    // Send via SMS
                    (callback) => {
                        if (method == DeliveryMethodV1_1.DeliveryMethodV1.Sms || method == DeliveryMethodV1_1.DeliveryMethodV1.All)
                            this.sendSmsMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, callback);
                        else
                            callback();
                    }
                ], callback);
            },
        ], callback);
    }
}
MessageDistributionController._defaultConfig = pip_services_commons_node_1.ConfigParams.fromTuples('dependencies.emailsettings', 'pip-services-emailsettings:client:*:*:1.0', 'dependencies.smssettings', 'pip-services-smssettings:client:*:*:1.0', 'dependencies.emaildelivery', 'pip-services-email:client:*:*:1.0', 'dependencies.smsdelivery', 'pip-services-sms:client:*:*:1.0', 'dependencies.msgtemplates', 'pip-services-msgtemplates:client:*:*:1.0');
exports.MessageDistributionController = MessageDistributionController;
//# sourceMappingURL=MessageDistributionController.js.map
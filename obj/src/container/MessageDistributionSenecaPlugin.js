"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
const pip_services_net_node_2 = require("pip-services-net-node");
const pip_clients_emailsettings_node_1 = require("pip-clients-emailsettings-node");
const pip_clients_smssettings_node_1 = require("pip-clients-smssettings-node");
const pip_clients_emaildelivery_node_1 = require("pip-clients-emaildelivery-node");
const pip_clients_msgtemplates_node_1 = require("pip-clients-msgtemplates-node");
const MessageDistributionController_1 = require("../logic/MessageDistributionController");
const MessageDistributionSenecaServiceV1_1 = require("../services/version1/MessageDistributionSenecaServiceV1");
class MessageDistributionSenecaPlugin extends pip_services_net_node_1.SenecaPlugin {
    constructor(seneca, options) {
        super('pip-services-msgdistribution', seneca, MessageDistributionSenecaPlugin.createReferences(seneca, options));
    }
    static createReferences(seneca, options) {
        options = options || {};
        let logger = new pip_services_commons_node_4.ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(pip_services_commons_node_3.ConfigParams.fromValue(loggerOptions));
        let emailSettingsClient = new pip_clients_emailsettings_node_1.EmailSettingsSenecaClientV1();
        let emailSettingsOptions = options.emailsettings || {};
        emailSettingsClient.configure(pip_services_commons_node_3.ConfigParams.fromValue(emailSettingsOptions));
        let smsSettingsClient = new pip_clients_smssettings_node_1.SmsSettingsSenecaClientV1();
        let smsSettingsOptions = options.smssettings || {};
        smsSettingsClient.configure(pip_services_commons_node_3.ConfigParams.fromValue(smsSettingsOptions));
        let emailDeliveryClient = new pip_clients_emaildelivery_node_1.EmailDeliverySenecaClientV1();
        let emailDeliveryOptions = options.emaildelivery || {};
        emailDeliveryClient.configure(pip_services_commons_node_3.ConfigParams.fromValue(emailDeliveryOptions));
        let smsDeliveryClient = new pip_clients_emaildelivery_node_1.EmailDeliverySenecaClientV1();
        let smsDeliveryOptions = options.smsdelivery || {};
        smsDeliveryClient.configure(pip_services_commons_node_3.ConfigParams.fromValue(smsDeliveryOptions));
        let messageTemplatesClient = new pip_clients_msgtemplates_node_1.MessageTemplatesSenecaClientV1();
        let messageTemplatesOptions = options.msgtemplates || {};
        messageTemplatesClient.configure(pip_services_commons_node_3.ConfigParams.fromValue(messageTemplatesOptions));
        let controller = new MessageDistributionController_1.MessageDistributionController();
        controller.configure(pip_services_commons_node_3.ConfigParams.fromValue(options));
        let service = new MessageDistributionSenecaServiceV1_1.MessageDistributionSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(pip_services_commons_node_3.ConfigParams.fromValue(serviceOptions));
        let senecaInstance = new pip_services_net_node_2.SenecaInstance(seneca);
        return pip_services_commons_node_1.References.fromTuples(new pip_services_commons_node_2.Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger, new pip_services_commons_node_2.Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance, new pip_services_commons_node_2.Descriptor('pip-services-emailsettings', 'client', 'seneca', 'default', '1.0'), emailSettingsClient, new pip_services_commons_node_2.Descriptor('pip-services-smssettings', 'client', 'seneca', 'default', '1.0'), smsSettingsClient, new pip_services_commons_node_2.Descriptor('pip-services-emaildelivery', 'client', 'seneca', 'default', '1.0'), emailDeliveryClient, new pip_services_commons_node_2.Descriptor('pip-services-smsdelivery', 'client', 'seneca', 'default', '1.0'), smsDeliveryClient, new pip_services_commons_node_2.Descriptor('pip-services-msgtemplates', 'client', 'seneca', 'default', '1.0'), messageTemplatesClient, new pip_services_commons_node_2.Descriptor('pip-services-msgdistribution', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_2.Descriptor('pip-services-msgdistribution', 'service', 'seneca', 'default', '1.0'), service);
    }
}
exports.MessageDistributionSenecaPlugin = MessageDistributionSenecaPlugin;
module.exports = function (options) {
    let seneca = this;
    let plugin = new MessageDistributionSenecaPlugin(seneca, options);
    return { name: plugin.name };
};
//# sourceMappingURL=MessageDistributionSenecaPlugin.js.map
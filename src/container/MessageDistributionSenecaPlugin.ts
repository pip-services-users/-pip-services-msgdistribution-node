import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { ConsoleLogger } from 'pip-services-components-node';
import { ConfigException } from 'pip-services-commons-node';
import { SenecaPlugin } from 'pip-services-seneca-node';
import { SenecaInstance } from 'pip-services-seneca-node';

import { EmailSettingsSenecaClientV1 } from 'pip-clients-emailsettings-node';
import { SmsSettingsSenecaClientV1 } from 'pip-clients-smssettings-node';
import { EmailSenecaClientV1 } from 'pip-clients-email-node';
import { SmsSenecaClientV1 } from 'pip-clients-sms-node';
import { MessageTemplatesSenecaClientV1 } from 'pip-clients-msgtemplates-node';

import { MessageDistributionController } from '../logic/MessageDistributionController';
import { MessageDistributionSenecaServiceV1 } from '../services/version1/MessageDistributionSenecaServiceV1';

export class MessageDistributionSenecaPlugin extends SenecaPlugin {
    public constructor(seneca: any, options: any) {
        super('pip-services-msgdistribution', seneca, MessageDistributionSenecaPlugin.createReferences(seneca, options));
    }

    private static createReferences(seneca: any, options: any): References {
        options = options || {};

        let logger = new ConsoleLogger();
        let loggerOptions = options.logger || {};
        logger.configure(ConfigParams.fromValue(loggerOptions));

        let emailSettingsClient = new EmailSettingsSenecaClientV1();
        let emailSettingsOptions = options.emailsettings || {};
        emailSettingsClient.configure(ConfigParams.fromValue(emailSettingsOptions));

        let smsSettingsClient = new SmsSettingsSenecaClientV1();
        let smsSettingsOptions = options.smssettings || {};
        smsSettingsClient.configure(ConfigParams.fromValue(smsSettingsOptions));

        let emailDeliveryClient = new EmailSenecaClientV1();
        let emailDeliveryOptions = options.emaildelivery || {};
        emailDeliveryClient.configure(ConfigParams.fromValue(emailDeliveryOptions));

        let smsDeliveryClient = new EmailSenecaClientV1();
        let smsDeliveryOptions = options.smsdelivery || {};
        smsDeliveryClient.configure(ConfigParams.fromValue(smsDeliveryOptions));

        let messageTemplatesClient = new MessageTemplatesSenecaClientV1();
        let messageTemplatesOptions = options.msgtemplates || {};
        messageTemplatesClient.configure(ConfigParams.fromValue(messageTemplatesOptions));

        let controller = new MessageDistributionController();
        controller.configure(ConfigParams.fromValue(options));

        let service = new MessageDistributionSenecaServiceV1();
        let serviceOptions = options.service || {};
        service.configure(ConfigParams.fromValue(serviceOptions));

        let senecaInstance = new SenecaInstance(seneca);

        return References.fromTuples(
            new Descriptor('pip-services-commons', 'logger', 'console', 'default', '1.0'), logger,
            new Descriptor('pip-services-net', 'seneca', 'instance', 'default', '1.0'), senecaInstance,
            new Descriptor('pip-services-emailsettings', 'client', 'seneca', 'default', '1.0'), emailSettingsClient,
            new Descriptor('pip-services-smssettings', 'client', 'seneca', 'default', '1.0'), smsSettingsClient,
            new Descriptor('pip-services-email', 'client', 'seneca', 'default', '1.0'), emailDeliveryClient,
            new Descriptor('pip-services-sms', 'client', 'seneca', 'default', '1.0'), smsDeliveryClient,
            new Descriptor('pip-services-msgtemplates', 'client', 'seneca', 'default', '1.0'), messageTemplatesClient,
            new Descriptor('pip-services-msgdistribution', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgdistribution', 'service', 'seneca', 'default', '1.0'), service
        );
    }
}

module.exports = function(options: any): any {
    let seneca = this;
    let plugin = new MessageDistributionSenecaPlugin(seneca, options);
    return { name: plugin.name };
}
import { Descriptor } from 'pip-services-commons-node';
import { CommandableLambdaFunction } from 'pip-services-aws-node';

import { EmailSettingsClientFactory } from 'pip-clients-emailsettings-node';
import { SmsSettingsClientFactory } from 'pip-clients-smssettings-node';
import { EmailDeliveryClientFactory } from 'pip-clients-emaildelivery-node';
import { SmsDeliveryClientFactory } from 'pip-clients-smsdelivery-node';
import { MessageTemplatesClientFactory } from 'pip-clients-msgtemplates-node';

import { MessageDistributionServiceFactory } from '../build/MessageDistributionServiceFactory';

export class MessageDistributionLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("msg_distribution", "Message distribution function");
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgdistribution', 'controller', 'default', '*', '*'));
        this._factories.add(new MessageDistributionServiceFactory());
        this._factories.add(new EmailSettingsClientFactory());
        this._factories.add(new SmsSettingsClientFactory());
        this._factories.add(new EmailDeliveryClientFactory());
        this._factories.add(new SmsDeliveryClientFactory());
        this._factories.add(new MessageTemplatesClientFactory());
    }
}

export const handler = new MessageDistributionLambdaFunction().getHandler();
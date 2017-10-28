let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';

import { EmailSettingsMemoryClientV1 } from 'pip-clients-emailsettings-node';
import { SmsSettingsMemoryClientV1 } from 'pip-clients-smssettings-node';
import { EmailDeliveryNullClientV1 } from 'pip-clients-emaildelivery-node';
import { SmsDeliveryNullClientV1 } from 'pip-clients-smsdelivery-node';

import { MessageV1 } from '../../src/data/version1/MessageV1';
import { DeliveryMethodV1 } from '../../src/data/version1/DeliveryMethodV1';
import { MessageTemplatesMockClientV1 } from './MessageTemplatesMockClientV1';
import { MessageDistributionController } from '../../src/logic/MessageDistributionController';

suite('MessageDistributionController', ()=> {
    let controller: MessageDistributionController;

    setup(() => {
        controller = new MessageDistributionController();

        let emailSettingsClient = new EmailSettingsMemoryClientV1();
        emailSettingsClient.setSettings(null, { id: '1', name: 'User 1', email: 'somebody@somewhere.com' });

        let smsSettingsClient = new SmsSettingsMemoryClientV1();
        smsSettingsClient.setSettings(null, { id: '1', name: 'User 1', phone: '+12345678901' });

        let emailDeliveryClient = new EmailDeliveryNullClientV1();
        let smsDeliveryClient = new SmsDeliveryNullClientV1();
        let templatesClient = new MessageTemplatesMockClientV1();

        let references: References = References.fromTuples(
            new Descriptor('pip-services-emailsettings', 'client', 'memory', 'default', '1.0'), emailSettingsClient,
            new Descriptor('pip-services-smssettings', 'client', 'memory', 'default', '1.0'), smsSettingsClient,
            new Descriptor('pip-services-emaildelivery', 'client', 'null', 'default', '1.0'), emailDeliveryClient,
            new Descriptor('pip-services-smsdelivery', 'client', 'null', 'default', '1.0'), smsDeliveryClient,
            new Descriptor('pip-services-msgtemplates', 'client', 'mock', 'default', '1.0'), templatesClient,
            new Descriptor('pip-services-msgdistribution', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);
    });
    
    test('Send Message to Recipients', function (done) {
        let message = <MessageV1> {
            subject: 'Test subject',
            text: 'Test text',
            html: 'Test html'
        };

        controller.sendMessageToRecipients(
            null, [ '1', '2' ], null, message, null, DeliveryMethodV1.All,
            (err) => {
                assert.isNull(err);
                done();
            }
        );
    });

    test('Send Message using Template', function (done) {
        let message = <MessageV1> {
            template: 'test'
        };

        controller.sendMessageToRecipient(
            null, '1', null, message, null, DeliveryMethodV1.All,
            (err) => {
                assert.isNull(err);
                done();
            }
        );
    });
    
});
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

import { MessageV1 } from '../../../src/data/version1/MessageV1';
import { DeliveryMethodV1 } from '../../../src/data/version1/DeliveryMethodV1';
import { MessageTemplatesMockClientV1 } from '../../logic/MessageTemplatesMockClientV1';
import { MessageDistributionController } from '../../../src/logic/MessageDistributionController';
import { MessageDistributionHttpServiceV1 } from '../../../src/services/version1/MessageDistributionHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('MessageDistributionHttpServiceV1', ()=> {
    let service: MessageDistributionHttpServiceV1;

    let rest: any;

    suiteSetup((done) => {
        let controller = new MessageDistributionController();
        controller.configure(new ConfigParams());

        let emailSettingsClient = new EmailSettingsMemoryClientV1();
        emailSettingsClient.setSettings(null, { id: '1', name: 'User 1', email: 'somebody@somewhere.com' });

        let smsSettingsClient = new SmsSettingsMemoryClientV1();
        smsSettingsClient.setSettings(null, { id: '1', name: 'User 1', phone: '+12345678901' });

        let emailDeliveryClient = new EmailDeliveryNullClientV1();
        let smsDeliveryClient = new SmsDeliveryNullClientV1();
        let templatesClient = new MessageTemplatesMockClientV1();
        
        service = new MessageDistributionHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-emailsettings', 'client', 'memory', 'default', '1.0'), emailSettingsClient,
            new Descriptor('pip-services-smssettings', 'client', 'memory', 'default', '1.0'), smsSettingsClient,
            new Descriptor('pip-services-emaildelivery', 'client', 'null', 'default', '1.0'), emailDeliveryClient,
            new Descriptor('pip-services-smsdelivery', 'client', 'null', 'default', '1.0'), smsDeliveryClient,
            new Descriptor('pip-services-msgtemplates', 'client', 'mock', 'default', '1.0'), templatesClient,
            new Descriptor('pip-services-msgdistribution', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgdistribution', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });

    test('Send Message to Recipients', function (done) {
        let message = <MessageV1> {
            subject: 'Test subject',
            text: 'Test text',
            html: 'Test html'
        };

        rest.post('/msg_distribution/send_message_to_recipients',
            {
                recipient_ids: [ '1', '2' ], 
                message: message, 
                method: DeliveryMethodV1.All
            },
            (err, req, res, result) => {
                assert.isNull(err);
                done();
            }
        );
    });

    test('Send Message using Template', function (done) {
        let message = <MessageV1> {
            template: 'test'
        };

        rest.post('/msg_distribution/send_message_to_recipient',
            {
                recipient_id: '1', 
                message: message, 
                method: DeliveryMethodV1.All
            },
            (err, req, res, result) => {
                assert.isNull(err);
                done();
            }
        );
    });
        
});
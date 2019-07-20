let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { EmailSettingsMemoryClientV1 } from 'pip-clients-emailsettings-node';
import { SmsSettingsMemoryClientV1 } from 'pip-clients-smssettings-node';
import { EmailNullClientV1 } from 'pip-clients-email-node';
import { SmsNullClientV1 } from 'pip-clients-sms-node';

import { MessageV1 } from '../../../src/data/version1/MessageV1';
import { RecipientV1 } from '../../../src/data/version1/RecipientV1';
import { DeliveryMethodV1 } from '../../../src/data/version1/DeliveryMethodV1';
import { MessageTemplatesMockClientV1 } from '../../logic/MessageTemplatesMockClientV1';
import { MessageDistributionController } from '../../../src/logic/MessageDistributionController';
import { MessageDistributionCommandableGrpcServiceV1 } from '../../../src/services/version1/MessageDistributionCommandableGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('MessageDistributionCommandableGrpcServiceV1', ()=> {
    let service: MessageDistributionCommandableGrpcServiceV1;

    let client: any;

    suiteSetup((done) => {
        let controller = new MessageDistributionController();

        let emailSettingsClient = new EmailSettingsMemoryClientV1();
        emailSettingsClient.setSettings(null, { id: '1', name: 'User 1', email: 'somebody@somewhere.com' });

        let smsSettingsClient = new SmsSettingsMemoryClientV1();
        smsSettingsClient.setSettings(null, { id: '1', name: 'User 1', phone: '+12345678901' });

        let emailDeliveryClient = new EmailNullClientV1();
        let smsDeliveryClient = new SmsNullClientV1();
        let templatesClient = new MessageTemplatesMockClientV1();
        
        service = new MessageDistributionCommandableGrpcServiceV1();
        service.configure(grpcConfig);

        let references: References = References.fromTuples(
            new Descriptor('pip-services-emailsettings', 'client', 'memory', 'default', '1.0'), emailSettingsClient,
            new Descriptor('pip-services-smssettings', 'client', 'memory', 'default', '1.0'), smsSettingsClient,
            new Descriptor('pip-services-email', 'client', 'null', 'default', '1.0'), emailDeliveryClient,
            new Descriptor('pip-services-sms', 'client', 'null', 'default', '1.0'), smsDeliveryClient,
            new Descriptor('pip-services-msgtemplates', 'client', 'mock', 'default', '1.0'), templatesClient,
            new Descriptor('pip-services-msgdistribution', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('pip-services-msgdistribution', 'service', 'grpc', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let packageDefinition = protoLoader.loadSync(
            __dirname + "../../../../../node_modules/pip-services3-grpc-node/src/protos/commandable.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).commandable.Commandable;

        client = new clientProto('localhost:3000', grpc.credentials.createInsecure());
    });

    test('Send Message', function (done) {
        let message = <MessageV1> {
            subject: 'Test subject',
            text: 'Test text',
            html: 'Test html'
        };
        let recipient = <RecipientV1> {
            name: 'User 1',
            email: 'somebody@somewhere.com',
            phone: '+1233452345'
        }

        client.invoke(
            {
                method: 'v1/msg_distribution.send_message',
                args_empty: false,
                args_json: JSON.stringify({ 
                    recipient: recipient, 
                    message: message, 
                    method: DeliveryMethodV1.All
                })
            },
            (err, response) => {
                assert.isNull(err);

                assert.isTrue(response.result_empty);

                done();
            }
        );
    });

    test('Send Message to Recipients', function (done) {
        let message = <MessageV1> {
            subject: 'Test subject',
            text: 'Test text',
            html: 'Test html'
        };

        client.invoke(
            {
                method: 'v1/msg_distribution.send_message_to_recipients',
                args_empty: false,
                args_json: JSON.stringify({ 
                    recipient_ids: [ '1', '2' ], 
                    message: message, 
                    method: DeliveryMethodV1.All
                })
            },
            (err, response) => {
                assert.isNull(err);

                assert.isTrue(response.result_empty);

                done();
            }
        );
    });

    test('Send Message using Template', function (done) {
        let message = <MessageV1> {
            template: 'test'
        };

        client.invoke(
            {
                method: 'v1/msg_distribution.send_message_to_recipient',
                args_empty: false,
                args_json: JSON.stringify({ 
                    recipient_id: '1', 
                    message: message, 
                    method: DeliveryMethodV1.All
                })
            },
            (err, response) => {
                assert.isNull(err);

                assert.isTrue(response.result_empty);

                done();
            }
        );
    });

});

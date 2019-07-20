let assert = require('chai').assert;
let grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
let async = require('async');

let services = require('../../../../src/protos/msgdistribution_v1_grpc_pb');
let messages = require('../../../../src/protos/msgdistribution_v1_pb');

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
import { MessageDistributionGrpcServiceV1 } from '../../../src/services/version1/MessageDistributionGrpcServiceV1';

var grpcConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

suite('MessageDistributionGrpcServiceV1', ()=> {
    let service: MessageDistributionGrpcServiceV1;

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
        
        service = new MessageDistributionGrpcServiceV1();
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
            __dirname + "../../../../../src/protos/msgdistribution_v1.proto",
            {
                keepCase: true,
                longs: Number,
                enums: Number,
                defaults: true,
                oneofs: true
            }
        );
        let clientProto = grpc.loadPackageDefinition(packageDefinition).msgdistribution_v1.MessageDistribution;

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

        client.send_message(
            {
                recipient: recipient, 
                message: message, 
                method: DeliveryMethodV1.All
            },
            (err, response) => {
                err = err || response.error;

                assert.isNull(err);

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

        client.send_message_to_recipients(
            {
                recipient_ids: [ '1', '2' ], 
                message: message, 
                method: DeliveryMethodV1.All
            },
            (err, response) => {
                err = err || response.error;

                assert.isNull(err);

                done();
            }
        );
    });

    test('Send Message using Template', function (done) {
        let message = <MessageV1> {
            template: 'test'
        };

        client.send_message_to_recipient(
            {
                recipient_id: '1', 
                message: message, 
                method: DeliveryMethodV1.All
            },
            (err, response) => {
                err = err || response.error;

                assert.isNull(err);

                done();
            }
        );
    });

});

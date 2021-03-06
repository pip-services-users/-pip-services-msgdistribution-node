let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { EmailSettingsMemoryClientV1 } from 'pip-clients-emailsettings-node';
import { SmsSettingsMemoryClientV1 } from 'pip-clients-smssettings-node';
import { EmailNullClientV1 } from 'pip-clients-email-node';
import { SmsNullClientV1 } from 'pip-clients-sms-node';

import { MessageV1 } from '../../src/data/version1/MessageV1';
import { DeliveryMethodV1 } from '../../src/data/version1/DeliveryMethodV1';
import { MessageDistributionController } from '../../src/logic/MessageDistributionController';
import { MessageDistributionLambdaFunction } from '../../src/container/MessageDistributionLambdaFunction';

suite('MessageDistributionLambdaFunction', ()=> {
    let lambda: MessageDistributionLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'emailsettings.descriptor', 'pip-services-emailsettings:client:memory:default:1.0',
            'smssettings.descriptor', 'pip-services-smssettings:client:memory:default:1.0',
            'email.descriptor', 'pip-services-email:client:null:default:1.0',
            'sms.descriptor', 'pip-services-sms:client:null:default:1.0',
            'msgtemplates.descriptor', 'pip-services-msgtemplates:client:null:default:1.0',
            'controller.descriptor', 'pip-services-msgdistribution:controller:default:default:1.0'
        );

        lambda = new MessageDistributionLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    

    test('Send Message to Recipients', function (done) {
        let message = <MessageV1> {
            subject: 'Test subject',
            text: 'Test text',
            html: 'Test html'
        };

        lambda.act(
            {
                role: 'msg_distribution',
                cmd: 'send_message_to_recipients',
                recipient_ids: [ '1', '2' ], 
                message: message, 
                method: DeliveryMethodV1.All
            },
            (err, result) => {
                //assert.isNull(err);
                done();
            }
        );
    });
    
});
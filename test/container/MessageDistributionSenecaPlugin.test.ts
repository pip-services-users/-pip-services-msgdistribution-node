let _ = require('lodash');
let assert = require('chai').assert;

let pluginOptions = {
    logger: {
        level: 'debug'
    },
    service: {
        connection: {
            protocol: 'none'
        }
    }
};

import { MessageV1 } from '../../src/data/version1/MessageV1';
import { DeliveryMethodV1 } from '../../src/data/version1/DeliveryMethodV1';

suite('MessageDistributionSenecaPlugin', ()=> {
    let seneca;

    suiteSetup((done) => {
        seneca = require('seneca')({ strict: { result: false } });

        // Load Seneca plugin
        let plugin = require('../../src/container/MessageDistributionSenecaPlugin');
        seneca.use(plugin, pluginOptions);

        seneca.ready(done);
    });

    suiteTeardown((done) => {
        seneca.close(done);
    });

    test.skip('Ping', (done) => {
        let message = <MessageV1> {
            subject: 'Test subject',
            text: 'Test text',
            html: 'Test html'
        };

        seneca.act(
            {
                role: 'msg_distribution',
                cmd: 'send_message_to_recipients',
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
});
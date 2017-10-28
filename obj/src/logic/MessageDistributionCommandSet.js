"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const pip_services_commons_node_6 = require("pip-services-commons-node");
const MessageV1Schema_1 = require("../data/version1/MessageV1Schema");
class MessageDistributionCommandSet extends pip_services_commons_node_2.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        this.addCommand(this.makeSendMessageToRecipientCommand());
        this.addCommand(this.makeSendMessageToRecipientsCommand());
    }
    makeSendMessageToRecipientCommand() {
        return new pip_services_commons_node_3.Command("send_message_to_recipient", new pip_services_commons_node_4.ObjectSchema(true)
            .withRequiredProperty('message', new MessageV1Schema_1.MessageV1Schema())
            .withRequiredProperty('recipient_id', pip_services_commons_node_6.TypeCode.String)
            .withOptionalProperty('subscription', pip_services_commons_node_6.TypeCode.String)
            .withOptionalProperty('parameters', pip_services_commons_node_6.TypeCode.Map)
            .withOptionalProperty('method', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let message = args.get("message");
            let recipientId = args.getAsString("recipient_id");
            let subscription = args.getAsString("subscription");
            let parameters = pip_services_commons_node_1.ConfigParams.fromValue(args.get("parameters"));
            let method = args.getAsNullableString('method');
            this._logic.sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, (err) => {
                callback(err, null);
            });
        });
    }
    makeSendMessageToRecipientsCommand() {
        return new pip_services_commons_node_3.Command("send_message_to_recipients", new pip_services_commons_node_4.ObjectSchema(true)
            .withRequiredProperty('message', new MessageV1Schema_1.MessageV1Schema())
            .withRequiredProperty('recipient_ids', new pip_services_commons_node_5.ArraySchema(pip_services_commons_node_6.TypeCode.String))
            .withOptionalProperty('subscription', pip_services_commons_node_6.TypeCode.String)
            .withOptionalProperty('parameters', pip_services_commons_node_6.TypeCode.Map)
            .withOptionalProperty('method', pip_services_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let message = args.get("message");
            let recipientIds = args.get("recipient_ids");
            let subscription = args.getAsString("subscription");
            let parameters = pip_services_commons_node_1.ConfigParams.fromValue(args.get("parameters"));
            let method = args.getAsNullableString('method');
            this._logic.sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, (err) => {
                callback(err, null);
            });
        });
    }
}
exports.MessageDistributionCommandSet = MessageDistributionCommandSet;
//# sourceMappingURL=MessageDistributionCommandSet.js.map
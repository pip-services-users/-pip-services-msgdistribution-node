"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let services = require('../../../../src/protos/msgdistribution_v1_grpc_pb');
let messages = require('../../../../src/protos/msgdistribution_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
const MessageDistributionGrpcConverterV1_1 = require("./MessageDistributionGrpcConverterV1");
class MessageDistributionGrpcServiceV1 extends pip_services3_grpc_node_1.GrpcService {
    constructor() {
        super(services.MessageDistributionService);
        this._dependencyResolver.put('controller', new pip_services3_commons_node_2.Descriptor("pip-services-msgdistribution", "controller", "default", "*", "*"));
    }
    setReferences(references) {
        super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired('controller');
    }
    sendMessage(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let message = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new pip_services3_commons_node_1.ConfigParams();
        MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipient = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toRecipient(call.request.getRecipient());
        let method = call.request.getMethod();
        this._controller.sendMessage(correlationId, recipient, message, parameters, method, (err) => {
            let error = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromError(err);
            let response = new messages.SendEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    sendMessages(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let message = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new pip_services3_commons_node_1.ConfigParams();
        MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipients = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toRecipients(call.request.getRecipientsList());
        let method = call.request.getMethod();
        this._controller.sendMessages(correlationId, recipients, message, parameters, method, (err) => {
            let error = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromError(err);
            let response = new messages.SendEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    sendMessageToRecipient(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let message = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new pip_services3_commons_node_1.ConfigParams();
        MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipientId = call.request.getRecipientId();
        let subscription = call.request.getSubscription();
        let method = call.request.getMethod();
        this._controller.sendMessageToRecipient(correlationId, recipientId, subscription, message, parameters, method, (err) => {
            let error = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromError(err);
            let response = new messages.SendEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    sendMessageToRecipients(call, callback) {
        let correlationId = call.request.getCorrelationId();
        let message = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new pip_services3_commons_node_1.ConfigParams();
        MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipientIds = call.request.getRecipientIdsList();
        let subscription = call.request.getSubscription();
        let method = call.request.getMethod();
        this._controller.sendMessageToRecipients(correlationId, recipientIds, subscription, message, parameters, method, (err) => {
            let error = MessageDistributionGrpcConverterV1_1.MessageDistributionGrpcConverterV1.fromError(err);
            let response = new messages.SendEmptyReply();
            response.setError(error);
            callback(err, response);
        });
    }
    register() {
        this.registerMethod('send_message', null, this.sendMessage);
        this.registerMethod('send_messages', null, this.sendMessages);
        this.registerMethod('send_message_to_recipient', null, this.sendMessageToRecipient);
        this.registerMethod('send_message_to_recipients', null, this.sendMessageToRecipients);
    }
}
exports.MessageDistributionGrpcServiceV1 = MessageDistributionGrpcServiceV1;
//# sourceMappingURL=MessageDistributionGrpcServiceV1.js.map
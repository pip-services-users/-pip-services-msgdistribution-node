let _ = require('lodash');
let services = require('../../../../src/protos/msgdistribution_v1_grpc_pb');
let messages = require('../../../../src/protos/msgdistribution_v1_pb');

import { IReferences, ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { GrpcService } from 'pip-services3-grpc-node';

import { MessageV1 } from '../../data/version1/MessageV1';
import { RecipientV1 } from '../../data/version1/RecipientV1';
import { IMessageDistributionController } from '../../logic/IMessageDistributionController';
import { MessageDistributionGrpcConverterV1 } from './MessageDistributionGrpcConverterV1';

export class MessageDistributionGrpcServiceV1 extends GrpcService {
    private _controller: IMessageDistributionController;
	
    public constructor() {
        super(services.MessageDistributionService);
        this._dependencyResolver.put('controller', new Descriptor("pip-services-msgdistribution", "controller", "default", "*", "*"));
    }

	public setReferences(references: IReferences): void {
		super.setReferences(references);
        this._controller = this._dependencyResolver.getOneRequired<IMessageDistributionController>('controller');
    }
    
    private sendMessage(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let message = MessageDistributionGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        MessageDistributionGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipient = MessageDistributionGrpcConverterV1.toRecipient(call.request.getRecipient());
        let method = call.request.getMethod();

        this._controller.sendMessage(
            correlationId,
            recipient, message, parameters, method,
            (err) => {
                let error = MessageDistributionGrpcConverterV1.fromError(err);

                let response = new messages.SendEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private sendMessages(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let message = MessageDistributionGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        MessageDistributionGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipients = MessageDistributionGrpcConverterV1.toRecipients(call.request.getRecipientsList());
        let method = call.request.getMethod();

        this._controller.sendMessages(
            correlationId,
            recipients, message, parameters, method,
            (err) => {
                let error = MessageDistributionGrpcConverterV1.fromError(err);

                let response = new messages.SendEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private sendMessageToRecipient(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let message = MessageDistributionGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        MessageDistributionGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipientId = call.request.getRecipientId();
        let subscription = call.request.getSubscription();
        let method = call.request.getMethod();

        this._controller.sendMessageToRecipient(
            correlationId,
            recipientId, subscription, message, parameters, method,
            (err) => {
                let error = MessageDistributionGrpcConverterV1.fromError(err);

                let response = new messages.SendEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }

    private sendMessageToRecipients(call: any, callback: any) {
        let correlationId = call.request.getCorrelationId();
        let message = MessageDistributionGrpcConverterV1.toMessage(call.request.getMessage());
        let parameters = new ConfigParams();
        MessageDistributionGrpcConverterV1.setMap(parameters, call.request.getParametersMap());
        let recipientIds = call.request.getRecipientIdsList();
        let subscription = call.request.getSubscription();
        let method = call.request.getMethod();

        this._controller.sendMessageToRecipients(
            correlationId,
            recipientIds, subscription, message, parameters, method,
            (err) => {
                let error = MessageDistributionGrpcConverterV1.fromError(err);

                let response = new messages.SendEmptyReply();
                response.setError(error);

                callback(err, response);
            }
        );
    }
        
    public register() {
        this.registerMethod(
            'send_message', 
            null,
            this.sendMessage
        );

        this.registerMethod(
            'send_messages', 
            null,
            this.sendMessages
        );

        this.registerMethod(
            'send_message_to_recipient', 
            null,
            this.sendMessageToRecipient
        );

        this.registerMethod(
            'send_message_to_recipients', 
            null,
            this.sendMessageToRecipients
        );
    }
}

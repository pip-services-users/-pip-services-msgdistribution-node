import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { MessageV1 } from '../data/version1/MessageV1';
import { IMessageDistributionController } from './IMessageDistributionController';
export declare class MessageDistributionController implements IConfigurable, IReferenceable, ICommandable, IMessageDistributionController {
    private static _defaultConfig;
    private _config;
    private _dependencyResolver;
    private _emailSettingsClient;
    private _smsSettingsClient;
    private _emailDeliveryClient;
    private _smsDeliveryClient;
    private _templatesClient;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    sendMessageToRecipient(correlationId: string, recipientId: string, subscription: string, message: MessageV1, parameters: ConfigParams, method: string, callback?: (err: any) => void): void;
    private getMessage(correlationId, message, callback);
    private sendEmailMessages(correlationId, recipientIds, subscription, message, parameters, callback);
    private sendSmsMessages(correlationId, recipientIds, subscription, message, parameters, callback);
    sendMessageToRecipients(correlationId: string, recipientIds: string[], subscription: string, message: MessageV1, parameters: ConfigParams, method: string, callback?: (err: any) => void): void;
}

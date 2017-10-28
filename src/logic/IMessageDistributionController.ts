import { ConfigParams } from 'pip-services-commons-node';
import { MessageV1 } from '../data/version1/MessageV1';

export interface IMessageDistributionController {
    sendMessageToRecipient(correlationId: string, recipientId: string, subscription: string,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void);
    
    sendMessageToRecipients(correlationId: string, recipientIds: string[], subscription: string,
        message: MessageV1, parameters: ConfigParams, method: string,
        callback?: (err: any) => void): void;
}

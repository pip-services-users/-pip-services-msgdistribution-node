import { CommandSet } from 'pip-services3-commons-node';
import { IMessageDistributionController } from './IMessageDistributionController';
export declare class MessageDistributionCommandSet extends CommandSet {
    private _logic;
    constructor(logic: IMessageDistributionController);
    private makeSendMessageCommand();
    private makeSendMessagesCommand();
    private makeSendMessageToRecipientCommand();
    private makeSendMessageToRecipientsCommand();
}

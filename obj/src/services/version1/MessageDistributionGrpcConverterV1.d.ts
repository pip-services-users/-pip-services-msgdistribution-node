import { MessageV1 } from '../../data/version1/MessageV1';
import { RecipientV1 } from '../../data/version1/RecipientV1';
export declare class MessageDistributionGrpcConverterV1 {
    static fromError(err: any): any;
    static toError(obj: any): any;
    static setMap(map: any, values: any): void;
    static getMap(map: any): any;
    private static toJson;
    private static fromJson;
    static fromMessage(message: MessageV1): any;
    private static clearEmpty;
    static toMessage(obj: any): MessageV1;
    static fromRecipient(recipient: RecipientV1): any;
    static toRecipient(obj: any): RecipientV1;
    static fromRecipients(recipients: RecipientV1[]): any;
    static toRecipients(obj: any): RecipientV1[];
}

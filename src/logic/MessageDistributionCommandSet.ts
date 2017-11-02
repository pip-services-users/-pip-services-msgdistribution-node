import { ConfigParams } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { ICommand } from 'pip-services-commons-node';
import { Command } from 'pip-services-commons-node';
import { Schema } from 'pip-services-commons-node';
import { Parameters } from 'pip-services-commons-node';
import { ObjectSchema } from 'pip-services-commons-node';
import { ArraySchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

import { MessageV1 } from '../data/version1/MessageV1';
import { MessageV1Schema } from '../data/version1/MessageV1Schema';
import { RecipientV1 } from '../data/version1/RecipientV1';
import { RecipientV1Schema } from '../data/version1/RecipientV1Schema';
import { IMessageDistributionController } from './IMessageDistributionController';

export class MessageDistributionCommandSet extends CommandSet {
    private _logic: IMessageDistributionController;

    constructor(logic: IMessageDistributionController) {
        super();

        this._logic = logic;

		this.addCommand(this.makeSendMessageCommand());
		this.addCommand(this.makeSendMessagesCommand());
		this.addCommand(this.makeSendMessageToRecipientCommand());
		this.addCommand(this.makeSendMessageToRecipientsCommand());
    }

	private makeSendMessageCommand(): ICommand {
		return new Command(
			"send_message",
			new ObjectSchema(true)
				.withRequiredProperty('message', new MessageV1Schema())
				.withRequiredProperty('recipient', new RecipientV1Schema())
				.withOptionalProperty('parameters', TypeCode.Map)
				.withOptionalProperty('method', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let message = args.get("message");
                let recipient = args.get("recipient");
				let parameters = ConfigParams.fromValue(args.get("parameters"));
				let method = args.getAsNullableString('method');
				this._logic.sendMessage(
					correlationId, recipient, message, parameters, method,
					(err) => {
						callback(err, null);
					}
				);
            }
		);
	}

	private makeSendMessagesCommand(): ICommand {
		return new Command(
			"send_messages",
			new ObjectSchema(true)
				.withRequiredProperty('message', new MessageV1Schema())
				.withRequiredProperty('recipients', new ArraySchema(new RecipientV1Schema()))
				.withOptionalProperty('parameters', TypeCode.Map)
				.withOptionalProperty('method', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let message = args.get("message");
                let recipients = args.get("recipients");
				let parameters = ConfigParams.fromValue(args.get("parameters"));
				let method = args.getAsNullableString('method');
				this._logic.sendMessages(
					correlationId, recipients, message, parameters, method,
					(err) => {
						callback(err, null);
					}
				);
            }
		);
	}

	private makeSendMessageToRecipientCommand(): ICommand {
		return new Command(
			"send_message_to_recipient",
			new ObjectSchema(true)
				.withRequiredProperty('message', new MessageV1Schema())
				.withRequiredProperty('recipient_id', TypeCode.String)
				.withOptionalProperty('subscription', TypeCode.String)
				.withOptionalProperty('parameters', TypeCode.Map)
				.withOptionalProperty('method', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let message = args.get("message");
                let recipientId = args.getAsString("recipient_id");
                let subscription = args.getAsString("subscription");
				let parameters = ConfigParams.fromValue(args.get("parameters"));
				let method = args.getAsNullableString('method');
				this._logic.sendMessageToRecipient(
					correlationId, recipientId, subscription, message, parameters, method,
					(err) => {
						callback(err, null);
					}
				);
            }
		);
	}

	private makeSendMessageToRecipientsCommand(): ICommand {
		return new Command(
			"send_message_to_recipients",
			new ObjectSchema(true)
				.withRequiredProperty('message', new MessageV1Schema())
				.withRequiredProperty('recipient_ids', new ArraySchema(TypeCode.String))
				.withOptionalProperty('subscription', TypeCode.String)
				.withOptionalProperty('parameters', TypeCode.Map)
				.withOptionalProperty('method', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let message = args.get("message");
                let recipientIds = args.get("recipient_ids");
                let subscription = args.getAsString("subscription");
				let parameters = ConfigParams.fromValue(args.get("parameters"));
				let method = args.getAsNullableString('method');
				this._logic.sendMessageToRecipients(
					correlationId, recipientIds, subscription, message, parameters, method,
					(err) => {
						callback(err, null);
					}
				);
            }
		);
	}

}
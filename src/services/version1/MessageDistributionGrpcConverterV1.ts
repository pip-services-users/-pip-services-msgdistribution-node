let _ = require('lodash');
let messages = require('../../../../src/protos/msgdistribution_v1_pb');

import { ErrorDescriptionFactory } from 'pip-services3-commons-node';
import { ErrorDescription } from 'pip-services3-commons-node';
import { ApplicationExceptionFactory } from 'pip-services3-commons-node';

import { MessageV1 } from '../../data/version1/MessageV1';
import { RecipientV1 } from '../../data/version1/RecipientV1';

export class MessageDistributionGrpcConverterV1 {

    public static fromError(err: any): any {
        if (err == null) return null;

        let description = ErrorDescriptionFactory.create(err);
        let obj = new messages.ErrorDescription();

        obj.setType(description.type);
        obj.setCategory(description.category);
        obj.setCode(description.code);
        obj.setCorrelationId(description.correlation_id);
        obj.setStatus(description.status);
        obj.setMessage(description.message);
        obj.setCause(description.cause);
        obj.setStackTrace(description.stack_trace);
        MessageDistributionGrpcConverterV1.setMap(obj.getDetailsMap(), description.details);

        return obj;
    }

    public static toError(obj: any): any {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;

        let description: ErrorDescription = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: MessageDistributionGrpcConverterV1.getMap(obj.getDetailsMap())
        }

        return ApplicationExceptionFactory.create(description);
    }

    public static setMap(map: any, values: any): void {
        if (values == null) return;

        if (_.isFunction(values.toObject))
            values = values.toObject();

        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        } else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            } else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }

    public static getMap(map: any): any {
        let values = {};
        MessageDistributionGrpcConverterV1.setMap(values, map);
        return values;
    }

    private static toJson(value: any): string {
        if (value == null || value == "") return null;
        return JSON.stringify(value);
    }

    private static fromJson(value: string): any {
        if (value == null || value == "") return null;
        return JSON.parse(value);
    }

    public static fromMessage(message: MessageV1): any {
        if (message == null) return null;

        let obj = new messages.Message();

        obj.setTemplate(message.template);
        obj.setFrom(message.from);
        obj.setCc(message.cc);
        obj.setBcc(message.bcc);
        obj.setReplyTo(message.reply_to);
        obj.setSubject(message.subject);
        obj.setText(message.text);
        obj.setHtml(message.html);
    
        return obj;
    }

    private static clearEmpty(value: string) {
        return value != null && value != "" ? value : null;
    }

    public static toMessage(obj: any): MessageV1 {
        if (obj == null) return null;

        let message: MessageV1 = {
            template: obj.getTemplate(),
            from: obj.getFrom(),
            cc: obj.getCc(),
            bcc: obj.getBcc(),
            reply_to: obj.getReplyTo(),
            subject: obj.getSubject(),
            text: obj.getText(),
            html: obj.getHtml()
        };

        message.template = MessageDistributionGrpcConverterV1.clearEmpty(message.template);
        message.from = MessageDistributionGrpcConverterV1.clearEmpty(message.from);
        message.cc = MessageDistributionGrpcConverterV1.clearEmpty(message.cc);
        message.reply_to = MessageDistributionGrpcConverterV1.clearEmpty(message.reply_to);

        return message;
    }

    public static fromRecipient(recipient: RecipientV1): any {
        if (recipient == null) return null;

        let obj = new messages.Recipient();

        obj.setId(recipient.id);
        obj.setName(recipient.name);
        obj.setEmail(recipient.email);
        obj.setPhone(recipient.phone);
        obj.setLanguage(recipient.language);
    
        return obj;
    }

    public static toRecipient(obj: any): RecipientV1 {
        if (obj == null) return null;

        let recipient: RecipientV1 = {
            id: obj.getId(),
            name: obj.getName(),
            email: obj.getEmail(),
            phone: obj.getPhone(),
            language: obj.getLanguage()
        };

        return recipient;
    }    
    public static fromRecipients(recipients: RecipientV1[]): any {
        if (recipients == null) return null;

        let data = _.map(recipients, MessageDistributionGrpcConverterV1.fromRecipient);

        return data;
    }

    public static toRecipients(obj: any): RecipientV1[] {
        if (obj == null) return null;

        let data = _.map(obj, MessageDistributionGrpcConverterV1.toRecipient);

        return data;
    }

}
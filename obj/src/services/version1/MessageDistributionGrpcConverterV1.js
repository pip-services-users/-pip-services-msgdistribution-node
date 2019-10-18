"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let messages = require('../../../../src/protos/msgdistribution_v1_pb');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
class MessageDistributionGrpcConverterV1 {
    static fromError(err) {
        if (err == null)
            return null;
        let description = pip_services3_commons_node_1.ErrorDescriptionFactory.create(err);
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
    static toError(obj) {
        if (obj == null || (obj.getCategory() == "" && obj.getMessage() == ""))
            return null;
        let description = {
            type: obj.getType(),
            category: obj.getCategory(),
            code: obj.getCode(),
            correlation_id: obj.getCorrelationId(),
            status: obj.getStatus(),
            message: obj.getMessage(),
            cause: obj.getCause(),
            stack_trace: obj.getStackTrace(),
            details: MessageDistributionGrpcConverterV1.getMap(obj.getDetailsMap())
        };
        return pip_services3_commons_node_2.ApplicationExceptionFactory.create(description);
    }
    static setMap(map, values) {
        if (values == null)
            return;
        if (_.isFunction(values.toObject))
            values = values.toObject();
        if (_.isArray(values)) {
            for (let entry of values) {
                if (_.isArray(entry))
                    map[entry[0]] = entry[1];
            }
        }
        else {
            if (_.isFunction(map.set)) {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map.set(propName, values[propName]);
                }
            }
            else {
                for (let propName in values) {
                    if (values.hasOwnProperty(propName))
                        map[propName] = values[propName];
                }
            }
        }
    }
    static getMap(map) {
        let values = {};
        MessageDistributionGrpcConverterV1.setMap(values, map);
        return values;
    }
    static toJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.stringify(value);
    }
    static fromJson(value) {
        if (value == null || value == "")
            return null;
        return JSON.parse(value);
    }
    static fromMessage(message) {
        if (message == null)
            return null;
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
    static clearEmpty(value) {
        return value != null && value != "" ? value : null;
    }
    static toMessage(obj) {
        if (obj == null)
            return null;
        let message = {
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
    static fromRecipient(recipient) {
        if (recipient == null)
            return null;
        let obj = new messages.Recipient();
        obj.setId(recipient.id);
        obj.setName(recipient.name);
        obj.setEmail(recipient.email);
        obj.setPhone(recipient.phone);
        obj.setLanguage(recipient.language);
        return obj;
    }
    static toRecipient(obj) {
        if (obj == null)
            return null;
        let recipient = {
            id: obj.getId(),
            name: obj.getName(),
            email: obj.getEmail(),
            phone: obj.getPhone(),
            language: obj.getLanguage()
        };
        return recipient;
    }
    static fromRecipients(recipients) {
        if (recipients == null)
            return null;
        let data = _.map(recipients, MessageDistributionGrpcConverterV1.fromRecipient);
        return data;
    }
    static toRecipients(obj) {
        if (obj == null)
            return null;
        let data = _.map(obj, MessageDistributionGrpcConverterV1.toRecipient);
        return data;
    }
}
exports.MessageDistributionGrpcConverterV1 = MessageDistributionGrpcConverterV1;
//# sourceMappingURL=MessageDistributionGrpcConverterV1.js.map
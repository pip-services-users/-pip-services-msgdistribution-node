// package: msgdistribution_v1
// file: msgdistribution_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class Message extends jspb.Message {
  getTemplate(): string;
  setTemplate(value: string): void;

  getFrom(): string;
  setFrom(value: string): void;

  getCc(): string;
  setCc(value: string): void;

  getBcc(): string;
  setBcc(value: string): void;

  getReplyTo(): string;
  setReplyTo(value: string): void;

  getSubject(): string;
  setSubject(value: string): void;

  getText(): string;
  setText(value: string): void;

  getHtml(): string;
  setHtml(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    template: string,
    from: string,
    cc: string,
    bcc: string,
    replyTo: string,
    subject: string,
    text: string,
    html: string,
  }
}

export class Recipient extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getEmail(): string;
  setEmail(value: string): void;

  getPhone(): string;
  setPhone(value: string): void;

  getLanguage(): string;
  setLanguage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Recipient.AsObject;
  static toObject(includeInstance: boolean, msg: Recipient): Recipient.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Recipient, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Recipient;
  static deserializeBinaryFromReader(message: Recipient, reader: jspb.BinaryReader): Recipient;
}

export namespace Recipient {
  export type AsObject = {
    id: string,
    name: string,
    email: string,
    phone: string,
    language: string,
  }
}

export class SendMessageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getMethod(): string;
  setMethod(value: string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Message | undefined;
  setMessage(value?: Message): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  hasRecipient(): boolean;
  clearRecipient(): void;
  getRecipient(): Recipient | undefined;
  setRecipient(value?: Recipient): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessageRequest): SendMessageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendMessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessageRequest;
  static deserializeBinaryFromReader(message: SendMessageRequest, reader: jspb.BinaryReader): SendMessageRequest;
}

export namespace SendMessageRequest {
  export type AsObject = {
    correlationId: string,
    method: string,
    message?: Message.AsObject,
    parametersMap: Array<[string, string]>,
    recipient?: Recipient.AsObject,
  }
}

export class SendMessagesRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getMethod(): string;
  setMethod(value: string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Message | undefined;
  setMessage(value?: Message): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  clearRecipientsList(): void;
  getRecipientsList(): Array<Recipient>;
  setRecipientsList(value: Array<Recipient>): void;
  addRecipients(value?: Recipient, index?: number): Recipient;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessagesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessagesRequest): SendMessagesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendMessagesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessagesRequest;
  static deserializeBinaryFromReader(message: SendMessagesRequest, reader: jspb.BinaryReader): SendMessagesRequest;
}

export namespace SendMessagesRequest {
  export type AsObject = {
    correlationId: string,
    method: string,
    message?: Message.AsObject,
    parametersMap: Array<[string, string]>,
    recipientsList: Array<Recipient.AsObject>,
  }
}

export class SendMessageWithRecipientRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getMethod(): string;
  setMethod(value: string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Message | undefined;
  setMessage(value?: Message): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  getSubscription(): string;
  setSubscription(value: string): void;

  getRecipientId(): string;
  setRecipientId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessageWithRecipientRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessageWithRecipientRequest): SendMessageWithRecipientRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendMessageWithRecipientRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessageWithRecipientRequest;
  static deserializeBinaryFromReader(message: SendMessageWithRecipientRequest, reader: jspb.BinaryReader): SendMessageWithRecipientRequest;
}

export namespace SendMessageWithRecipientRequest {
  export type AsObject = {
    correlationId: string,
    method: string,
    message?: Message.AsObject,
    parametersMap: Array<[string, string]>,
    subscription: string,
    recipientId: string,
  }
}

export class SendMessageWithRecipientsRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getMethod(): string;
  setMethod(value: string): void;

  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): Message | undefined;
  setMessage(value?: Message): void;

  getParametersMap(): jspb.Map<string, string>;
  clearParametersMap(): void;
  getSubscription(): string;
  setSubscription(value: string): void;

  clearRecipientIdsList(): void;
  getRecipientIdsList(): Array<string>;
  setRecipientIdsList(value: Array<string>): void;
  addRecipientIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendMessageWithRecipientsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendMessageWithRecipientsRequest): SendMessageWithRecipientsRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendMessageWithRecipientsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendMessageWithRecipientsRequest;
  static deserializeBinaryFromReader(message: SendMessageWithRecipientsRequest, reader: jspb.BinaryReader): SendMessageWithRecipientsRequest;
}

export namespace SendMessageWithRecipientsRequest {
  export type AsObject = {
    correlationId: string,
    method: string,
    message?: Message.AsObject,
    parametersMap: Array<[string, string]>,
    subscription: string,
    recipientIdsList: Array<string>,
  }
}

export class SendEmptyReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendEmptyReply.AsObject;
  static toObject(includeInstance: boolean, msg: SendEmptyReply): SendEmptyReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SendEmptyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendEmptyReply;
  static deserializeBinaryFromReader(message: SendEmptyReply, reader: jspb.BinaryReader): SendEmptyReply;
}

export namespace SendEmptyReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
  }
}


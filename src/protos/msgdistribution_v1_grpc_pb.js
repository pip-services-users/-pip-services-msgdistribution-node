// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright 2015 gRPC authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
'use strict';
var grpc = require('grpc');
var msgdistribution_v1_pb = require('./msgdistribution_v1_pb.js');

function serialize_msgdistribution_v1_SendEmptyReply(arg) {
  if (!(arg instanceof msgdistribution_v1_pb.SendEmptyReply)) {
    throw new Error('Expected argument of type msgdistribution_v1.SendEmptyReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgdistribution_v1_SendEmptyReply(buffer_arg) {
  return msgdistribution_v1_pb.SendEmptyReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgdistribution_v1_SendMessageRequest(arg) {
  if (!(arg instanceof msgdistribution_v1_pb.SendMessageRequest)) {
    throw new Error('Expected argument of type msgdistribution_v1.SendMessageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgdistribution_v1_SendMessageRequest(buffer_arg) {
  return msgdistribution_v1_pb.SendMessageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgdistribution_v1_SendMessageWithRecipientRequest(arg) {
  if (!(arg instanceof msgdistribution_v1_pb.SendMessageWithRecipientRequest)) {
    throw new Error('Expected argument of type msgdistribution_v1.SendMessageWithRecipientRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgdistribution_v1_SendMessageWithRecipientRequest(buffer_arg) {
  return msgdistribution_v1_pb.SendMessageWithRecipientRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgdistribution_v1_SendMessageWithRecipientsRequest(arg) {
  if (!(arg instanceof msgdistribution_v1_pb.SendMessageWithRecipientsRequest)) {
    throw new Error('Expected argument of type msgdistribution_v1.SendMessageWithRecipientsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgdistribution_v1_SendMessageWithRecipientsRequest(buffer_arg) {
  return msgdistribution_v1_pb.SendMessageWithRecipientsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_msgdistribution_v1_SendMessagesRequest(arg) {
  if (!(arg instanceof msgdistribution_v1_pb.SendMessagesRequest)) {
    throw new Error('Expected argument of type msgdistribution_v1.SendMessagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_msgdistribution_v1_SendMessagesRequest(buffer_arg) {
  return msgdistribution_v1_pb.SendMessagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


// The message distribution service definition.
var MessageDistributionService = exports.MessageDistributionService = {
  send_message: {
    path: '/msgdistribution_v1.MessageDistribution/send_message',
    requestStream: false,
    responseStream: false,
    requestType: msgdistribution_v1_pb.SendMessageRequest,
    responseType: msgdistribution_v1_pb.SendEmptyReply,
    requestSerialize: serialize_msgdistribution_v1_SendMessageRequest,
    requestDeserialize: deserialize_msgdistribution_v1_SendMessageRequest,
    responseSerialize: serialize_msgdistribution_v1_SendEmptyReply,
    responseDeserialize: deserialize_msgdistribution_v1_SendEmptyReply,
  },
  send_messages: {
    path: '/msgdistribution_v1.MessageDistribution/send_messages',
    requestStream: false,
    responseStream: false,
    requestType: msgdistribution_v1_pb.SendMessagesRequest,
    responseType: msgdistribution_v1_pb.SendEmptyReply,
    requestSerialize: serialize_msgdistribution_v1_SendMessagesRequest,
    requestDeserialize: deserialize_msgdistribution_v1_SendMessagesRequest,
    responseSerialize: serialize_msgdistribution_v1_SendEmptyReply,
    responseDeserialize: deserialize_msgdistribution_v1_SendEmptyReply,
  },
  send_message_to_recipient: {
    path: '/msgdistribution_v1.MessageDistribution/send_message_to_recipient',
    requestStream: false,
    responseStream: false,
    requestType: msgdistribution_v1_pb.SendMessageWithRecipientRequest,
    responseType: msgdistribution_v1_pb.SendEmptyReply,
    requestSerialize: serialize_msgdistribution_v1_SendMessageWithRecipientRequest,
    requestDeserialize: deserialize_msgdistribution_v1_SendMessageWithRecipientRequest,
    responseSerialize: serialize_msgdistribution_v1_SendEmptyReply,
    responseDeserialize: deserialize_msgdistribution_v1_SendEmptyReply,
  },
  send_message_to_recipients: {
    path: '/msgdistribution_v1.MessageDistribution/send_message_to_recipients',
    requestStream: false,
    responseStream: false,
    requestType: msgdistribution_v1_pb.SendMessageWithRecipientsRequest,
    responseType: msgdistribution_v1_pb.SendEmptyReply,
    requestSerialize: serialize_msgdistribution_v1_SendMessageWithRecipientsRequest,
    requestDeserialize: deserialize_msgdistribution_v1_SendMessageWithRecipientsRequest,
    responseSerialize: serialize_msgdistribution_v1_SendEmptyReply,
    responseDeserialize: deserialize_msgdistribution_v1_SendEmptyReply,
  },
};

exports.MessageDistributionClient = grpc.makeGenericClientConstructor(MessageDistributionService);

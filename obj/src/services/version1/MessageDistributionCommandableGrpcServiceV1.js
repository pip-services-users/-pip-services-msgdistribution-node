"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_grpc_node_1 = require("pip-services3-grpc-node");
class MessageDistributionCommandableGrpcServiceV1 extends pip_services3_grpc_node_1.CommandableGrpcService {
    constructor() {
        super('v1/msg_distribution');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-msgdistribution', 'controller', 'default', '*', '1.0'));
    }
}
exports.MessageDistributionCommandableGrpcServiceV1 = MessageDistributionCommandableGrpcServiceV1;
//# sourceMappingURL=MessageDistributionCommandableGrpcServiceV1.js.map
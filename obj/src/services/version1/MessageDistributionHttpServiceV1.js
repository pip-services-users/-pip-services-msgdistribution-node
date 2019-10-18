"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class MessageDistributionHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/msg_distribution');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('pip-services-msgdistribution', 'controller', 'default', '*', '1.0'));
    }
}
exports.MessageDistributionHttpServiceV1 = MessageDistributionHttpServiceV1;
//# sourceMappingURL=MessageDistributionHttpServiceV1.js.map
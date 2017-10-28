"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class MessageDistributionHttpServiceV1 extends pip_services_net_node_1.CommandableHttpService {
    constructor() {
        super('msg_distribution');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-msgdistribution', 'controller', 'default', '*', '1.0'));
    }
}
exports.MessageDistributionHttpServiceV1 = MessageDistributionHttpServiceV1;
//# sourceMappingURL=MessageDistributionHttpServiceV1.js.map
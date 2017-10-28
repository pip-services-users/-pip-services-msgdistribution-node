"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_net_node_1 = require("pip-services-net-node");
class MessageDistributionSenecaServiceV1 extends pip_services_net_node_1.CommandableSenecaService {
    constructor() {
        super('msg_distribution');
        this._dependencyResolver.put('controller', new pip_services_commons_node_1.Descriptor('pip-services-msgdistribution', 'controller', 'default', '*', '1.0'));
    }
}
exports.MessageDistributionSenecaServiceV1 = MessageDistributionSenecaServiceV1;
//# sourceMappingURL=MessageDistributionSenecaServiceV1.js.map
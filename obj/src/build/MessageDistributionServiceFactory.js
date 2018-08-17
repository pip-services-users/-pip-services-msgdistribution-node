"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_components_node_1 = require("pip-services-components-node");
const pip_services_commons_node_1 = require("pip-services-commons-node");
const MessageDistributionController_1 = require("../logic/MessageDistributionController");
const MessageDistributionHttpServiceV1_1 = require("../services/version1/MessageDistributionHttpServiceV1");
const MessageDistributionSenecaServiceV1_1 = require("../services/version1/MessageDistributionSenecaServiceV1");
class MessageDistributionServiceFactory extends pip_services_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(MessageDistributionServiceFactory.ControllerDescriptor, MessageDistributionController_1.MessageDistributionController);
        this.registerAsType(MessageDistributionServiceFactory.SenecaServiceDescriptor, MessageDistributionSenecaServiceV1_1.MessageDistributionSenecaServiceV1);
        this.registerAsType(MessageDistributionServiceFactory.HttpServiceDescriptor, MessageDistributionHttpServiceV1_1.MessageDistributionHttpServiceV1);
    }
}
MessageDistributionServiceFactory.Descriptor = new pip_services_commons_node_1.Descriptor("pip-services-msgdistribution", "factory", "default", "default", "1.0");
MessageDistributionServiceFactory.ControllerDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-msgdistribution", "controller", "default", "*", "1.0");
MessageDistributionServiceFactory.SenecaServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-msgdistribution", "service", "seneca", "*", "1.0");
MessageDistributionServiceFactory.HttpServiceDescriptor = new pip_services_commons_node_1.Descriptor("pip-services-msgdistribution", "service", "http", "*", "1.0");
exports.MessageDistributionServiceFactory = MessageDistributionServiceFactory;
//# sourceMappingURL=MessageDistributionServiceFactory.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class MessageV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('template', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('from', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('cc', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('bcc', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('reply_to', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('subject', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('text', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('html', pip_services_commons_node_2.TypeCode.String);
    }
}
exports.MessageV1Schema = MessageV1Schema;
//# sourceMappingURL=MessageV1Schema.js.map
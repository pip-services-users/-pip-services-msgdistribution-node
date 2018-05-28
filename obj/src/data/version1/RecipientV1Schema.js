"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
class RecipientV1Schema extends pip_services_commons_node_1.ObjectSchema {
    constructor() {
        super();
        this.withOptionalProperty('id', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('name', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('email', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('phone', pip_services_commons_node_2.TypeCode.String);
        this.withOptionalProperty('language', pip_services_commons_node_2.TypeCode.String);
    }
}
exports.RecipientV1Schema = RecipientV1Schema;
//# sourceMappingURL=RecipientV1Schema.js.map
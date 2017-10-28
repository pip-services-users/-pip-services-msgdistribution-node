import { ObjectSchema } from 'pip-services-commons-node';
import { TypeCode } from 'pip-services-commons-node';

export class MessageV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('template', TypeCode.String);
        this.withOptionalProperty('from', TypeCode.String);
        this.withOptionalProperty('cc', TypeCode.String);
        this.withOptionalProperty('bcc', TypeCode.String);
        this.withOptionalProperty('reply_to', TypeCode.String);
        this.withOptionalProperty('subject', TypeCode.String);
        this.withOptionalProperty('text', TypeCode.String);
        this.withOptionalProperty('html', TypeCode.String);
    }
}

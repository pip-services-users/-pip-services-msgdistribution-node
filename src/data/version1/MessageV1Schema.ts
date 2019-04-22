import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';

export class MessageV1Schema extends ObjectSchema {
    public constructor() {
        super();
        this.withOptionalProperty('template', TypeCode.String);
        this.withOptionalProperty('from', TypeCode.String);
        this.withOptionalProperty('cc', TypeCode.String);
        this.withOptionalProperty('bcc', TypeCode.String);
        this.withOptionalProperty('reply_to', TypeCode.String);
        this.withOptionalProperty('subject', null);
        this.withOptionalProperty('text', null);
        this.withOptionalProperty('html', null);
    }
}

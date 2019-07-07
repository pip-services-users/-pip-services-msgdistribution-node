import { MessageTemplateV1 } from 'pip-clients-msgtemplates-node';
import { MessageTemplatesNullClientV1 } from 'pip-clients-msgtemplates-node';
import { MultiString } from 'pip-services3-commons-node';

export class MessageTemplatesMockClientV1 extends MessageTemplatesNullClientV1 {
 
    public getTemplateByIdOrName(correlationId: string, idOrName: string, 
        callback: (err: any, template: MessageTemplateV1) => void): void {
        if (idOrName != 'test') {
            callback(null, null);
            return;
        }

        callback(null, <MessageTemplateV1> {
            id: idOrName,
            name: idOrName,
            from: null,
            status: 'new',
            subject: new MultiString({en: 'Test subject'}),
            text: new MultiString({en: 'Test text'}),
            html:new MultiString({en: 'Test html'})
        });
    }
    
}
import { MessageTemplateV1 } from 'pip-clients-msgtemplates-node';
import { MessageTemplatesNullClientV1 } from 'pip-clients-msgtemplates-node';

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
            subject: {
                en: 'Test subject'
            },
            text: {
                en: 'Test text'
            },
            html: {
                en: 'Test html'
            }
        });
    }
    
}
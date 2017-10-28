import { Descriptor } from 'pip-services-commons-node';
import { CommandableHttpService } from 'pip-services-net-node';

export class MessageDistributionHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('msg_distribution');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgdistribution', 'controller', 'default', '*', '1.0'));
    }
}
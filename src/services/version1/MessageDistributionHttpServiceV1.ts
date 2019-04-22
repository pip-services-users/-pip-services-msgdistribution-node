import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class MessageDistributionHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/msg_distribution');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgdistribution', 'controller', 'default', '*', '1.0'));
    }
}
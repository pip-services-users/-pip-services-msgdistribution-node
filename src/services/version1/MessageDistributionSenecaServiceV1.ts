import { Descriptor } from 'pip-services-commons-node';
import { CommandableSenecaService } from 'pip-services-net-node';

export class MessageDistributionSenecaServiceV1 extends CommandableSenecaService {
    public constructor() {
        super('msg_distribution');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgdistribution', 'controller', 'default', '*', '1.0'));
    }
}
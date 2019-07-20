import { Descriptor } from 'pip-services3-commons-node';
import { CommandableGrpcService } from 'pip-services3-grpc-node';

export class MessageDistributionCommandableGrpcServiceV1 extends CommandableGrpcService {
    public constructor() {
        super('v1/msg_distribution');
        this._dependencyResolver.put('controller', new Descriptor('pip-services-msgdistribution', 'controller', 'default', '*', '1.0'));
    }
}
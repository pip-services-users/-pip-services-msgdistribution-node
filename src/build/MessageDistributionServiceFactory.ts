import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { MessageDistributionController } from '../logic/MessageDistributionController';
import { MessageDistributionHttpServiceV1 } from '../services/version1/MessageDistributionHttpServiceV1';
import { MessageDistributionCommandableGrpcServiceV1 } from '../services/version1/MessageDistributionCommandableGrpcServiceV1';
import { MessageDistributionGrpcServiceV1 } from '../services/version1/MessageDistributionGrpcServiceV1';

export class MessageDistributionServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-msgdistribution", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-msgdistribution", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-msgdistribution", "service", "http", "*", "1.0");
	public static CommandableGrpcServiceDescriptor = new Descriptor("pip-services-msgdistribution", "service", "commandable-grpc", "*", "1.0");
	public static GrpcServiceDescriptor = new Descriptor("pip-services-msgdistribution", "service", "grpc", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(MessageDistributionServiceFactory.ControllerDescriptor, MessageDistributionController);
		this.registerAsType(MessageDistributionServiceFactory.HttpServiceDescriptor, MessageDistributionHttpServiceV1);
		this.registerAsType(MessageDistributionServiceFactory.CommandableGrpcServiceDescriptor, MessageDistributionCommandableGrpcServiceV1);
		this.registerAsType(MessageDistributionServiceFactory.GrpcServiceDescriptor, MessageDistributionGrpcServiceV1);
	}
	
}

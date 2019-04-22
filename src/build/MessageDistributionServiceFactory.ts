import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { MessageDistributionController } from '../logic/MessageDistributionController';
import { MessageDistributionHttpServiceV1 } from '../services/version1/MessageDistributionHttpServiceV1';

export class MessageDistributionServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-msgdistribution", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-msgdistribution", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-msgdistribution", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(MessageDistributionServiceFactory.ControllerDescriptor, MessageDistributionController);
		this.registerAsType(MessageDistributionServiceFactory.HttpServiceDescriptor, MessageDistributionHttpServiceV1);
	}
	
}

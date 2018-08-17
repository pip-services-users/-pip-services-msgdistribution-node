import { Factory } from 'pip-services-components-node';
import { Descriptor } from 'pip-services-commons-node';

import { MessageDistributionController } from '../logic/MessageDistributionController';
import { MessageDistributionHttpServiceV1 } from '../services/version1/MessageDistributionHttpServiceV1';
import { MessageDistributionSenecaServiceV1 } from '../services/version1/MessageDistributionSenecaServiceV1'; 

export class MessageDistributionServiceFactory extends Factory {
	public static Descriptor = new Descriptor("pip-services-msgdistribution", "factory", "default", "default", "1.0");
	public static ControllerDescriptor = new Descriptor("pip-services-msgdistribution", "controller", "default", "*", "1.0");
	public static SenecaServiceDescriptor = new Descriptor("pip-services-msgdistribution", "service", "seneca", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("pip-services-msgdistribution", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(MessageDistributionServiceFactory.ControllerDescriptor, MessageDistributionController);
		this.registerAsType(MessageDistributionServiceFactory.SenecaServiceDescriptor, MessageDistributionSenecaServiceV1);
		this.registerAsType(MessageDistributionServiceFactory.HttpServiceDescriptor, MessageDistributionHttpServiceV1);
	}
	
}

# HTTP REST Protocol (version 1) <br/> Message Distribution Microservice

Message distribution microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [MessageV1 class](#class1)
* [POST /email/send_message_to_recipient](#operation1)
* [POST /email/send_messsage_to_recipients](#operation2)

## Data types

### <a name="class2"></a> MessageV1 class

Message object with sender and recipient addresses, subject and content

**Properties:**
    - from: string - (optional) sender address
    - subject: any - (optional) message subject
    - text: any - (optional) message plain text body 
    - html: ant - (optional) message html body


### <a name="operation1"></a> Method: 'POST', route '/email/send\_message\_to_recipient'

Sends email message to specified recipient

**Request body:** 
- recipient_id: string - recipient id
- subscription: string - message type to be filtered by subscriptions
- message: MessageV1 - message to be sent
- parameters: Object - (optional) template parameters
- method: string - 'email', 'sms' or 'all'

**Response body:**
error or null for success

### <a name="operation2"></a> Method: 'POST', route '/email/send\_message\_to_recipients'

Sends email message to multiple recipients

**Request body:** 
- recipientIds: string[] - recipient ids
- subscription: string - message type to be filtered by subscriptions
- message: MessageV1 - message to be sent
- parameters: Object - (optional) template parameters
- method: string - 'email', 'sms' or 'all'

**Response body:**
error or null for success

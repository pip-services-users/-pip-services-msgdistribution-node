# Seneca Protocol (version 1) <br/> Message Distribution Microservice

Message distribution microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    connection: {
        protocol: 'tcp', // Microservice seneca protocol
        host: 'localhost', // Microservice localhost
        port: 8805, // Microservice seneca port
    }
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'msg_distribution',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```
* [MessageV1 class](#class1)
* [cmd: 'send_message_to_recipient'](#operation1)
* [cmd: 'send_message_to_recipients'](#operation2)

## Data types


### <a name="class1"></a> MessageV1 class

Message object with sender and recipient addresses, subject and content

**Properties:**
    - from: string - (optional) sender address
    - subject: any - (optional) message subject
    - text: any - (optional) message plain text body 
    - html: any - (optional) message html body


### <a name="operation1"></a> Cmd: 'send\_message\_to_recipient'

Sends email message to specified recipient

**Arguments:** 
- recipient_id: string - recipient id
- subscription: string - message type to be filtered by subscriptions
- message: MessageV1 - message to be sent
- parameters: Object - (optional) template parameters
- method: string - 'email', 'sms' or 'all'

**Returns:**
- err: Error - occured error or null for success

### <a name="operation2"></a> Cmd: 'send\_messages\_to_recipients'

Sends email message to multiple recipients

**Arguments:** 
- recipient_ids: string[] - recipient ids
- subscription: string - message type to be filtered by subscriptions
- message: MessageV1 - message to be sent
- parameters: Object - (optional) template parameters
- method: string - 'email', 'sms' or 'all'

**Returns:**
- err: Error - occured error or null for success


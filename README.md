# Confidant Client (written for Node.JS)

This code was written to talk to [Confidant](http://lyft.github.io/confidant/).

The entire codebase was modeled after their [python-client example](https://github.com/lyft/confidant/blob/master/confidant_client.py).

## How to use?

First, you can obtain it via `npm install confidant-client`

Next, setup your code like this (adjust yours to make yours fit):

```javascript
    var confidant = require('confidant-client');

    confidant.config({
      aws_kms_region: 'us-west-2'
    })

    var config = {
      url: 'https://confidant-production.example.com',
      auth_key: '0123abcd-1234-5678-a123-123a123b123c',
      from_context: 'myservice-production',
      to_context: 'confidant-production',
      token_lifetime: 1
    };

    confidant.get_service(config)
    .then(function(resp){
      console.log(resp);
    }, function(err){
      console.log(err);
    })
```

Confidant/AWS configuration properties:

- aws_kms_region (string): the region to be used by AWS KMS

Configuration object properties:

- token_lifetime (int): token lifetime in minutes (defaults to 1)
- auth_key (string): KMS auth key
- from_context (string): IAM role requesting secrets (our client/what uses this)
- to_context (string): IAM role of the Confidant server
- url (string): URL of the confidant server

## How to contribute?

Please fork this repository, make your code changes, and submit a pull request.

## License

This project uses MIT, but see Lyft's [Confidant](http://lyft.github.io/confidant/) project for more specifics.

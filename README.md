# Confidant Client (written for Node.JS)

This code was written to talk to [Confidant](http://lyft.github.io/confidant/).

The entire codebase was modeled after their [python-client example](https://github.com/lyft/confidant/blob/master/confidant_client.py).

## How to use?

First you need to construct your configuration object:

    var config = {
      url: 'https://confidant-production.example.com',
      auth_key: 'TOO_MANY_SECRETS',
      from_context: 'myservice-production',
      to_context: 'confidant-production',
      token_lifetime: 1
    };

Configuration object properties:

- token_lifetime (int): token lifetime in minutes (defaults to 1)
- auth_key (string): KMS auth key
- from_context (string): IAM role requesting secrets (our client/what uses this)
- to_context (string): IAM role of the Confidant server
- url (string): URL of the confidant server

Second, you should call it like:

    var confidant = require('confidant-client');
    var resp = confidant.get_service(config);

>> Note: From here you will use the response how you see fit.

Note about AWS settings:

AWS KMS settings are defaulting to whatever it is on your local system. In the future,
logic would have to be added to extend this behavior.

## How to contribute?

Please fork this repository, make your code changes, and submit a pull request.

## License

This project uses MIT, but see Lyft's [Confidant](http://lyft.github.io/confidant/) project for more specifics.

var AWS = require('aws-sdk');
var kms = new AWS.KMS();
var moment = require('moment');
var request = require('request');

/**
config object properties:

- token_lifetime (int): token lifetime in minutes (defaults to 1)
- auth_key (string): KMS auth key
- from_context (string): IAM role requesting secrets (our client/what uses this)
- to_context (string): IAM role of the Confidant server
- url (string): URL of the confidant server
**/

module.exports = function get_service(config) {
  var ret = {
    'result': false
  };

  var time_format = "YYYYMMDDTHHmmss";
  var now = moment();
  var not_before = now.format(time_format) + "Z";
  var not_after = now.add(config.token_lifetime || 1, 'minutes').format(time_format) + "Z";

  var params = {
    KeyId: config.auth_key || "", /* required */
    Plaintext: JSON.stringify({
      'not_before': not_before,
      'not_after': not_after
    }), /* required */
    EncryptionContext: {
      'from': config.from_context || "",
      'to': config.to_context || ""
    }
  };

  kms.encrypt(params, function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      //constructs our token
      var token = new Buffer(data.CiphertextBlob).toString('base64');

      //we should be able to talk with Confidant now
      request({
        uri: config.url + "/v1/services/" + config.from_context,
        method: 'GET',
        headers: {
          Authorization: 'Basic ' + new Buffer(config.from_context + ':' + token).toString('base64')
        }
      }, function(err, resp, body) {
        if (err) {
          ret.error = err;
          return;
        }
        ret.service = resp.json();
        ret.result = true;
      });
    }
  });

  return ret;
};

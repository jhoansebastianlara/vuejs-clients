'use strict';

exports.petIdGET = function(args, res, next) {
  /**
   *
   * petId String ID of the pet
   * no response value expected for this operation
   **/
  res.end();
}

exports.rootGET = function(args, res, next) {
  /**
   *
   * limit Integer number of pets to return (optional)
   * returns List
   **/
  var examples = {};
  examples['application/json'] = [ {
  "birthday" : 123,
  "name" : "aeiou"
} ];
  if (Object.keys(examples).length > 0) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(examples[Object.keys(examples)[0]] || {}, null, 2));
  } else {
    res.end();
  }
}

exports.rootPOST = function(args, res, next) {
  /**
   *
   * pet Pet The pet JSON you want to post
   * no response value expected for this operation
   **/
  res.end();
}

exports.rootPUT = function(args, res, next) {
  /**
   *
   * pet Pet The pet JSON you want to post
   * no response value expected for this operation
   **/
  res.end();
}


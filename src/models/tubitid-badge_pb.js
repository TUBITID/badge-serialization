/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.tubitid.badge.Badge', null, global);
goog.exportSymbol('proto.tubitid.badge.Department', null, global);
goog.exportSymbol('proto.tubitid.badge.FacebookMetaData', null, global);
goog.exportSymbol('proto.tubitid.badge.SignedBadge', null, global);
goog.exportSymbol('proto.tubitid.badge.StudentMetaData', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.tubitid.badge.StudentMetaData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.tubitid.badge.StudentMetaData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.tubitid.badge.StudentMetaData.displayName = 'proto.tubitid.badge.StudentMetaData';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.tubitid.badge.StudentMetaData.prototype.toObject = function(opt_includeInstance) {
  return proto.tubitid.badge.StudentMetaData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.tubitid.badge.StudentMetaData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tubitid.badge.StudentMetaData.toObject = function(includeInstance, msg) {
  var f, obj = {
    no: jspb.Message.getFieldWithDefault(msg, 1, 0),
    department: jspb.Message.getFieldWithDefault(msg, 2, 0),
    grade: jspb.Message.getFieldWithDefault(msg, 3, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.tubitid.badge.StudentMetaData}
 */
proto.tubitid.badge.StudentMetaData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.tubitid.badge.StudentMetaData;
  return proto.tubitid.badge.StudentMetaData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.tubitid.badge.StudentMetaData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.tubitid.badge.StudentMetaData}
 */
proto.tubitid.badge.StudentMetaData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNo(value);
      break;
    case 2:
      var value = /** @type {!proto.tubitid.badge.Department} */ (reader.readEnum());
      msg.setDepartment(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setGrade(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.tubitid.badge.StudentMetaData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.tubitid.badge.StudentMetaData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.tubitid.badge.StudentMetaData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tubitid.badge.StudentMetaData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getNo();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getDepartment();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
  f = message.getGrade();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
};


/**
 * optional uint32 no = 1;
 * @return {number}
 */
proto.tubitid.badge.StudentMetaData.prototype.getNo = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.tubitid.badge.StudentMetaData.prototype.setNo = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional Department department = 2;
 * @return {!proto.tubitid.badge.Department}
 */
proto.tubitid.badge.StudentMetaData.prototype.getDepartment = function() {
  return /** @type {!proto.tubitid.badge.Department} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {!proto.tubitid.badge.Department} value */
proto.tubitid.badge.StudentMetaData.prototype.setDepartment = function(value) {
  jspb.Message.setProto3EnumField(this, 2, value);
};


/**
 * optional uint32 grade = 3;
 * @return {number}
 */
proto.tubitid.badge.StudentMetaData.prototype.getGrade = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.tubitid.badge.StudentMetaData.prototype.setGrade = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.tubitid.badge.FacebookMetaData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.tubitid.badge.FacebookMetaData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.tubitid.badge.FacebookMetaData.displayName = 'proto.tubitid.badge.FacebookMetaData';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.tubitid.badge.FacebookMetaData.prototype.toObject = function(opt_includeInstance) {
  return proto.tubitid.badge.FacebookMetaData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.tubitid.badge.FacebookMetaData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tubitid.badge.FacebookMetaData.toObject = function(includeInstance, msg) {
  var f, obj = {
    facebookid: jspb.Message.getFieldWithDefault(msg, 1, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.tubitid.badge.FacebookMetaData}
 */
proto.tubitid.badge.FacebookMetaData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.tubitid.badge.FacebookMetaData;
  return proto.tubitid.badge.FacebookMetaData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.tubitid.badge.FacebookMetaData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.tubitid.badge.FacebookMetaData}
 */
proto.tubitid.badge.FacebookMetaData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setFacebookid(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.tubitid.badge.FacebookMetaData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.tubitid.badge.FacebookMetaData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.tubitid.badge.FacebookMetaData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tubitid.badge.FacebookMetaData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFacebookid();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
};


/**
 * optional string facebookID = 1;
 * @return {string}
 */
proto.tubitid.badge.FacebookMetaData.prototype.getFacebookid = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/** @param {string} value */
proto.tubitid.badge.FacebookMetaData.prototype.setFacebookid = function(value) {
  jspb.Message.setProto3StringField(this, 1, value);
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.tubitid.badge.Badge = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.tubitid.badge.Badge.oneofGroups_);
};
goog.inherits(proto.tubitid.badge.Badge, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.tubitid.badge.Badge.displayName = 'proto.tubitid.badge.Badge';
}
/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.tubitid.badge.Badge.oneofGroups_ = [[4,5]];

/**
 * @enum {number}
 */
proto.tubitid.badge.Badge.MetadataCase = {
  METADATA_NOT_SET: 0,
  STUDENT: 4,
  FACEBOOK: 5
};

/**
 * @return {proto.tubitid.badge.Badge.MetadataCase}
 */
proto.tubitid.badge.Badge.prototype.getMetadataCase = function() {
  return /** @type {proto.tubitid.badge.Badge.MetadataCase} */(jspb.Message.computeOneofCase(this, proto.tubitid.badge.Badge.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.tubitid.badge.Badge.prototype.toObject = function(opt_includeInstance) {
  return proto.tubitid.badge.Badge.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.tubitid.badge.Badge} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tubitid.badge.Badge.toObject = function(includeInstance, msg) {
  var f, obj = {
    id: jspb.Message.getFieldWithDefault(msg, 1, 0),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    expires: jspb.Message.getFieldWithDefault(msg, 3, 0),
    student: (f = msg.getStudent()) && proto.tubitid.badge.StudentMetaData.toObject(includeInstance, f),
    facebook: (f = msg.getFacebook()) && proto.tubitid.badge.FacebookMetaData.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.tubitid.badge.Badge}
 */
proto.tubitid.badge.Badge.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.tubitid.badge.Badge;
  return proto.tubitid.badge.Badge.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.tubitid.badge.Badge} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.tubitid.badge.Badge}
 */
proto.tubitid.badge.Badge.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setExpires(value);
      break;
    case 4:
      var value = new proto.tubitid.badge.StudentMetaData;
      reader.readMessage(value,proto.tubitid.badge.StudentMetaData.deserializeBinaryFromReader);
      msg.setStudent(value);
      break;
    case 5:
      var value = new proto.tubitid.badge.FacebookMetaData;
      reader.readMessage(value,proto.tubitid.badge.FacebookMetaData.deserializeBinaryFromReader);
      msg.setFacebook(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.tubitid.badge.Badge.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.tubitid.badge.Badge.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.tubitid.badge.Badge} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tubitid.badge.Badge.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getExpires();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getStudent();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.tubitid.badge.StudentMetaData.serializeBinaryToWriter
    );
  }
  f = message.getFacebook();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.tubitid.badge.FacebookMetaData.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint32 id = 1;
 * @return {number}
 */
proto.tubitid.badge.Badge.prototype.getId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/** @param {number} value */
proto.tubitid.badge.Badge.prototype.setId = function(value) {
  jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.tubitid.badge.Badge.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/** @param {string} value */
proto.tubitid.badge.Badge.prototype.setName = function(value) {
  jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional uint64 expires = 3;
 * @return {number}
 */
proto.tubitid.badge.Badge.prototype.getExpires = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/** @param {number} value */
proto.tubitid.badge.Badge.prototype.setExpires = function(value) {
  jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional StudentMetaData student = 4;
 * @return {?proto.tubitid.badge.StudentMetaData}
 */
proto.tubitid.badge.Badge.prototype.getStudent = function() {
  return /** @type{?proto.tubitid.badge.StudentMetaData} */ (
    jspb.Message.getWrapperField(this, proto.tubitid.badge.StudentMetaData, 4));
};


/** @param {?proto.tubitid.badge.StudentMetaData|undefined} value */
proto.tubitid.badge.Badge.prototype.setStudent = function(value) {
  jspb.Message.setOneofWrapperField(this, 4, proto.tubitid.badge.Badge.oneofGroups_[0], value);
};


proto.tubitid.badge.Badge.prototype.clearStudent = function() {
  this.setStudent(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.tubitid.badge.Badge.prototype.hasStudent = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional FacebookMetaData facebook = 5;
 * @return {?proto.tubitid.badge.FacebookMetaData}
 */
proto.tubitid.badge.Badge.prototype.getFacebook = function() {
  return /** @type{?proto.tubitid.badge.FacebookMetaData} */ (
    jspb.Message.getWrapperField(this, proto.tubitid.badge.FacebookMetaData, 5));
};


/** @param {?proto.tubitid.badge.FacebookMetaData|undefined} value */
proto.tubitid.badge.Badge.prototype.setFacebook = function(value) {
  jspb.Message.setOneofWrapperField(this, 5, proto.tubitid.badge.Badge.oneofGroups_[0], value);
};


proto.tubitid.badge.Badge.prototype.clearFacebook = function() {
  this.setFacebook(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.tubitid.badge.Badge.prototype.hasFacebook = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.tubitid.badge.SignedBadge = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.tubitid.badge.SignedBadge, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  proto.tubitid.badge.SignedBadge.displayName = 'proto.tubitid.badge.SignedBadge';
}


if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto suitable for use in Soy templates.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
 * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
 *     for transitional soy proto support: http://goto/soy-param-migration
 * @return {!Object}
 */
proto.tubitid.badge.SignedBadge.prototype.toObject = function(opt_includeInstance) {
  return proto.tubitid.badge.SignedBadge.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Whether to include the JSPB
 *     instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.tubitid.badge.SignedBadge} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tubitid.badge.SignedBadge.toObject = function(includeInstance, msg) {
  var f, obj = {
    signature: msg.getSignature_asB64(),
    badge: (f = msg.getBadge()) && proto.tubitid.badge.Badge.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.tubitid.badge.SignedBadge}
 */
proto.tubitid.badge.SignedBadge.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.tubitid.badge.SignedBadge;
  return proto.tubitid.badge.SignedBadge.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.tubitid.badge.SignedBadge} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.tubitid.badge.SignedBadge}
 */
proto.tubitid.badge.SignedBadge.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSignature(value);
      break;
    case 2:
      var value = new proto.tubitid.badge.Badge;
      reader.readMessage(value,proto.tubitid.badge.Badge.deserializeBinaryFromReader);
      msg.setBadge(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.tubitid.badge.SignedBadge.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.tubitid.badge.SignedBadge.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.tubitid.badge.SignedBadge} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.tubitid.badge.SignedBadge.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSignature_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getBadge();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.tubitid.badge.Badge.serializeBinaryToWriter
    );
  }
};


/**
 * optional bytes signature = 1;
 * @return {!(string|Uint8Array)}
 */
proto.tubitid.badge.SignedBadge.prototype.getSignature = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes signature = 1;
 * This is a type-conversion wrapper around `getSignature()`
 * @return {string}
 */
proto.tubitid.badge.SignedBadge.prototype.getSignature_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSignature()));
};


/**
 * optional bytes signature = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSignature()`
 * @return {!Uint8Array}
 */
proto.tubitid.badge.SignedBadge.prototype.getSignature_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSignature()));
};


/** @param {!(string|Uint8Array)} value */
proto.tubitid.badge.SignedBadge.prototype.setSignature = function(value) {
  jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional Badge badge = 2;
 * @return {?proto.tubitid.badge.Badge}
 */
proto.tubitid.badge.SignedBadge.prototype.getBadge = function() {
  return /** @type{?proto.tubitid.badge.Badge} */ (
    jspb.Message.getWrapperField(this, proto.tubitid.badge.Badge, 2));
};


/** @param {?proto.tubitid.badge.Badge|undefined} value */
proto.tubitid.badge.SignedBadge.prototype.setBadge = function(value) {
  jspb.Message.setWrapperField(this, 2, value);
};


proto.tubitid.badge.SignedBadge.prototype.clearBadge = function() {
  this.setBadge(undefined);
};


/**
 * Returns whether this field is set.
 * @return {!boolean}
 */
proto.tubitid.badge.SignedBadge.prototype.hasBadge = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * @enum {number}
 */
proto.tubitid.badge.Department = {
  NONE: 0,
  BTBS: 1,
  IBY: 2,
  GIB: 3,
  UT: 4,
  BSB: 5
};

goog.object.extend(exports, proto.tubitid.badge);

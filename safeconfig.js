//     safeconfig.js v 0.0.3
//     @uthor: Seth Thompson
//     description: This is just a quick library I wrote to store
//					 and manage a configuration file in a more secure
//					 and succinct fashion.
//     Safeconfig may be freely distributed under the MIT license.

"use strict";

var fs = require('fs')
,	crypto = require('crypto');

var self = {};

function create(file,password){
	if (fs.existsSync(file))
		throw new Error("File Already exists");

	var stub = {};
		stub.file = file;
		stub.password = password || '';

	self.config = stub;

	return true;
}

function open(file , password){
	//takes in File location of config file, and Password (optional)
	if (!file)
		throw new Error("Filename is required");

	if (!fs.existsSync(file) )
		throw new Error("Config file Does not exist.");

	var configInput = fs.readFileSync(file,'utf8');

	var decryptedConfig = '';
	if (password){
		try{
			var decipher   = crypto.createDecipher('bf',password);
			decryptedConfig = decipher.update(configInput,'hex','utf8');
			decryptedConfig += decipher.final('utf8');
		}catch (err) {
			throw err;
		}
	}

	var configObj 			= JSON.parse(decryptedConfig || configInput);
		configObj.file 		= file;
		configObj.password	= password || '';

	self.config = configObj;

	return true;
}

function close(file, password){
	//pasword is optional, but if you want to change the file password you can here
	
	password = password || self.config.password || '';
	var outPutConf = JSON.stringify(self.config)

	var encryptedConfig = '';
	if (password){
		try{
			var cipher = crypto.createCipher('bf', password);
			encryptedConfig =  cipher.update(outPutConf ,'utf8','hex');
			encryptedConfig += cipher.final('hex');
		}catch (err) {
			throw err;
		} 

	}

	//Write the config, clear the object.
	var saveLocation = file || self.config.file;
	fs.writeFileSync(saveLocation , encryptedConfig || outPutConf );
	self = {};

	return true;
}

//Pass in regex for auto validation.
function add(key, val, regex){
	if (!key || !val)
		throw new Error("Invalid Key:Value Pair");

	if (self.config.hasOwnProperty(key))
		throw new Error("Key already exists");

	return update(key,val,regex);
}

function update(key, val, regex){
	if (!key || !val)
		throw new Error("Invalid Key:Value Pair");

	if (key.charAt(0) === '_')
		throw new Error("Keys cannot start with _");

	//validate on optional regex
	if (regex){
		var strVal;
		if (typeof(val) !== 'string')
			strVal = val.toString();
		else
			strVal = val;

		if ( strVal !== strVal.match(regex)[0])
			return false; 

		self.config['_' + key ] = regex.toString();
	}
	
	self.config[key] = val;
	return true;

}

function strToRegex(str){
	var opt = str.match(/(\w+)$/)[0];
	if (opt)
		str = str.match(/(\S+)\//)[0];

	return new RegEx(str,opt);
}

function del(key){
	if (key.charAt(0) === '_')
		key = key.substring(1);

	delete self.config[key];
	delete self.config['_'+key];

	return true;
}

function get(key){
	return self.config[key] || '';
}

function getValidation(key){
	return self.config['_' + key] || '';
}

function output(){
	return JSON.stringify(self.config,null,'\t');
}

function getInfo(obj){
	//This gets info for the current level,
	//  if you want info of a sub-object, you need to pass that in
	//  it is too confusing if you have nested object arrays.
	if (!obj) obj = self.config;

	var info = {
		keys: [],
		keyCount: 0
	};

	for (var key in obj){
		if (key.charAt(0) === '_')
			continue;

		info.keys.push(key);
		info.keyCount += 1;

		var type = '';
		if (Array.isArray(obj[key]))
			type = 'array';
		else
			type = typeof(obj[key]);
		
		if (info[type])
			info[type] += 1;
		else
			info[type] = 1;
	}

		return info;
}

function mapTree(show){
	if (show)
		console.log(display(self.config));

	return display(self.config);
}


module.exports = {
	create			: create,
	open 			: open,
	close			: close,
	add  			: add,
	del 			: del,
	get 			: get,
	getValidation 	: getValidation,
	update			: update,
	getInfo 		: getInfo,
	mapTree 		: mapTree,
	output 			: output
}	

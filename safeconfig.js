//     safeconfig.js v 0.0.1
//     @uthor: Seth Thompson
//     description: This is just a quick library I wrote to store
//					 and manage a configuration file in a more secure
//					 and succinct fashion.
//     Safeconfig may be freely distributed under the MIT license.

var fs = require('fs'),
	crypto = require('crypto');

var self = {};


function open(file , password){
	//takes in File location of config file, and Password (optional)
	if (!fs.existsSync(file) )
		throw new Error("Config file Does not exist.");

	var configInput = fs.readFileSync(file);
	
	var decryptedConfig = '';	
	if (password){
		var decipher   = crypto.createDecipher('bf',password);
		decryptedConfig = decipher.update(configInput,'hex','utf8');
		decryptedConfig += decipher.final('utf8');
	}

	var configObj 			= JSON.parse(decryptedConfig || configInput);
		configObj.file 		= file 		|| './conf';
		configObj.password	= password  || 'DefaultPW' ; //TODO: figure out default password? Sure not super secure, but prevents cleartext being stored.

	self.config = configObj;
}

function close(file){
	
	var password = self.config.password;
	var outPutConf = JSON.stringify(self.config)

	var encryptedConfig = '';
	if (password){
		var cipher = crypto.createCipher('bf', password);

		encryptedConfig =  cipher.update(outPutConf ,'utf8','hex');
		encryptedConfig += cipher.final('hex');
	}

	//Write the config, clear the object.
	var saveLocation = file || self.config.file;
	fs.writeFileSync(saveLocation , encryptedConfig || outPutConf );
	self = {};
}

function add(key, val, type){
	if (!key || !val)
		throw new Error("Invalid Key:Value Pair");

	if (self.config.hasOwnProperty(key))
		throw new Error("Key already exists");

	if (key.charAt(0) === '_')
		throw new Error("Keys cannot start with _");

	//validate on optional type
	if ( type && val !== val.match(type))
		return false; //If no regex match then we failed.

	self.config['_' + key ] = type;
	self.config[key] = val;
	return true;
}

function del(key){
	delete self.config[key]
}

function get(key){
	return self.config[key] || '';
}

function output(){
	return JSON.stringify(self.config,null,'\t');
}

function getInfo(){
	var info = {
		keys: [],
		keyCount: 0,
	};
	for (var i in self.config){
		info.keys.push(i);
		info.keyCount += 1;	
	}

		return info;
}

function mapConfigTree(){
	//TODO

}

function display(node){
	res = {};
	for (var key in node){
		if (Array.isArray(node[key])){
			for (var i in node[key]){
				if (!ary) var ary = [];
				ary.push(display(node[key][i]));
			}
			res[key] = ary;
		}else if (typeof(node[key]) == 'object')
			res[key] = display(node[key]);
		else
			res[key] = node[key];

	}
}


exports.open 	= open;
exports.add  	= add;
exports.del 	= del;
exports.get 	= get;
exports.getInfo = getInfo;
exports.output 	= output;	

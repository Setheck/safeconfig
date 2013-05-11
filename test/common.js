//     common.js
//     @uthor: Seth Thompson
//     description: common values for tests.


"use strict";

var fs 			= require('fs')
,	safeconfig 	= require('../safeconfig.js');

var NOFILE 		= './test_config_NOPE.json';
var FILENAME 	= './test_config.json';
var CLEARFILE 	= './test_configclear.json';
var PASSWORD 	= 's3crets';

var KEYS = ['key1','key2','key3','key4',
			'key5','key6','key7','key8',
			'key9','key10','key11','key12'];

var VALUES = ['value1','value2','value3','value4','value5'
			 ,'value6','value7','value8','value9','value10'];

var ARRAY = ['this','is','a','test','array'];
var OBJECT = {
				some: 'object',
				todo: 'some',
				testing: 'yay'
			};

module.exports = {
	FILENAME: 	FILENAME,
	PASSWORD: 	PASSWORD,
	CLEARFILE: 	CLEARFILE,
	KEYS: 		KEYS,
	VALUES: 	VALUES,
	ARRAY: 		ARRAY,
	OBJECT: 	OBJECT,

	safeconfig: safeconfig
};
//     common.js
//     @uthor: Seth Thompson
//     description: common values for tests.


"use strict";

var fs 			= require('fs')
,	safeconfig 	= require('../safeconfig.js');

var NOFILE 		= './test/test_config_NOPE.json';
var FILENAME 	= './test/test_config.json';
var CLEARFILE 	= './test/test_configclear.json';
var PASSWORD 	= 's3crets';

var KEY =  'testKey';

var VALUE = 'testValue';

var ARRAY = ['this','is','a','test','array'];
var OBJECT = {
				some: 'object',
				todo: 'some',
				testing: 'yay'
			};

var NESTEDOBJ = {
					aKey: [ 
						'test1',
						{ test2: 'something'}
						],
				};
var WORDMATCH = /\w+/;

module.exports = {
	NOFILE: 	NOFILE,
	FILENAME: 	FILENAME,
	PASSWORD: 	PASSWORD,
	CLEARFILE: 	CLEARFILE,
	KEY: 		KEY,
	VALUE: 		VALUE,
	ARRAY: 		ARRAY,
	OBJECT: 	OBJECT,
	NESTEDOBJ: 	NESTEDOBJ,
	WORDMATCH: 	WORDMATCH,

	safeconfig: safeconfig
};
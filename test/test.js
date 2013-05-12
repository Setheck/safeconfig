//     test.js
//     @uthor: Seth Thompson
//     description: Tests for safeconfig.js

"use strict";

var assert = require('assert')
,	common = require('./common.js')
,	safeconfig = common.safeconfig;


// Utility function

function buildUp(){
	safeconfig.create(common.NOFILE);
	safeconfig.add(common.KEY,common.VALUE,common.WORDMATCH);
	safeconfig.add('array',common.ARRAY);
	safeconfig.add('object',common.OBJECT);
	safeconfig.add('nestedobj',common.NESTEDOBJ);
/* THIS IS WHAT SHOULD BE DESCRIBED BY THE ABOVE (for getInfo)
	{ 
		keys: 
   		[ 	'file',
     	  	'password',
     		'testKey',
     		'array',
     		'object',
     		'nestedobj'
     	],
  		keyCount: 6,
  		string: 3,
  		array: 1,
  		object: 2 
  	}
  */
}

function tearDown(files){

}

//Tests

function test_create(){
	var msg = "Problem with create()";
	assert(safeconfig.create(common.NOFILE), true, msg);
}

function test_open(){
	var msg = "Poblem with open";
	assert(safeconfig.open(common.CLEARFILE), true, msg);
	assert(safeconfig.open(common.FILENAME,common.PASSWORD), true, msg);

}
function test_close(){
	var msg = "Problem with close";
	safeconfig.open(common.FILENAME,common.PASSWORD);
	assert(safeconfig.close(common.FILENAME,common.PASSWORD), true, msg);

	safeconfig.open(common.CLEARFILE);
	assert(safeconfig.close(common.CLEARFILE), true, msg);

}

function test_add(){
	var msg = "Problem with add()";
	safeconfig.create(common.NOFILE);
	assert(safeconfig.add(common.KEY,common.VALUE), true, msg);
	assert(safeconfig.add('array',common.ARRAY), true, msg);
	assert(safeconfig.add('object',common.OBJECT), true, msg);
	assert(safeconfig.add('nestedobj',common.NESTEDOBJ), true, msg);	

	assert(safeconfig.add('someKey', 'string', common.WORDMATCH ), true, msg);
	assert(safeconfig.add('someNums', 23456, common.WORDMATCH ), false, msg);

}

function test_del(){
	var msg = "Problem with del()";
	buildUp();

	assert(safeconfig.del(common.KEY), true, msg);
	assert(safeconfig.del('array'), true, msg);
	assert(safeconfig.del('object'), true, msg);
	assert(safeconfig.del('nestedobj'), true, msg);

}

function test_get(){
	var msg = "Problem with get()";
	buildUp();

	assert(safeconfig.get(common.KEY) === common.VALUE, true, msg);
	assert(safeconfig.get('array') === common.ARRAY, true, msg);
	assert(safeconfig.get('object') === common.OBJECT, true, msg);
	assert(safeconfig.get('nestedobj') === common.NESTEDOBJ, true, msg);

}

function test_getValidation(){
	var msg = "Problem with getValidation()";
	buildUp();
	assert(safeconfig.getValidation(KEY) === common.WORDMATCH, true, msg);
}

function test_update(){
	var msg = "Problem with update()";
	buildUp();

	assert(safeconfig.update(common.key,common.VALUE), true, msg);
}

function test_getInfo(){
	var msg = "Problem with getInfo()";
	buildUp();

	var ObjDesc = { 
		keys: 
   		[ 	'file',
     	  	'password',
     		'testKey',
     		'array',
     		'object',
     		'nestedobj'
     	],
  		keyCount: 6,
  		string: 3,
  		array: 1,
  		object: 2 
  	}

	assert(JSON.stringify(safeconfig.getInfo()) === JSON.stringify(ObjDesc), true, msg);
}

function test_mapTree(){
	//TBD
	//safeconfig.mapTree(true);
}


test_create();
test_open();
test_close();
test_add();
test_del();
test_get();
test_getInfo();
test_mapTree();

console.log("All tests pass");
//     test.js
//     @uthor: Seth Thompson
//     description: Tests for safeconfig.js

"use strict";

var assert = require('assert')
,	common = require('./common.js')
,	safeconfig = common.safeconfig;

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
	safeconfig.close(common.FILENAME,common.PASSWORD);

}

function test_add(){
	var msg = "Problem with add()";


}

function test_del(){

}

function test_get(){

}

function test_getInfo(){

}

function test_mapTree(){

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
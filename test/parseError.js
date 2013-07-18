var assert = require("assert");
var fs = require("fs");
var exec = require("child_process").exec;

exports.error = function(){
	exec("node xpftojson test/error.xml", function(err, stdout, stderr){
		assert(stderr.indexOf("\x1B[31mERROR\x1B[0m: Invalid XML") === 0, "Erroneous XML not being handled properly" + stderr);
	});
}
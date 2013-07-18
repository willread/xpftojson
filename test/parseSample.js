var assert = require("assert");
var fs = require("fs");
var temp = require("temp");
var exec = require("child_process").exec;

var expected = JSON.stringify([
	{
		"name": [
			"Sample Puzzle"
		],
		"author": [
			"William Blanchette"
		],
		"clues": {
			"across": [
				{
					"row": 1,
					"column": 1,
					"number": 1,
					"answer": "A",
					"clue": "Clue 1"
				},
				{
					"row": 2,
					"column": 1,
					"number": 3,
					"answer": "CD",
					"clue": "Clue 3"
				}
			],
			"down": [
				{
					"row": 1,
					"column": 2,
					"number": 2,
					"answer": "AD",
					"clue": "Clue 2"
				}
			]
		}
	}
]);

exports.parseToStdout = function(){
	exec("node xpftojson test/sample.xml", function(err, stdout, stderr){
		assert(JSON.stringify(JSON.parse(stdout)) === expected, "Parsed stdout does not match expectations");
	});
}

exports.parseToFile = function(){
	var path = temp.path();
	exec("node xpftojson -t " + path + " test/sample.xml", function(err, stdout, stderr){
		fs.readFile(path, "utf8", function(err, data){
			assert(JSON.stringify(JSON.parse(data)) === expected, "Parsed file does not match expectations");
		});
	});
}
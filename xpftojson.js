#!/usr/bin/env node

var fs = require("fs"), util = require("util");
var xml2js = require("xml2js");
var cli = require("cli");

var handleError = function(err){
	if(err){
		cli.error(err.toString().replace("Error: ", ""));
		process.exit();
	}
}

cli.setUsage("xpftojson [OPTIONS] [FILE]");

cli.parse({
	target: ["t", "Write output to file rather than stdout", "file"]
});

cli.main(function(args, options){
	if(args.length === 0){
		cli.getUsage();
		process.exit();
	}

	fs.exists(args[0], function(exists){
		if(!exists) handleError("File does not exist");
		
		fs.readFile(args[0], function(err, data){
			handleError(err);
			
			var parser = new xml2js.Parser({
				trim: true,
				normalize: true,
				normalizeTags: true,
				strict: false,
				mergeAttrs: true
			});	
			parser.parseString(data, function(err, result){
				handleError(err);

				var puzzles = [], ii, p, puzzle, jj, c, clue, output;
				
				try{
					for(ii = 0; ii < result.puzzles.puzzle.length; ii++){
						p = result.puzzles.puzzle[ii];
						puzzle = {
							name: p.title,
							author: p.author,
							clues: {
								across: [],
								down: []
							}
						};
						
						for(jj = 0; jj < p.clues[0].clue.length; jj++){
							c = p.clues[0].clue[jj];
							clue = {
								row: parseInt(c.ROW),
								column: parseInt(c.COL),
								number: parseInt(c.NUM),
								answer: c.ANS.toUpperCase(),
								clue: c._
							}
							
							if(c.DIR.toLowerCase() === "across"){
								puzzle.clues.across.push(clue);
							}else{
								puzzle.clues.down.push(clue);
							}
						}
						
						puzzles.push(puzzle);
					}
				}catch(err){
					handleError("Invalid XML");
				}
				
				output = JSON.stringify(puzzles, null, "\t") + "\n";
				
				if(!options.target){
					console.log(output);
				}else{
					fs.writeFile(options.target, output, function(err){
						handleError(err);
						
						cli.ok("JSON written to \"" + options.target + "\"");
					});
				}
			});
		});
	});	
});

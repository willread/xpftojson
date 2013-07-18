xpftojson
=========

A commandline utility written in node.js which converts XPF files [XPF Universal Crossword Puzzle Data Format](http://www.xwordinfo.com/XPF/) files into JSON.

**Usage:**

Install using NPM.

	npm install -g xpftojson

Generate JSON to sdtout.

	xpftojson puzzle.xml

Optionally, write JSON to a file.

	xpftojson -t output.json puzzle.xml

**Development**

Check out the source.

	git clone https://github.com/collectivecognition/xpftojson
	cd xpftojson
	
Install dependencies:

	npm install
	
Run tests.

	npm test
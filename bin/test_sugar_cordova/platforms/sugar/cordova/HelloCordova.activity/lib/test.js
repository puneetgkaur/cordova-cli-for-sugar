var fs = require('fs');
var path = require('path');
var filePath1 = path.join(__dirname + '/sugar-web/env.js');
var filePath2 = path.join(__dirname + '/sugar-web/env1.js');
var write =0;
var writehead=0;
var writetail=0;
var str1="/*CONTENT START*/";
var str2="/*CONTENT END*/";
var header="define(\"cordova/sugar/env\",function(require, exports, module){"+"\n";
var tail="    module.exports = env;"+"\n"+"});";
fs.writeFile(filePath2, '', function(){console.log('done')})
//fs.truncate(filePath2, 0, function(){console.log('done')})


fs.readFileSync(filePath1).toString().split('\n').forEach(function (line) { 
   	console.log(line);

	if(write==0 && line==str1)
	{
	    write =1;
	    console.log("yes1, write="+write);
	    writehead=1;
	}

	if(write ==1 && line==str2)
	{
	    write=0;
	    console.log("yes2,write="+write);
	    writetail=1;
	}

	if(writehead==1)
	{
	    fs.appendFileSync(filePath2, header);
	    writehead=0;
	}

	if(writetail==1)
	{
	    fs.appendFileSync(filePath2, tail);
	    writetail=0;
	}

	if(write == 1)
	{
	     console.log(write);
	    fs.appendFileSync(filePath2, line.toString() + "\n");
	}
});

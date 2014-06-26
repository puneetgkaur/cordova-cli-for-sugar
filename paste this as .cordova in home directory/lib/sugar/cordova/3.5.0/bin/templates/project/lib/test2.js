var fs = require('fs');
var path = require('path');
var input_filepath={};
var output_filepath={};
var input_filePath[0] = path.join(__dirname + '/sugar-web/env.js');
var output_filePath[0] = path.join(__dirname + '/sugar-web/env1.js');
var input_filePath[1] = path.join(__dirname + '/sugar-web/bus.js');
var output_filePath[1] = path.join(__dirname + '/sugar-web/bus1.js');
var write =0;
var writehead=0;
var writetail=0;
var str1="/*CONTENT START*/";
var str2="/*CONTENT END*/";
var writeheader={};
var writetail={};
var writeheader[0]="define(\"cordova/sugar/env\",function(require, exports, module){"+"\n";
var writetail[0]="    module.exports = env;"+"\n"+"});";
var writeheader[1]="head1";
var writetail[1]="tail1";
fs.writeFile(filePath2, '', function(){console.log('done')})
//fs.truncate(filePath2, 0, function(){console.log('done')})

for(i=0;i<=1;i++)
{
	var header=writeheader[i];
	var tail=writetail[i];
	var filePath1=input_filepath[i];
	var filePath2=input_filepath[i];
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
}

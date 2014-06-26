var fs=require('fs');
//var dir='./sugar-web';
var data={};
var path = require('path');
var filePath2 = path.join(__dirname + '/new.js');
var files_to_be_read=new Array();
fiiles1=read_directory(__dirname+'/sugar-web');
//console.log("dir"+dir+"   dir_name"+__dirname+'/sugar-web');
function read_directory(dir_name){

		fs.readdir(dir_name,function(err,files){
		    if (err) console.log(err);

//		    console.log(files);
//		    console.log(files[0]);
//		    console.log(files.length);

		    var i=0;
		    for(i=0;i<files.length;i++)
		    {
			var file_name=files[i];
			
			    filePath3 = path.join(dir_name+"/"+files[i]);
			    //console.log("filePath3"+filePath3);
			    stats = fs.lstatSync(filePath3);

			    // Is it a directory?
			    if (stats.isDirectory()) {
				//console.log("yes");
				var files_in_dir=read_directory(filePath3);
				files_to_be_read.push(files_in_dir);
//console.log("hiiiiii\n"+files_to_be_read);
			    }
			    else
			    {
			  //  	console.log("no");
				files_to_be_read.push(files[i]);
//console.log("hiiiiii\n"+files_to_be_read);
			    }
		    }

		    files.forEach(function(file){

			//console.log(file);
// check if file is a js file if yes then push it to array
	
		/*
			var filePath1 = path.join(__dirname + "/sugar-web/"+file);
			fs.stat(filePath1,function(obj_file){
				console.log(obj_file.isFile);
			})
	

			fs.readFile(filePath1, 'utf8', function (err,data) {
			  if (err) {
			    return console.log(err);
			  }
			  console.log(data);
			});

			fs.readFileSync(filePath1).toString().split('\n').forEach(function (line) { 
			   	console.log(line);
				fs.appendFileSync(filePath2, line.toString() + "\n");
			});
		*/
		    });

		});
return files_to_be_read;

}

console.log("hiiiiii\n"+fiiles1);

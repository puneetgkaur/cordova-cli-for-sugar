#!/usr/bin/env node

/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
*/

var shell   = require('shelljs'),
    path    = require('path'),
    fs      = require('fs'),
    ROOT    = path.join(__dirname, '..');

var www_dir = path.join(__dirname,"..","..","www");

var project_dir=path.join(__dirname,"..","project");

shell.mkdir('-p',project_dir);

var project_template_dir=path.join(__dirname,"..","..","project_template")

var sugar_cordova_dir=path.join(__dirname,"..");

function copy_files_to_prj_dir()
{



	fs.readdir(project_template_dir,function(err,files){
		if (err) console.log(err);
		else
		{
		    var i=0;
		    for(i=0;i<files.length;i++)
		    {
			var file=files[i];
			file_path = path.join(project_template_dir+"/"+file);
			stats = fs.lstatSync(file_path);
			if (!stats.isDirectory()&&file!='index.html') {
				shell.cp('-f',file_path, project_dir);
			}

			if (stats.isDirectory()) {
				shell.cp('-rf', file_path, project_dir);
			}	
	
		    }
		}

	});




	fs.readdir(www_dir,function(err,files){
		if (err) console.log(err);
		else
		{
		    var i=0;
		    for(i=0;i<files.length;i++)
		    {
			
			var file=files[i];
			file_path = path.join(www_dir+"/"+file);
			stats = fs.lstatSync(file_path);
			if (!stats.isDirectory()&&file!='index.html') {
				shell.cp('-f',file_path, project_dir);
			}

			if (stats.isDirectory()) {
				shell.cp('-rf', file_path, project_dir);
			}			

		    }
		}

	});

	var platform_www=path.join(__dirname,"..","..","platform_www");

	fs.readdir(platform_www,function(err,files){
		if (err) console.log(err);
		else
		{
		    var i=0;
		    for(i=0;i<files.length;i++)
		    {
			
			var file=files[i];
			file_path = path.join(platform_www+"/"+file);
			stats = fs.lstatSync(file_path);
			if (!stats.isDirectory()&&file!='index.html') {
				shell.cp('-f',file_path, project_dir);
			}

			if (stats.isDirectory()) {
				shell.cp('-rf', file_path, project_dir);
			}
		    }
		}

	});

}



function generate_xo()
{

	var file_prj_name= path.join(sugar_cordova_dir,'Project_Name.txt');

	fs.readFile(file_prj_name, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }

          var activity_dir=path.join(sugar_cordova_dir,data+".activity");
	  //console.log("project name - "+data);
	  shell.mkdir('-p',activity_dir);
          shell.cp('-rf', path.join(project_dir,'*'),path.join(activity_dir));
	  shell.cd(sugar_cordova_dir);
	  shell.exec("zip -r "+data+".xo "+data+".activity");
	  console.log("the .xo file is stored at : "+ sugar_cordova_dir);
	});

}


function update_index_html_with_iframe()
{
	var prj_template_index_html=path.join(project_template_dir,'index.html');
	var www_index_html=path.join(www_dir,'index.html');

	fs.readFile(www_index_html, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  console.log("index.html : "+data);	  
	  shell.echo(data).to(path.join(project_dir,"users_index_page.html"));

	});


		fs.readFile(prj_template_index_html, 'utf8', function (err,data) {
		  if (err) {
		    return console.log(err);
		  }
		  console.log("index.html : "+data);	  

	

	var body_before_canvas = data.match(/<body[^>]*>([\s\S]*?)<div id=\"canvas\">/g);
	console.log("html content from body tag till canvas div"+body_before_canvas);
	updated_body_content=body_before_canvas[0].concat("\n  <iframe  src=\"users_index_page.html\" style=\"width:100%;height:100%\" scrolling=\"no\"></iframe>\n</div>\n</body>");
	updated_data=data.replace(/<body[^>]*>([\s\S]*?)<\/body>/g,updated_body_content);


			fs.writeFile(path.join(project_dir,'index.html'),updated_data, function(err) {
			    if(err) {
				console.log(err);
			    } else {
				console.log("updated index.html");
				generate_xo();
			    }
			});		  		  

		  
		});


}

function default_update_index_html()
{
	var user_index_html=path.join(www_dir,'index.html');
	
	fs.readFile(user_index_html, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }
	  console.log("index.html : "+data);

	  var head_content = data.match(/<head[^>]*>([\s\S]*?)<\/head>/g);
//	console.log("head_Content:"+head_content);
	head_start_tag=head_content.toString().match(/<head[^>]*>/g);
//	console.log("head_start_tag:"+head_start_tag);
	head_end_tag=head_content.toString().match(/<\/head>/g);
//	console.log("head_end_tag:"+head_end_tag);
	head_content1=head_content.toString().replace(/<head[^>]*>/g,"");
//	console.log("head_Content1:"+head_content1);
	head_content2=head_content1.toString().replace(/<\/head>/g,"");
//	console.log("head_Content2:"+head_content2);
	head_content3=head_content2.concat("        <link rel=\"stylesheet\" media=\"not screen and (device-width: 1200px) and (device-height: 900px)\"      href=\"lib/sugar-web/graphics/css/sugar-96dpi.css\">\n        <link rel=\"stylesheet\" media=\"screen and (device-width: 1200px) and (device-height: 900px)\"      href=\"lib/sugar-web/graphics/css/sugar-200dpi.css\">\n        <link rel=\"stylesheet\" href=\"css/activity.css\">\n        <script data-main=\"js/loader\" src=\"lib/require.js\"></script>");
//	console.log("head_content3:"+head_content3);
	head_content4=head_content3.concat("\n    "+head_end_tag);
//	console.log("head_content4:"+head_content4);
	head_content5=" "+head_start_tag[0].concat(head_content4);
//	console.log("head_content5:\n"+head_content5);
	
	var data_after_replacing_head= data.replace(/<head[^>]*>([\s\S]*?)<\/head>/g,head_content5);
//	console.log("data after updating head\n : "+data_after_replacing_head);

	var body_content = data.match(/<body[^>]*>([\s\S]*?)<\/body>/g);
//	console.log("body_Content:"+body_content);
	body_start_tag=body_content.toString().match(/<body[^>]*>/g);
//	console.log("body_start_tag:"+body_start_tag);
	body_end_tag=body_content.toString().match(/<\/body>/g);
//	console.log("body_end_tag:"+body_end_tag);
	body_content1=body_content.toString().replace(/<body[^>]*>/g,"");
//	console.log("body_Content1:"+body_content1);
	body_content2=body_content1.toString().replace(/<\/body>/g,"");
//	console.log("body_Content2:"+body_content2);
	body_content3=body_start_tag[0].concat("\n        <div id=\"main-toolbar\" class=\"toolbar\">\n          <button class=\"toolbutton\" id=\"activity-button\" title=\"My Activity\"></button>\n\n\n          <!-- Add more buttons here -->\n\n          <!-- Buttons with class=\"pull-right\" will be right aligned -->\n          <button class=\"toolbutton pull-right\" id=\"stop-button\" title=\"Stop\"></button>\n        </div>\n\n        <!-- The content of your activity goes inside the canvas -->\n   <div id=\"canvas\">",body_content2,"   </div>\n    ",body_end_tag);
//	console.log("body_content3:"+body_content3);

	var data_after_replacing_body= data_after_replacing_head.replace(/<body[^>]*>([\s\S]*?)<\/body>/g,body_content3);
//	console.log("data after updating body\n : "+data_after_replacing_body);

			fs.writeFile(path.join(project_dir,'index.html'),data_after_replacing_body, function(err) {
			    if(err) {
				console.log(err);
			    } else {
				console.log("updated index.html");
				generate_xo();
			    }
			}); 




	});


 
}


module.exports.run = function(option) {

copy_files_to_prj_dir();

//get the name of the project

console.log("option : "+option);

option = typeof option !== 'undefined' ? option : "hello";

console.log("option : "+option);

//update index.html according to the option mentioned
if(option == 'iframe')
{
  update_index_html_with_iframe();
}
else
{
  default_update_index_html();
}

//console.log("ROOT : "+ROOT);

/*
	var file_prj_name= path.join(sugar_cordova_dir,'Project_Name.txt');

	fs.readFile(file_prj_name, 'utf8', function (err,data) {
	  if (err) {
	    return console.log(err);
	  }

          var activity_dir=path.join(sugar_cordova_dir,data+".activity");
	  //console.log("project name - "+data);
	  shell.mkdir('-p',activity_dir);
          shell.cp('-rf', path.join(project_dir,'*'),path.join(activity_dir));
	  shell.cd(sugar_cordova_dir);
	  shell.exec("zip -r "+data+".xo "+data+".activity");
	  console.log("the .xo file is stored at : "+ sugar_cordova_dir);
	});
*/

//shell.mkdir('-p',path.join(project_path,'project'));
}


module.exports.help = function() {
    console.log('Give the help instructions for sugar here');
    console.log('By default the toolbar is included in the activity as it is');
    console.log('With the -- iframe option the toolbar is included within the iframe');
    console.log('With -- notoolbar option , no toolbar is included');
    process.exit(0);
}

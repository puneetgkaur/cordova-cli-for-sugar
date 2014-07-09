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
var shell = require('shelljs'),
    child_process = require('child_process'),
    Q     = require('q'),
    path  = require('path'),
    fs    = require('fs'),
    ROOT    = path.join(__dirname, '..', '..');

exports.createProject = function(project_path, package_name, project_name, project_template_dir, use_shared_project, use_cli_template) {

console.log("project_path:"+project_path+"; package_name:"+package_name+"; project_name:"+project_name+"; project_template_dir:"+project_template_dir+"; use_shared_project:"+use_shared_project+"; use_cli_template:"+use_cli_template);


    var VERSION = fs.readFileSync(path.join(ROOT, 'VERSION'), 'utf-8').trim();

    // Set default values for path, package and name
    project_path = typeof project_path !== 'undefined' ? project_path : "CordovaExample";
    project_path = path.relative(process.cwd(), project_path);
    package_name = typeof package_name !== 'undefined' ? package_name : 'my.cordova.project';
    project_name = typeof project_name !== 'undefined' ? project_name : 'CordovaExample';
    project_template_dir =  path.join(ROOT, 'bin', 'templates');

    // Check if project already exists
    if(fs.existsSync(project_path)) {
        return Q.reject('Project already exists! Delete and recreate');
    }

    if (!/[a-zA-Z0-9_]+\.[a-zA-Z0-9_](.[a-zA-Z0-9_])*/.test(package_name)) {
        return Q.reject('Package name must look like: com.company.Name');
    }


        // Log the given values for the project
        console.log('Creating Cordova project for the Sugar platform:');
        console.log('\tPath: ' + project_path);
        console.log('\tPackage: ' + package_name);
        console.log('\tName: ' + project_name);


        console.log('Copying template files...');

	
            // copy project template
            shell.mkdir('-p',path.join(project_path,'project_template'));
	    shell.cp('-r', path.join(project_template_dir,'project','*'), path.join(project_path,'project_template') );

/*
            shell.cp('-r', path.join(project_template_dir, 'activity'),path.join(project_path,'project'));
            shell.cp('-r', path.join(project_template_dir, 'css'), path.join(project_path,'project'));
            shell.cp('-r', path.join(project_template_dir, 'js'), path.join(project_path,'project'));
            shell.cp('-r', path.join(project_template_dir, 'lib'), path.join(project_path,'project'));
            shell.cp(path.join(project_template_dir, 'setup.py'), path.join(project_path,'project'));
            shell.cp(path.join(project_template_dir, 'index.html'), path.join(project_path,'project'));
            shell.cp(path.join(project_template_dir, 'LICENSE'),path.join(project_path,'project'));
            shell.cp(path.join(project_template_dir, 'package.json'), path.join(project_path,'project'));
            shell.cp(path.join(project_template_dir, 'README.md'), path.join(project_path,'project'));
*/


           shell.mkdir('-p',path.join(project_path,'cordova'));
           shell.cp('-r', path.join(project_template_dir, 'cordova','*'),path.join(project_path,'cordova'));

  console.log('Project successfully created.');

  return;

};

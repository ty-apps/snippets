# GETTING STARTED

This is a bunch of modular gulp tasks that together creates a powerfull compiler that handels:
* Development (node) server with files-watch & live-reload (via BrowserSync).
* Auto-injection of bower dependencies.
* CSS aggregation and minifcation.
* JS aggregation and minifcation.

To run the compiler you must install all dependencies by running 'npm install' in
the project's root folder, this will install everything you need to work on this project.
If you need installation instruction for npm you can find it here:
http://howtonode.org/introduction-to-npm

After that you can run the compiler by running 'gulp' in the project's root folder.
Now you'll have a running process that watches you're files for changes and a local
server (FYI it can be accessed from other devices as well) with an open browser tab
that shows the project's index.html.

To install front-end components simply use 'bower install --save <packagename>',
wiredep will pick those up and automatically inject them into index.html

## TOOLS

For reference, these are some of the tools we're using:

  * gulp.js - http://gulpjs.com/
  * UglifyJS - https://github.com/mishoo/UglifyJS2
  * BrowserSync - http://www.browsersync.io/
  * Sass & Compass - http://sass-lang.com/ & http://compass-style.org/
  * Wiredep - https://github.com/taptapship/wiredep
  * Usemin - https://github.com/zont/gulp-usemin


## GULP TASKS

All of the tasks for the compiler are inside /gulp/tasks
The compiler will parse any task added to this folder.


## JS COMPILATION

every folder under /src/js is compiled into a single file in /www/js plus a
minified version of the same file.
This allows us to break down a single script into many small scripts.


## CSS COMPILATION

The Sass files in /src/scss are compiled using Sass & Compass and produces two
files, one normal and one minified.

var gulp = require('gulp');
var argv = require('yargs').argv;
var c = require('colors');
var targz = require('tar.gz');
var fs = require('fs');

var repo = "./repo";
var components = "./components";


gulp.task('package',function(){
  if(argv.name == undefined || argv.version == undefined){
    console.log(c.red("Please enter a valid package name and version"));
  }
  else {
    console.log(c.green("PACKAGE NAME : ",argv.name));
    console.log(c.green("PACKAGE VERSION : ",argv.version));

    // Create all streams that we need
    var read = targz().createReadStream(components+"/"+argv.name);
    var write = fs.createWriteStream(repo+"/"+argv.name+"-"+argv.version+'.tar.gz');

    // Let the magic happen
    read.pipe(write);
  }
});

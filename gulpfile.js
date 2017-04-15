var gulp = require('gulp');
var argv = require('yargs').argv;
var c = require('colors');
var targz = require('tar.gz');
var fs = require('fs');

gulp.task('package',function(){
  if(!argv.name || !argv.version || !argv.repo || !argv.base){
    console.log(c.red("Usage : gulp package --name <package name>\
     --version <package version>\
     --repo <repository path>\
     --base <base directory where the package is currently as directory>"));
  }
  else {
    console.log(c.green("PACKAGE NAME : ",argv.name));
    console.log(c.green("PACKAGE VERSION : ",argv.version));
    console.log(c.green("REPO : ",argv.repo));
    console.log(c.green("BASE : ",argv.base));

    // Create all streams that we need
    var read = targz().createReadStream(argv.base+"/"+argv.name);
    var write = fs.createWriteStream(argv.repo+"/"+argv.name+"-"+argv.version+'.tar.gz');

    // Let the magic happen
    read.pipe(write);
  }
});

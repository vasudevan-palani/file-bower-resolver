var fs = require('fs');
var os = require('os');
var path = require('path');
var targz = require('tar.gz');
var tmp = require('tmp');

function extract(src, dst) {
    return targz().extract(src, dst);
}

module.exports = function resolver(bower) {

  var repo = bower.config.fileRepo?bower.config.fileRepo:".";

    return {
        // determine whether this resolver can handle a particular "source"
        // i.e. a `bower install source` will first run this match method
        match: function(source) {

            var retval = false;
            fs.readdirSync(repo).map(function(item) {
                if (item.startsWith(source)) {
                    retval = true;
                }
            });
            return retval;
        },

        releases : function(source){

          var releasesArray = [];
          // Go through all the files
          //
          fs.readdirSync(repo).map(function(item) {
              if (item.startsWith(source)) {
                // Get the version
                //
                var match = item.match(/^.*-([\d\.]+).tar.gz/);
                if(match){
                  releasesArray.push({
                    release : match[1],
                    target : match[1],
                    version : match [1]
                  });
                }
              }
          });
          return releasesArray;
        },
        // download the bower component files
        fetch: function(endpoint, cached) {


            if (cached.version === endpoint.target) return;

            // 1. create a temporary directory
            var tempDir = tmp.dirSync().name;

            // 2. populate temporary directory with component files

            // Streams
            return extract(repo + "/" + endpoint.name + "-"+ endpoint.target+".tar.gz", tempDir).then(function() {
                return {
                    tempPath: tempDir + "/" + endpoint.name,
                    removeIgnores: true
                };
            });

        }
    };
};

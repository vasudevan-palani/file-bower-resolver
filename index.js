var fs = require('fs');
var os = require('os');
var path = require('path');
var targz = require('tar.gz');

var repo = "./repo";
var components = "./components";

module.exports = function resolver(bower) {

    return {
        // determine whether this resolver can handle a particular "source"
        // i.e. a `bower install source` will first run this match method
        match: function(source) {
            fs.readdir("./repo", (err, files) => {
                files.forEach(file => {
                  if(file.startsWith(source)){
                    return true;
                  }
                });
            });
            return false;
        },

        // download the bower component files
        fetch: function(endpoint, cached) {

            // 0. log inputs for clarity
            bower.logger.info('file-bower-resolver', 'endpoint: ' + JSON.stringify(endpoint));

            // 1. create a temporary directory
            var tempDir = os.tmpdir() + path.sep + 'file-bower-resolver-' + new Date().getTime();
            bower.logger.info('file-bower-resolver', 'created temp dir: ' + tempDir);
            fs.mkdirSync(tempDir);

            // 2. populate temporary directory with component files

            // Streams
            var read = targz().createReadStream(repo+'/'+endpoint.name+"-"+endpoint.target+".tar.gz");;
            var write = targz().createWriteStream(tempDir);

            read.pipe(write);

            // 3. return expected interface
            return {
                tempPath: tempDir,
                removeIgnores: true
            };
        }
    };
};

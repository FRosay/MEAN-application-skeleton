const Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

var walkSync = function(dir, filelist) {
    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            filelist.push(path.join(dir, file));
        }
    });
    return filelist;
};

// Instantiate a Mocha instance.
const mocha = new Mocha();

const testDir = '.';

// Add each .js file to the mocha instance
const files = walkSync(testDir);
files.filter((file) =>
    // Only keep the spec.js files
    file.substr(-7) === 'spec.js'
).forEach((file) => mocha.addFile(path.join(testDir, file)));

// Run the tests.
mocha.run(function(failures){
    process.on('exit', function () {
        process.exit(failures);  // exit with non-zero status if there were failures
    });
});
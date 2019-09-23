var browserSync = require("browser-sync");

module.exports = function (grunt) {

    // Init BrowserSync manually
    grunt.registerTask("default", function () {
        var done = this.async();
        browserSync({
          open: "ui",
	        logLevel:'debug',
	        timestamps: false,
	        server: {
            baseDir: "./dir",
            index: "index.html"
	        }
        }, function (err, bs) {
          if(err)
            console.log("Error: " + err);
        });
    });
};
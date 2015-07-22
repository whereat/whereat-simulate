module.exports = function(grunt) {
  grunt.initConfig({
      start_mockserver: {
          start: {
              options: {
                  serverPort: 1080,
                  proxyPort: 1090
              }
          }
      },
      stop_mockserver: {
          stop: {
          }
      }
  });
  grunt.loadNpmTasks('mockserver-grunt');
};

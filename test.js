'use strict';

var npmPackageDownloads = require('./');

npmPackageDownloads('').catch(function (error) {
  console.log(error.message);
  // npm-package-downloads need a module name or array of names.
});

npmPackageDownloads('express', 'last-month').then(function (res) {
  console.log(res);
  // { downloads: 13359424,
  //   package: 'express',
  //   start: '2017-06-12',
  //   end: '2017-07-11' }
});

npmPackageDownloads([
  'express',// exist
  'ahudsfgikaj',// not exist
  '@shimo/gulp-build',// exist
  '@shimo/gulp-buildhaha'// not exist
], '2016-01-01:2016-01-31').then(function (res) {
  console.log(res);
  // [ { downloads: 0,
  //     start: '2016-01-01',
  //     end: '2016-01-31',
  //     package: '@shimo/gulp-build' },
  //   { package: '@shimo/gulp-buildhaha' },
  //   { downloads: 4686332,
  //     package: 'express',
  //     start: '2016-01-01',
  //     end: '2016-01-31' },
  //   { package: 'ahudsfgikaj' } ]
});
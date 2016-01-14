'use strict';

var npmPackageDownloads = require('./');

npmPackageDownloads('express', 'last-month').then(function (res) {
  console.log(res);
  // { downloads: 3856579,
  //   start: '2015-12-15',
  //   end: '2016-01-13',
  //   package: 'express' }
});

npmPackageDownloads(['express', 'ahudsfgikaj', 'koa'], '2016-01-01:2016-01-31').then(function (res) {
  console.log(res);
  // [ { downloads: 1796939,
  //     start: '2016-01-01',
  //     end: '2016-01-31',
  //     package: 'express' },
  //   { package: 'ahudsfgikaj' },
  //   { downloads: 27241,
  //     start: '2016-01-01',
  //     end: '2016-01-31',
  //     package: 'koa' } ]
});
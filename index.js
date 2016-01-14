'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var request = require('superagent-bluebird-promise');

var ENDPOINT = 'https://api.npmjs.org/downloads/point/';

module.exports = function npmPackageDownloads(pkgs, period) {
  if (!Array.isArray(pkgs)) {
    return getPkgsDownload(pkgs, period);
  }

  return Promise
    .map(_.chunk(pkgs, 100), function (chunk) {
      return getPkgsDownload(chunk, period);
    })
    .then(function (pkgsArr) {
      var pkgsObj = _.assign.apply(_, pkgsArr);
      return pkgs.map(function (pkg) {
        return pkgsObj[pkg] || { package: pkg };
      });
    });
};

function getPkgsDownload(pkgs, period) {
  return request
    .get(ENDPOINT + period + '/' + (Array.isArray(pkgs) ? ['_'].concat(pkgs).join(',') : pkgs))
    .then(function (res) {
      return res.body;
    });
}
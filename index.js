'use strict';

var _ = require('lodash');
var Promise = require('bluebird');
var request = require('superagent-bluebird-promise');

var ENDPOINT = 'https://api.npmjs.org/downloads/point/';

module.exports = function npmPackageDownloads(pkgs, period) {
  var isSingle = false;
  if (!Array.isArray(pkgs)) {
    if (typeof pkgs !== 'string' || !pkgs) {
      return Promise.reject(new TypeError('npm-package-downloads need a module name or array of names.'));
    }
    isSingle = true;
    pkgs = [pkgs];
  }
  var scopePkgs = [];
  var normalPkgs = [];

  pkgs.forEach(function (pkg) {
    if (pkg.match(/^@/)) {
      scopePkgs.push(pkg);
    } else {
      normalPkgs.push(pkg);
    }
  })

  return Promise.all([
    getPkgsDownload(scopePkgs, period, getScopePkgsDownload),
    getPkgsDownload(normalPkgs, period, getNormalPkgsDownload)
  ]).then(function (res) {
    var result = res[0].concat(res[1]);
    return isSingle ? result[0] : result;
  });
};

function getPkgsDownload(pkgs, period, fn) {
  return Promise
    .map(_.chunk(pkgs, 100), function (chunk) {
      return fn(chunk, period);
    })
    .then(function (pkgsArr) {
      var pkgsObj = _.assign.apply(_, pkgsArr);
      return pkgs.map(function (pkg) {
        return pkgsObj[pkg] || { package: pkg };
      });
    });
}

function getScopePkgsDownload(pkgs, period) {
  if (!pkgs.length) {
    return Promise.resolve([]);
  }
  return Promise.props(Promise.reduce(pkgs, function (obj, pkg) {
    obj[pkg] = request
      .get(ENDPOINT + period + '/' + pkg)
      .then(function (res) {
        return res.body;
      })
      .catch(function (err) {
        console.error(err.message);
      });
    return obj;
  }, {}));
}

function getNormalPkgsDownload(pkgs, period) {
  if (!pkgs.length) {
    return Promise.resolve([]);
  }
  return request
    .get(ENDPOINT + period + '/' + ['_'].concat(pkgs).join(','))
    .then(function (res) {
      return res.body;
    });
}
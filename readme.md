## npm-package-downloads

Get packages download counts.

### Install

    npm i npm-package-downloads --save

### Usage

```
npmPackageDownloads(pkgName, period)
```

- pkgName: string or array of string. eg: express, ['express', 'koa']
- period:
  - semantic: last-day, last-week, last-month
  - specific date: 2016-01-01
  - specific range: 2016-01-01:2016-01-31

### Example

```
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
```

### License

MIT

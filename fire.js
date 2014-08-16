'use strict';

var fs = require('fs'),
  path = require('path');

var rdir = {
  src: 'module',
  dest: 'dist/replace'
};

var adir = {
  src: path.resolve(__dirname, rdir.src),
  dest: path.resolve(__dirname, rdir.dest)
};

fs.readdirSync(adir.src).forEach(function(filename) {
  if (filename.indexOf('.html') === -1) return;

  var s = path.resolve(adir.src, filename);
  var d = path.resolve(adir.dest, filename);

  var srcContent = fs.readFileSync(s, 'utf8');
  var destContent = fs.readFileSync(d, 'utf8');

  var titleReg = /<title[^<]*>([\s\S]*)<\/title>/g,
    metaReg = /<meta http-equiv="mobile-agent" content="format=xhtml; url=http:\/\/www.taotaosou.com\/tts-mold\/event_(\d)*.html" \/>/g;

  var title = srcContent.match(titleReg) &&
    srcContent.match(titleReg)[0];
  var meta = srcContent.match(metaReg) &&
    srcContent.match(metaReg)[0];

  var result = destContent.replace(titleReg, title).replace(metaReg, meta);

  fs.writeFileSync(d, result, 'utf8');
});

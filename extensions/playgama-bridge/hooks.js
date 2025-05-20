'use strict';

const fs = require('fs');
const path = require('path');

exports.onAfterBuild = async function (options, result) {
  const outputDir = result.dest;
  const extensionDir = __dirname;
  const filesToCopy = ['playgama-bridge.js', 'playgama-bridge-config.json'];

  for (const fileName of filesToCopy) {
    const srcPath = path.join(extensionDir, fileName);
    const destPath = path.join(outputDir, fileName);

    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`[playgama-bridge-installer] Copied ${fileName} to ${destPath}`);
    } else {
      console.warn(`[playgama-bridge-installer] File not found: ${srcPath}`);
    }
  }
};
/// main.js (Cocos Creator 3.8.2 build extension)
const fs = require('fs');
const path = require('path');

// You can name the package for logging
const PACKAGE_NAME = 'playgama-bridge-plugin';

exports.load = function() {
    console.log(`[${PACKAGE_NAME}] Extension loaded`);
};

exports.unload = function() {
    console.log(`[${PACKAGE_NAME}] Extension unloaded`);
};

exports.onAfterBuild = async function(options, result) {
    try {
        // Only handle web-mobile platform builds
        if (options.platform !== 'web-mobile') {
            return;
        }
        const outputDir = result.dest;  // Final build output directory:contentReference[oaicite:3]{index=3}

        // Files to copy from this extension folder
        const filesToCopy = ['playgama-bridge.js', 'playgama-bridge-config.json'];
        for (const fileName of filesToCopy) {
            const srcPath = path.join(__dirname, fileName);
            const destPath = path.join(outputDir, fileName);
            if (fs.existsSync(srcPath)) {
                fs.copyFileSync(srcPath, destPath);
                console.log(`[${PACKAGE_NAME}] Copied ${fileName} to ${destPath}`);
            } else {
                console.warn(`[${PACKAGE_NAME}] File not found: ${srcPath}`);
            }
        }
    } catch (err) {
        console.error(`[${PACKAGE_NAME}] Error during onAfterBuild:`, err);
        // If you want to fail the build on error, re-throw the error (optional):
        // throw err;
    }
};

const fs = require('fs');
const path = require('path');

const PACKAGE_NAME = 'playgama-bridge';

module.exports = {
  load() {
    console.log(`[${PACKAGE_NAME}] Extension loaded`);

    const projectRoot = Editor.Project.path;
    const markerFile = path.join(projectRoot, '.playgama-bridge-installed');

    if (!fs.existsSync(markerFile)) {
      module.exports.methods.onInstall(); // ✅ Auto install on first load
      fs.writeFileSync(markerFile, 'installed');
      console.log(`[${PACKAGE_NAME}] Auto-installed on first load`);
    }
  },

  unload() {
    console.log(`[${PACKAGE_NAME}] Extension unloaded`);
  },

  async onAfterBuild(options, result) {
    try {
      if (options.platform !== 'web-mobile') return;

      const outputDir = result.dest;
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
    }
  },

  methods: {
    onInstall() {
      console.log(`[${PACKAGE_NAME}] Installing templates...`);
      const extDir = __dirname;
      const projectRoot = Editor.Project.path;
      const templatesDir = path.join(extDir, 'templates');
      const demoSrc = path.join(templatesDir, 'demo');
      const demoDest = path.join(projectRoot, 'assets', 'demo');

      function copyDir(src, dest) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

        fs.readdirSync(src).forEach(item => {
          const srcPath = path.join(src, item);
          const destPath = path.join(dest, item);
          const stat = fs.statSync(srcPath);
          if (stat.isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        });
      }

      try {
        // Copy demo to assets/demo
        if (fs.existsSync(demoSrc)) {
          copyDir(demoSrc, demoDest);
          console.log(`[${PACKAGE_NAME}] Copied demo to assets/demo`);
        } else {
          console.warn(`[${PACKAGE_NAME}] demo folder not found in templates`);
        }

        // Copy all other templates (except demo) to project root
        fs.readdirSync(templatesDir).forEach(item => {
          if (item === 'demo') return;
          const srcPath = path.join(templatesDir, item);
          const destPath = path.join(projectRoot, item);
          const stat = fs.statSync(srcPath);
          if (stat.isDirectory()) {
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        });

        // ✅ Copy playgama-bridge.js into the copied preview-template
        const bridgeFileSrc = path.join(extDir, 'playgama-bridge.js');
        const previewTemplateDest = path.join(projectRoot, 'preview-template', 'playgama-bridge.js');

        if (fs.existsSync(bridgeFileSrc)) {
          fs.copyFileSync(bridgeFileSrc, previewTemplateDest);
          console.log(`[${PACKAGE_NAME}] Copied playgama-bridge.js into preview-template`);
        } else {
          console.warn(`[${PACKAGE_NAME}] playgama-bridge.js not found at root`);
        }

        console.log(`[${PACKAGE_NAME}] Templates installed successfully`);
      } catch (err) {
        console.error(`[${PACKAGE_NAME}] Error installing templates:`, err);
      }
    },

 updateBridgeConfig() {
  console.log(`[${PACKAGE_NAME}] Updating bridge config...`);
  const extDir = __dirname;
  const projectRoot = Editor.Project.path;
  const srcPath = path.join(extDir, 'playgama-bridge-config.json');
  const destPath = path.join(projectRoot, 'preview-template', 'playgama-bridge-config.json');

  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`[${PACKAGE_NAME}] Updated config copied to preview-template`);

      Editor.Dialog.info('playgama-bridge-config.json updated successfully!', {
        title: 'Playgama Bridge',
        buttons: ['OK']
      });
    } else {
      console.warn(`[${PACKAGE_NAME}] Config file not found: ${srcPath}`);

      Editor.Dialog.error('Config file not found!', {
        title: 'Playgama Bridge',
        buttons: ['OK']
      });
    }
  } catch (err) {
    console.error(`[${PACKAGE_NAME}] Error updating bridge config:`, err);

    Editor.Dialog.error('Failed to update config.', {
      title: 'Playgama Bridge',
      buttons: ['OK']
    });
  }
}
},

  messages: {
    'update-bridge-config'() {
      module.exports.methods.updateBridgeConfig();
    }
  }
};
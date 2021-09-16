const fs = require('fs/promises');
const path = require('path');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': (context) =>
      getScopes(context).then((packages) => [2, 'always', packages]),
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};

/**
 *
 * @param context
 * @returns {Promise<string[]>}
 */
async function getScopes(context) {
  const otherScopes = ['deps', 'deps-dev'];
  const cwd = context !== undefined && typeof context.cwd === 'string' ? context.cwd : process.cwd();

  const packagesFolder = path.join(cwd, 'packages');

  const isPackagesFolderExists = await folderExists(packagesFolder);

  if (!isPackagesFolderExists) {
    return [];
  }

  const items = await fs.readdir(packagesFolder, { withFileTypes: true });
  const packageScopes = getFoldersOnly(items);

  return [...otherScopes, ...packageScopes];
}

/**
 * @param folderContent {Dirent[]}
 * @returns {string[]}
 */
function getFoldersOnly(folderContent) {
  const result = [];

  for (const item of folderContent) {
    if (item.isDirectory()) {
      result.push(item.name);
    }
  }

  return result;
}

function folderExists(path){
  return fs.access(path).then(() => true).catch(() => {
    return false;
  })
}

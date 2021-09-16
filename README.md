# Commitlint config

**Gears** projects config for [commitlint](https://commitlint.js.org/#/).

## Usage

Install:

```shell
npm install --save-dev husky \
@commitlint/{cli,config-conventional,prompt-cli} \
commitlint-config-cog 
```

Add `prepare` and `commit` scripts in `package.json`:

```shell
npm set-script prepare "husky install"
npm set-script commit "commit"
```

Run `prepare` script:

```shell
npm run prepare
```

Add husky hooks:

```shell
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
git add .husky/commit-msg
```

Add file `commitlint.config.cjs` with content (and extend it if you need):

```javascript
module.exports = { extends: ['commitlint-config-cog'] };
```

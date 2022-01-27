/* eslint-disable no-template-curly-in-string */
module.exports = {
  git: {
    tagName: "v${version}",
    commitMessage: "chore: version ${version}",
    pushRepo: "git@github.com:ContaAzul/ca-components.git",
    requireCleanWorkingDir: false, // for now
    requireUpstream: false,
  },
  github: {
    release: true,
    releaseName: "v${version}",
    tokenRef: "GITHUB_TOKEN",
  },
  npm: {
    publish: false,
  },
  plugins: {
    "@ca-tools-front/release-it-plugin-build": {},
    "@ca-tools-front/release-it-plugin-sonar": {},
  },
};

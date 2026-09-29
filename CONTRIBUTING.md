# Contributing to Restyle

Any contributions to Restyle are greatly appreciated and encouraged!

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct document](https://github.com/Shopify/restyle/blob/master/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behaviour to opensource@shopify.com.

## How to contribute

### Creating issues

Before submitting issues, please have a quick look if there is an existing open issue here: [Issues](https://github.com/Shopify/restyle/issues). If no related issue can be found,
please open a new issue with labels: `bug`, `documentation`, `enhancement` or `question`.

### Opening pull requests

Pull requests are more than welcome! Just make sure that to include a description of the problem and how you are attempting to fix the issue.

## Running locally

To run the library locally, run the following commands in the root folder:

```bash
$ yarn install
$ yarn test
# OR
$ npm install
$ npm test
```

To build the library for testing in other projects or environments, run:

```bash
$ yarn build
```

## Releasing

Publishing uses [npm trusted publishing](https://docs.npmjs.com/trusted-publishers/),
not an npm token. Before enabling this workflow, a package owner must configure the
trusted publisher for `@shopify/restyle` with organization `Shopify`, repository
`restyle`, and workflow filename `release.yml` (no environment name).

Create a release tag containing the updated workflow and publish its GitHub release,
or manually dispatch `release.yml` against that tag. Branch dispatches do not
publish. The build job installs dependencies and uploads a package tarball without
OIDC permission. A separate job publishes that tarball without installing
dependencies or running package lifecycle scripts. Its pinned Node version includes
an npm CLI that supports trusted publishing.

After verifying the first OIDC release, revoke the old publishing token in npm and
remove the `NPM_TOKEN` secret from GitHub Actions. Workflow changes alone do not
revoke an existing credential. Do not restore token authentication if OIDC fails;
check the trusted publisher's case-sensitive repository and workflow settings.

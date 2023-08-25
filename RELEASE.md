# Release

1. Before releasing releasing a new version of the package, make sure you are pointing to the latest commit from `master`.
2. Run `yarn version` and follow the prompts to choose a version for the package.
3. Update the Changelog to place all Next items under the new version.
4. Push the changes and new tags to GitHub with `git push origin master --follow-tags`.
5. Publish the release on the internal package registry by triggering a deploy on [Shipit](https://shipit.shopify.io/shopify/restyle).

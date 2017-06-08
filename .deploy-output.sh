#!/bin/bash
set -ev
STATUS=`git log -1 --pretty=oneline`

# Partially based on https://gist.github.com/domenic/ec8b0fc8ab45f39403dd

SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"

# Pull requests and commits to other branches shouldn't try to deploy, just build to verify
if [ "$TRAVIS_PULL_REQUEST" != "false" -o "$TRAVIS_BRANCH" != "$SOURCE_BRANCH" ]; then
    echo "Skipping deploy; just doing a build."
    exit 0
fi

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`

echo $SSH_REPO

# Clone the existing gh-pages for this repo into publish/
# Create a new empty branch if gh-pages doesn't exist yet (should only happen on first deploy)
git clone $REPO publish
cd publish
git checkout $TARGET_BRANCH || git checkout --orphan $TARGET_BRANCH
cd ..

# Clean out existing contents
rm -rf publish/**/* || exit 0

cp single-page.html ./publish/
mkdir ./publish/fonts
mkdir ./publish/images
mkdir ./publish/styles
cp fonts/* ./publish/fonts
cp images/* ./publish/images
cp styles/* ./publish/styles
cp entities.dtd ./publish/
cp entities.json ./publish/

ls publish/

cp out/* ./publish/

ls publish/

# Now let's go have some fun with the cloned repo
cd public
git init
git config user.name "Travis CI"
git config user.email "$COMMIT_AUTHOR_EMAIL"

# If there are no changes to the compiled publish (e.g. this is a README update) then just bail.
if [ -z `git diff --quiet` ]; then
    echo "No changes to the output on this push; exiting."
    exit 0
fi

# Commit the "changes", i.e. the new version.
# The delta will show diffs between new and old versions.
git add -A .
git commit -m "Built by Travis-CI: $STATUS"
git status


# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc
ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in ../deploy_key.enc -out ../deploy_key -d
chmod 600 ../deploy_key
eval `ssh-agent -s`
ssh-add ../deploy_key

# Now that we're all set up, we can push.
git push $SSH_REPO $TARGET_BRANCH

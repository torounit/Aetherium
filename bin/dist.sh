#!/usr/bin/env bash

set -e

if [[ "false" != "$TRAVIS_PULL_REQUEST" ]]; then
	echo "Not deploying pull requests."
	exit
fi

if [[ "master" != "$TRAVIS_BRANCH" ]]; then
	echo "Not on the 'master' branch."
	exit
fi

git clone -b distribution --quiet "https://github.com/${TRAVIS_REPO_SLUG}.git" distribution

npm run build
mkdir -p distribution
cp -R ./dist/ distribution/dist
find . -name '*.js' -maxdepth 1 -exec cp {} distribution \;
find . -name '*.php' -maxdepth 1 -exec cp {} distribution \;
find . -name '*.css' -maxdepth 1 -exec cp {} distribution \;
cd distribution

git add -A
git commit -m "Update from travis $TRAVIS_COMMIT"
git push --quiet "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" distribution 2> /dev/null

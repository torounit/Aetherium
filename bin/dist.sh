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

rm -rf distribution/*.*
rm -rf distribution/dist
rm -rf distribution/inc

npm run production

cp -R ./dist distribution
cp -R ./inc distribution
find . -maxdepth 1 -name '*.js'  -exec cp {} distribution \;
find . -maxdepth 1 -name '*.php' -exec cp {} distribution \;
find . -maxdepth 1 -name '*.css' -exec cp {} distribution \;
find . -maxdepth 1 -name '*.png' -exec cp {} distribution \;
find   -maxdepth 1 -name '*.svg' -exec cp {} distribution \;
cd distribution

git add -A
git commit -m "Update from travis $TRAVIS_COMMIT"
git push --quiet "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" distribution 2> /dev/null

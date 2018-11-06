#!/usr/bin/env bash

set -ex

if [[ "false" != "$TRAVIS_PULL_REQUEST" ]]; then
	echo "Not deploying pull requests."
	exit
fi

if [[ "master" != "$TRAVIS_BRANCH" ]]; then
	echo "Not on the 'master' branch."
	exit
fi

git clone -b distribution "https://github.com/${TRAVIS_REPO_SLUG}.git" distribution

rm -rf distribution/*.*
rm -rf distribution/dist
rm -rf distribution/inc

npm run build
npm run dist
cd distribution


GIT_STATUS="$(git status 2> /dev/null)"


if [[ ${GIT_STATUS} =~ "Untracked files:" ]];then
	git add -A
	git commit -m "Update from travis $TRAVIS_COMMIT"
	git push "https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" distribution 2> /dev/null
else
	echo "No Changes."
fi

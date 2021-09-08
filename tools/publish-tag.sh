#!/usr/bin/env bash
#
# Publish a package based on the value of a git tag. A tag must contain
# the package name followed by the semver version. The format is:
#
#  [refs/tags/]<package name>-v<major>.<minor>.<patch>[-<pre-release>.<increment>]
#
# Examples of valid tags:
#  - cli-v1.0.0-alpha.1 or refs/tags/cli-v1.0.0-alpha.1
#  - cli-v1.0.0 or refs/tags/cli-v1.0.0
#

REGEX='^(refs\/tags\/)?(.+)-v([0-9]+\.[0-9]+\.[0-9]+(-(.+)\.[0-9]+)?)$';

if [ "$#" -ne 1 ]; then
  echo "Usage: publish-tag.sh <git tag>"
  exit 1
fi

TAG=$1
PACKAGE=`echo $TAG | sed -rn 's/'$REGEX'/\2/p'`
VERSION=`echo $TAG | sed -rn 's/'$REGEX'/\3/p'`
PRE_RELEASE=`echo $TAG | sed -rn 's/'$REGEX'/\5/p'`

if [ -z $PACKAGE ]; then
  echo "ERROR: Invalid git tag format!"
  exit 1
fi

DIST="dist/packages/$PACKAGE"
VERSION_COUNT=`grep -c "^  \"version\": \"$VERSION\",$" "$DIST/package.json"`

if [ "$VERSION_COUNT" -ne 1 ]; then
  echo "ERROR: Tag version doesn't match version in package.json!"
  exit 1
fi

echo
echo "Buildind $PACKAGE..."
yarn build $PACKAGE || exit 1

echo
echo "Publishing $PACKAGE..."
cp npmrc "$DIST/.npmrc"
cd $DIST
npm publish --tag ${PRE_RELEASE:=latest} --access public

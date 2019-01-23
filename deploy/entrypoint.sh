#!/bin/sh -l

# abort on errors
set -e

# npm i
npm i vuepress@next -g
npm i
npm install babel-preset-es2015

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:artemvasilkin/wm-go.git master:gh-pages

cd -
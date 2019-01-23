# FROM debian:9.5-slim
FROM node:latest

LABEL "com.github.actions.name"="deploy"
LABEL "com.github.actions.description"="Deploy github pages"
LABEL "com.github.actions.icon"="github"
LABEL "com.github.actions.color"="yellow"

LABEL "repository"="http://github.com/artemvasilkin/wm-go"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="Artem Vasilkin <artemvasilkin@gmail.com>"

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

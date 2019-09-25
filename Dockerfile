FROM node:10.7-alpine
LABEL maintainer="Abhijit Rao <abhijit945@gmail.com>"

ENV LANG C.UTF-8
ENV APP_HOME /app
RUN { \
    echo '#!/bin/sh'; \
    echo 'set -e'; \
    echo; \
    echo 'dirname "$(dirname "$(readlink -f "$(which javac || which java)")")"'; \
    } > /usr/local/bin/docker-java-home \
    && chmod +x /usr/local/bin/docker-java-home
ENV JAVA_HOME /usr/lib/jvm/java-1.8-openjdk/jre
ENV PATH $PATH:/usr/lib/jvm/java-1.8-openjdk/jre/bin:/usr/lib/jvm/java-1.8-openjdk/bin
ENV JAVA_VERSION 8u171
ENV JAVA_ALPINE_VERSION 8.212.04-r1

RUN echo '#!/bin/sh'; \
    set -x \
    && apk add --no-cache \
    openjdk8-jre="$JAVA_ALPINE_VERSION" \
    && [ "$JAVA_HOME" = "$(docker-java-home)" ]

RUN mkdir $APP_HOME
WORKDIR $APP_HOME
ADD . $APP_HOME
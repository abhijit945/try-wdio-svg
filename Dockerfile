FROM node:11
LABEL maintainer="Abhijit Rao <abhijit945@gmail.com>"

# Set working directory
WORKDIR /app
COPY . /app

# Install Java 8
RUN apt-get update \
    && apt-get install -y libaio1 \
    && apt-get install -y build-essential \
    && apt-get install -y unzip \
    && apt-get install -y curl \
    && apt-get install -y openjdk-8-jdk \
    && apt-get install -y vim
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME
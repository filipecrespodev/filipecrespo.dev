FROM ruby:2.7

ENV LC_ALL C.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8

WORKDIR /app

ADD Gemfile /app
ADD Gemfile.lock /app

RUN bundle install

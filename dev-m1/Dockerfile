FROM ruby:2.7.0

# RUN apt-get update -qq && apt-get install -y build-essential
RUN curl -sL https://deb.nodesource.com/setup_16.x -o nodesource_setup.sh  && \
    bash nodesource_setup.sh && \
    apt install nodejs
# RUN apt-get install direnv
RUN npm install yarn -g
RUN npm install -g concurrently
RUN npm install netlify-cli -g

ENV APP_HOME ./app


RUN mkdir $APP_HOME
WORKDIR $APP_HOME
RUN rm -fr ./app/node_modules
RUN rm -fr ./app/.tmp
# Copy Ruby and Node dependencies
COPY ./innovazione.gov.it/Gemfile ./innovazione.gov.it/Gemfile.lock ./innovazione.gov.it/package.json ./innovazione.gov.it/yarn.lock ./

RUN gem install bundler:2.1.4
RUN bundle
RUN yarn install

EXPOSE 4567

# CMD ["bundle", "exec", "middleman"]

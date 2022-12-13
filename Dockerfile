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

# Copy Ruby and Node dependencies
COPY Gemfile Gemfile.lock package.json yarn.lock ./

RUN gem install bundler:2.1.4
RUN bundle
RUN yarn install

EXPOSE 4567

# CMD ["bundle", "exec", "middleman"]

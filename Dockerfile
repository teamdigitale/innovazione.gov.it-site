FROM circleci/ruby:2.7.0-node-browsers

ENV PORT 4567
ENV BUILD_ENV production
ENV DATO_API_TOKEN xx
ENV BASE_URL http://localhost:4567/
ENV TZ Europe/Rome

WORKDIR /usr/src/innovazione.gov.it

USER root

USER ${RUNAS}

# Copy useful files inside the workdir
COPY source source
COPY lib lib
COPY locales locales
COPY data data
COPY config.rb .
COPY Gemfile .
COPY Gemfile.lock .
COPY LICENSE .
COPY yarn.lock .
COPY package.json .

RUN bundle
RUN yarn install

EXPOSE $PORT 8080 35729

CMD ["bundle", "exec", "middleman"]

FROM node:18-bullseye-slim AS node

FROM ruby:2.7.8-bullseye

# Node, npm and yarn come from the official Node image: Debian bullseye is EOL
# and installing Node through apt/NodeSource no longer works on it.
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /opt /opt
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm && \
    ln -s /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx && \
    ln -s /opt/yarn-v*/bin/yarn /usr/local/bin/yarn && \
    node --version && yarn --version

ENV TZ=Europe/Rome

WORKDIR /app

# Same bundler version as Gemfile.lock (BUNDLED WITH)
RUN gem install bundler:2.1.4

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY local-dev/entrypoint.sh /usr/local/bin/local-dev-entrypoint
RUN chmod +x /usr/local/bin/local-dev-entrypoint

EXPOSE 4567

ENTRYPOINT ["local-dev-entrypoint"]
CMD ["bundle", "exec", "middleman", "server"]

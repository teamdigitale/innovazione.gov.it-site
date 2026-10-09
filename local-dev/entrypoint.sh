#!/bin/sh
set -e

# Gems and node_modules live in named volumes, so they can be older than the
# Gemfile.lock / yarn.lock of the mounted working copy: sync them before starting.
bundle check > /dev/null 2>&1 || bundle install
yarn install --frozen-lockfile

exec "$@"

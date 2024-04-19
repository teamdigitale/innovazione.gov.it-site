#!/usr/bin/env bash

# XXX: This is an hack to install and build the site on Vercel.
# XXX: Remove ASAP.
# The website depends on Ruby 2.7, but Vercel dropped support for it.

set -euo pipefail

echo "Removing /ruby32..."

# Remove the Vercel installed Ruby
rm -fr /ruby32 /usr/bin/ruby /usr/bin/gem

# Remove the Ruby version from the Gemfile, otherwise Vercel will detect
# an unsupported version and stop the build
sed -i '/^ruby/d' Gemfile

tar zxf ruby2.7.tar.gz -C /

rm -r /opt/openssl-1.1.1q/certs/
ln -s /etc/ssl/certs /opt/openssl-1.1.1q/certs

export PATH=$PATH:/usr/local/rvm/rubies/ruby-2.7.8/bin

gem install bundler -v 2.3.26

bundle install --deployment
bundle exec middleman build

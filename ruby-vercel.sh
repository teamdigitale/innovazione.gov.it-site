#!/usr/bin/env bash

# XXX: This is an hack to install and build the site on Vercel.
# XXX: Remove ASAP.
# The website depends on Ruby 2.7, but Vercel dropped support for it.

set -euo pipefail

# Remove the Vercel installed Ruby
rm -fr /ruby32

# Remove the Ruby version from the Gemfile, otherwise Vercel will detect
# an unsupported version and stop the build
sed -i '/^ruby/d' Gemfile

# Install Ruby 2.7.8 with RVM (http://rvm.io)
yum install -y gcc-c++ patch readline readline-devel zlib zlib-devel \
    libyaml-devel libffi-devel openssl-devel make \
    bzip2 autoconf automake libtool bison sqlite-devel gnupg2 \

gpg2 --keyserver keyserver.ubuntu.com --recv-keys 409B6B1796C275462A1703113804BB82D39DC0E3 7D2BAF1CF37B13E2069D6956105BD0E739499BDB

unset GEM_HOME
curl -sSL -o rvm.sh https://raw.githubusercontent.com/rvm/rvm/b37e9c6051653546128ca0c2dde4d4ef5333ced9/binscripts/rvm-installer && chmod +x rvm.sh
echo "3c99c5699b7df170ca2fcf7aedfdd9f0  rvm.sh" | md5sum -c

# We need to run setup and build in a single script, otherwise env variables won't be set
# properly.
#
# rvm is design for interactive use, but we can't open new shells at will like its
# docs are suggesting.
#
# Let's append our local build step to the rvm installation script.
cat >> rvm.sh << EOF
source /etc/profile.d/rvm.sh

rvm reload
rvm install 2.7.8
rvm --default use 2.7.8

gem install bundler -v 2.3.26

cd /vercel/path0

bundle install --deployment
bundle exec middleman build
EOF

./rvm.sh stable

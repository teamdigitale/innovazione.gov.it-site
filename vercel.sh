#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "develop"  ]] ; then
  # Proceed with the build
  exit 1;

else
  # Don't build
  exit 0;
fi
#!/bin/bash

# Build just the main branch on the pre-prod preview
# (only published content, without drafts)
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] ; then
  # Proceed with the build
  exit 1;
fi

# Don't build
exit 0;

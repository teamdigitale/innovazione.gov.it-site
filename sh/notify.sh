curl -n -X POST "https://webhooks.datocms.com/$1/deploy-results" \
  -H 'Content-Type: application/json' \
  -d '{ "status": "'"$2"'" }'

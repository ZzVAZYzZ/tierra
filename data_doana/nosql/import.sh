#!/bin/bash

mongoimport \
  --authenticationDatabase admin \
  -u root -p root \
  --db doana \
  --collection orders \
  --file /seed/doana.orders.json \
  --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection payments --file /seed/doana.payments.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection refreshes --file /seed/doana.refreshes.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection reviews --file /seed/doana.reviews.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection supportconversations --file /seed/doana.supportconversations.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection supportmessages --file /seed/doana.supportmessages.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection user_blocks --file /seed/doana.user_blocks.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection user_favorites --file /seed/doana.user_favorites.json --jsonArray

#!/bin/bash
set -e

echo "🚀 Seeding MongoDB..."

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection orders \
  --file /docker-entrypoint-initdb.d/doana.orders.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection payments \
  --file /docker-entrypoint-initdb.d/doana.payments.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection refreshes \
  --file /docker-entrypoint-initdb.d/doana.refreshes.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection reviews \
  --file /docker-entrypoint-initdb.d/doana.reviews.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection supportconversations \
  --file /docker-entrypoint-initdb.d/doana.supportconversations.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection supportmessages \
  --file /docker-entrypoint-initdb.d/doana.supportmessages.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection user_blocks \
  --file /docker-entrypoint-initdb.d/doana.user_blocks.json --jsonArray

mongoimport -u root -p root --authenticationDatabase admin \
  --db doana --collection user_favorites \
  --file /docker-entrypoint-initdb.d/doana.user_favorites.json --jsonArray

echo "✅ MongoDB seed done!"

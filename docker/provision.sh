#!/usr/bin/env bash

docker-compose exec wordpress wp db reset --yes --allow-root
docker-compose exec wordpress wp core install \
    --url="http://0.0.0.0:8089" \
    --title="WP Theme Test Environment" \
    --admin_user="admin" \
    --admin_password="admin" \
    --admin_email="admin@example.com" \
	--path="/var/www/html" \
	--allow-root

docker-compose exec wordpress wp plugin install wordpress-importer --activate --allow-root
docker-compose exec wordpress wp theme activate aetherium --allow-root
# import unit test data.
docker-compose exec wordpress curl -O https://raw.githubusercontent.com/WPTRT/theme-unit-test/master/themeunittestdata.wordpress.xml > /tmp/themeunittestdata.wordpress.xml
docker-compose exec wordpress wp import themeunittestdata.wordpress.xml --authors=create --quiet --allow-root

#docker-compose exec wordpress curl https://raw.githubusercontent.com/jawordpressorg/theme-test-data-ja/master/wordpress-theme-test-date-ja.xml > /tmp/wordpress-theme-test-date-ja.xml
#docker-compose exec wordpress wp import /tmp/wordpress-theme-test-date-ja.xml --authors=create

# setup options.
docker-compose exec wordpress wp rewrite structure "/%postname%/" --allow-root
docker-compose exec wordpress wp option update posts_per_page 5 --allow-root
docker-compose exec wordpress wp option update page_comments 1 --allow-root
docker-compose exec wordpress wp option update comments_per_page 5 --allow-root
docker-compose exec wordpress wp option update show_on_front page --allow-root
docker-compose exec wordpress wp option update page_on_front 701  --allow-root
docker-compose exec wordpress wp option update page_for_posts 703 --allow-root

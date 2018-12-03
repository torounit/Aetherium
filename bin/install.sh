#!/bin/sh

sleep 10
if [ -n "$DEVSERVER_PORT" ]; then
    SETUP_PORT=$DEVSERVER_PORT
else
    SETUP_PORT=$WORDPRESS_PORT
fi

if [ $SETUP_PORT = 80 ]; then
  wp core install --url="http://localhost" --title="WP Theme Test Environment" --admin_user="admin" --admin_password="admin" --admin_email="admin@example.com" --path="/var/www/html"
else
  wp core install --url="http://localhost:$SETUP_PORT" --title="WP Theme Test Environment" --admin_user="admin" --admin_password="admin" --admin_email="admin@example.com" --path="/var/www/html"
fi

wp language core install ja
wp plugin install wordpress-importer --activate
wp theme activate $WORDPRESS_THEME

curl https://raw.githubusercontent.com/WPTRT/theme-unit-test/master/themeunittestdata.wordpress.xml > /tmp/themeunittestdata.wordpress.xml
wp import /tmp/themeunittestdata.wordpress.xml --authors=create  --quiet

#curl https://raw.githubusercontent.com/jawordpressorg/theme-test-data-ja/master/wordpress-theme-test-date-ja.xml > /tmp/wordpress-theme-test-date-ja.xml
#wp import /tmp/wordpress-theme-test-date-ja.xml --authors=create  --quiet

wp rewrite structure "/%postname%/"
wp option update posts_per_page 5
wp option update page_comments 1
wp option update comments_per_page 5
wp option update show_on_front page
wp option update page_on_front 701
wp option update page_for_posts 703

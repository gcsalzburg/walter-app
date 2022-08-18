# Heroku Minimal PHP Server

Basic skeleton of a PHP server running on Heroku.
This is the easiest way to serve a frontend (HTML/JS) site that has no build steps (no frameworks bullshit, just vanilla js etc).

## Setup

1. Download this repo and stick it wherever you want it. The repo provides the only 5 files you need to get it working:

	+ `.gitignore` to exclude the `vendor` folder which composer generates
	+ `composer.json` which defines the PHP version, in this case 7.4 or higher
	+ `Procfile` to tell Heroku to serve the website from the `web` folder
	+ `web/index.php` to directly serve `index.html`
	+ `web/index.html` your site goes here!

2. Run composer to generate the `composer.lock` file

```bash
> composer update
```

2. Setup new git repo (probably on Github), push the files and add remote branch

```bash
> git init
> git remote add origin https://github.com/gcsalzburg/XXXXXX.git
> git add *
> git commit -m "Add skeleton"
> git branch -M main
> git push -u origin main
```

3. Create new Heroku project, push code to it and start instance of app

```bash
> heroku create server_name
> git push heroku main
> heroku ps:scale web=1
```

## Useful commands

### Setup `papertrail` logging

```bash
> heroku addons:create papertrail
> heroku addons # show currently enabled addons
> heroku addons:open papertrail # open this addon in browser
```

### Use config vars

In a PHP file, access the variable:

```php
echo getenv('DB_NAME');
```

To set variable from command line:

```bash
> heroku config:set DB_NAME=my_db_name
> heroku config # display all config vars that are set
```

You can also see a list of the config vars in the dashboard on heroku.com

### Add basic .htaccess authentication

In the `web/.htaccess` file:

```
AuthType Basic
AuthName "Dashboard Login"
AuthUserFile /app/secure/.htpasswd
Require valid-user
```

The .htpasswd file should go in a folder located at `secure/.htpasswd`.

### Force https:// access

In the `web/.htaccess` file:

```
RewriteEngine On

RewriteCond %{HTTP:X-Forwarded-Proto} !https
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301,NE]
```

### Scale number of dynos from 0 -> 1

```bash
> heroku ps:scale web=0
> heroku ps:scale web=1 # etc...
```


## Checks

You need to be logged in to `Heroku` in the command line, and have `PHP`, `Composer` and `Git` installed.

```bash
> heroku login
> php -v
> composer -v
> git --version
```

Help with these steps can be found here: https://devcenter.heroku.com/articles/getting-started-with-php#set-up

General advice here: https://devcenter.heroku.com/articles/getting-started-with-php

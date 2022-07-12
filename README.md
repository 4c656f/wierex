# wierex.com

This application allows you to monitor your rendering process in c4d


Project structure:
* client_plugin
* telegram_bot
  * mysql_db
* node_server
  * mysql_db
* php_server
  * mysql_db
* react_app


## client_plugin

* get request to php_server using a user_token
* post request on php_server with a render_information

## telegram_bot

* register a user by generating a user_token and passing it to the db
* sends render_information to the user from db

## node_server

* listens for requests from the react_app
  * generates/sends an existing auth token
  * sends render_information to react_app
  * sends c4d_plugin_file to react_app
    
## php_server

* listens for requests from client_plugin
  * sends boolean if user_token exist
  * writes render_information to the database


## React_app
* login_user
* get render_information
* download c4d_plugin


## Run backend

```
docker-compose build

docker-compose up
```
## Run react-app

```
cd react-app

npm i

npm start
```


    

# CryptoqueryClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change 
any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|
service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag 
for a production build.  
  
# API Information  
  
Note: For all server-to-client objects, make sure to pass the following with every response:  
```json
{
  "success": true,
  "response": response_object
}
```  
  
## Articles API  
  
### addArticle  
Add articles to database. Use authentication to only allow specific users to add articles.  
  
Client to Server:  
```json
[
  {
    "article_id" : "",
    "updated_at" : "2017-11-23T22:00:06.287Z",
    "created_at" : "2017-11-23T22:00:06.287Z",
    "image": "",
    "link" : "",
    "title" : "",
    "description" : "",
    "published_at" : "2017-11-23T15:32:21.000Z",
    "author" : ""
  }
]
```
### getArticles  
Get list of articles based on complexity and preferred topics.  
  
Client to Server:  
```json
{
  "complexity": 10,
  "topics": [
    "topic_1",
    "topic_2"
  ],
  "offset": 20
}
```  
  
Server to Client:  
```json
[
  {
    "article_id" : "",
    "updated_at" : "2017-11-23T22:00:06.287Z",
    "created_at" : "2017-11-23T22:00:06.287Z",
    "image": "",
    "link" : "",
    "title" : "",
    "description" : "",
    "published_at" : "2017-11-23T15:32:21.000Z",
    "author" : ""
  }
]
```  
  
### getArticle  
Get article based on article id.  
  
Client to Server:  
```json
{
  "article_id": ""
}
```  
  
Server to Client:  
```json
{
  "article_id" : "",
  "updated_at" : "2017-11-23T22:00:06.287Z",
  "created_at" : "2017-11-23T22:00:06.287Z",
  "image": "",
  "link" : "",
  "title" : "",
  "description" : "",
  "published_at" : "2017-11-23T15:32:21.000Z",
  "author" : ""
}
```  
  
## Users API  
  
### userLogin  
User login based on username and password.  
  
Client to Server:  
```json
{
  "username": "",
  "password": ""
}
```  
  
Server to Client:  
Pass preferred user authentication information to be used throughout application.  
  
and user settings:  
```json
{
  "push_enabled": true,
  "complexity": 10,
  "topics": [
    "topic_1",
    "topic_2"
  ]
}
```  
  
### createUser  
Create new user with default settings.  
  
Client to Server:  
```json
{
  "username": "",
  "password": "",
  "push_enabled": true,
  "complexity": 10,
  "topics": [
    "topic_1",
    "topic_2"
  ]
}
```  
  
Server to Client:  
```json
{
  "user_id": ""
}
```  

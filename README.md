# How-To API

https://how-to-application.herokuapp.com/

#### Users Schema

| field       | data type        | metadata                                            |
| :---------- | :--------------- | :-------------------------------------------------- |
| id          | unsigned integer | primary key, auto-increments, generated by database |
| username    | varchar(128)     | required, unique                                    |
| email       | varchar(128)     | required, unique                                    |
| password    | varchar(1024)    | required                                            |

#### How-To Schema

| field        | data type        | metadata                                            |
| :----------- | :--------------- | :-------------------------------------------------- |
| id           | unsigned integer | primary key, auto-increments, generated by database |
| user_id      | unsigned integer | foreign key referencing user.id, required           |
| title        | varchar(256)     | required                                            |
| post         | text             | required                                            |
| created_at   | timestamptz      | generated by database, a timestamp with timezone    |

#### API

The following endpoints are available to test the functionality of the model methods.
| HTTP Request | Endpoint             | Description                                                                         |
| :----------- | :------------------- | :---------------------------------------------------------------------------------- |
|   `GET`      | `/`                  | pings the server to check if its up or not                                          |
|   `POST`     | `/api/auth/register` | register a new user with provided JSON body                                         |
|   `POST`     | `/api/auth/login`    | login a user with their username and password, returns a token                      |
|   `GET`      | `/api/howto/`        | retrieves all How-To's                                                              |
|   `POST`     | `/api/howto/`        | posts a new How-To; requires a title, post, and user_id                             |
|   `PUT`      | `/api/howto/:id`     | updates an existing How-To                                                          |
|   `DELETE`   | `/api/howto/:id`     | deletes an existing How-To                                                          |

## User Registration and Login

<a href="#top">Top</a>

[POST]
## URL: /api/auth/register

### Request body should include:
| Input (case sensitive)  | Input Type    |
| :---------------------- | :------------ |
| username (required)     | string        |
| password (required)     | string        |
| email (required)        | string        |

_An example of how the body should appear:_
```js
{
	"username":"tim_the_enchanter",
	"password":"123abc",
	"email":"enchanter_tim@gmail.com"
}
```
_An example of the returned JSON data:_
```js
{
  "id": 5,
  "username": "tim_the_enchanter",
  "password": "$2a$12$K4DW2jDwOORS5AN/qGYA..I.b1RZUBzqlIwpg2BJIIIBYASABTTAu",
  "email": "enchanter_tim@gmail.com"
}
```

[POST]
## URL: /api/auth/login

### Request body should include:
| Input (case sensitive)  | Input Type    |
| :---------------------- | :------------ |
| username (required)     | string        |
| password (required)     | string        |

_An example of how the body should appear:_
```js
{
	"username":"tim_the_enchanter",
	"password":"123abc"
}
```

_An example of the returned JSON data:_
```js
{
  "message": "Welcome Home",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoidGltX3RoZV9lbmNoYW50ZXIiLCJpYXQiOjE1ODgwMzUzOTYsImV4cCI6MTU4ODA0NjE5Nn0.VD9xUJWlgfdY3vNH0G0AakI5Rt9j0qS71ywBKdlrNW8"
}
```

## How-To Endpoints

<a href="#top">Top</a>

[POST]
## URL: /api/howto

### Request body should include:
| Input (case sensitive)  | Input Type    |
| :---------------------- | :------------ |
| title (required)     		| string        |
| post (required)     		| string        |
| user_id (required)      | integer       |

_An example of how the body should appear:_
```js
{
	"title":"Edgar's first how-to post",
	"post":"Instructions will go in here.",
	"user_id":1
}
```

_An example of the returned JSON data:_
```js
[
  {
    "id": 3,
    "title":"Edgar's first how-to post",
    "post":"Instructions will go in here.",
    "created_at": "2020-04-28 00:58:30",
    "user_id": 1
  }
]
```
[PUT]
## URL: /api/howto/:id

This endpoint does not require every field. It should update only what you give it.

### Request body should include:
| Input (case sensitive)  | Input Type    |
| :---------------------- | :------------ |
| title     							| string        |
| post 					     			| string        |

_An example of how the body should appear:_
```js
{
	"title":"Edgar's best how-to post"
}
```

_An example of the returned JSON data:_
```js
[
  {
    "id": 3,
    "title":"Edgar's best how-to post",
    "post":"Instructions will go in here.",
    "created_at": "2020-04-28 00:58:30",
    "user_id": 1
  }
]
```

[DELETE]
## URL: /api/howto/:id

_An example of the returned JSON data:_
```js
{
  "message": "Successfully removed 1 posts."
}
```

<a href="#top">Top</a>

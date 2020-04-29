# How-To API

https://how-to-application.herokuapp.com/

#### Users Schema

| field    | data type        | metadata                                            |
| :------- | :--------------- | :-------------------------------------------------- |
| id       | unsigned integer | primary key, auto-increments, generated by database |
| username | varchar(128)     | required, unique                                    |
| email    | varchar(128)     | required, unique                                    |
| password | varchar(1024)    | required                                            |

#### How-To Schema

| field      | data type        | metadata                                            |
| :--------- | :--------------- | :-------------------------------------------------- |
| id         | unsigned integer | primary key, auto-increments, generated by database |
| user_id    | unsigned integer | foreign key referencing user.id, required           |
| title      | varchar(256)     | required                                            |
| post       | text             | required                                            |
| created_at | timestamptz      | generated by database, a timestamp with timezone    |

#### API

The following endpoints are available to test the functionality of the model methods.
| HTTP Request | Endpoint | Description |
| :----------- | :------------------- | :---------------------------------------------------------------------------------- |
| `GET`        | `/`                  | pings the server to check if its up or not                                          |
| `POST`       | `/api/auth/register` | register a new user with provided JSON body                                         |
| `POST`       | `/api/auth/login`    | login a user with their username and password, returns a token                      |
| `GET`        | `/api/howto/`        | retrieves all How-To's                                                              |
| `POST`       | `/api/howto/`        | posts a new How-To; requires a title, post, and user_id                             |
| `PUT`        | `/api/howto/:id`     | updates an existing How-To                                                          |
| `DELETE`     | `/api/howto/:id`     | deletes an existing How-To                                                          |
| `POST`       | `/api/likes/`        | adds "like" to post, input user_id and howto_id                                     |
| `GET`        | `/api/likes/:id`     | gets "likes" from specific howto post when howto.id entered as param                |

## User Registration and Login

<a href="#top">Top</a>

## [POST]
### URL: /api/auth/register

### Request body should include:

| Input (case sensitive) | Input Type |
| :--------------------- | :--------- |
| username (required)    | string     |
| password (required)    | string     |
| email (required)       | string     |

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

## [POST]
### URL: /api/auth/login

### Request body should include:

| Input (case sensitive) | Input Type |
| :--------------------- | :--------- |
| username (required)    | string     |
| password (required)    | string     |

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

## User Endpoints

<a href="#top">Top</a>

## [GET]
### URL: /api/user/

#### Returns an array of all users

_An example of the returned JSON data:_
```js
[
  {
    "id": 1,
    "username": "edgar",
    "email": "life_of_edgar@gmail.com"
  },
  {
    "id": 2,
    "username": "gregory",
    "email": "greg@gregmail.com"
  },
  {
    "id": 3,
    "username": "tim_the_enchanter",
    "email": "enchanter_tim@gmail.com"
  }
]
```

## [GET]
### URL: /api/user/:id

#### Returns an array of a single user

_An example of the returned JSON data:_
```js
[
  {
    "id": 1,
    "username": "edgar",
    "email": "life_of_edgar@gmail.com"
  }
]
```

## [GET]
### URL: /api/user/u/search?username=X

#### Returns an array of a single user where X is the username

_An example of the returned JSON data for search?username=edgar_
```js
[
  {
    "id": 1,
    "username": "edgar",
    "email": "life_of_edgar@gmail.com"
  }
]
```

## [POST]
### URL: /api/user/u/search

#### Returns an array of a single user

### Request body should include:
| Input (case sensitive)  | Input Type    |
| :---------------------- | :------------ |
| username (required)     | string        |

_An example of how the body should appear:_
```js
{
	"username":"edgar"
}
```
_An example of the returned JSON data:_
```js
[
  {
    "id": 1,
    "username": "edgar",
    "email": "life_of_edgar@gmail.com"
  }
]
```

## [GET]
### URL: /api/user/:id/post

#### Returns an array of a single user's how-to's

_An example of the returned JSON data:_
```js
[
  {
    "user_id": 1,
    "howto_id": 1,
    "username": "edgar",
    "title": "How to Put on a Medical Mask",
    "post": "Understand what a medical mask protects you from. Medical or surgical masks are intended to cover both your mouth and nose. They are designed with material that can block large-particle droplets, splashes, sprays and splatter — all of which may contain viruses or bacteria that may be harmful to you.",
    "created_at": "2020-04-28 15:33:29"
  },
  {
    "user_id": 1,
    "howto_id": 2,
    "username": "edgar",
    "title": "How to Write a How-To",
    "post": "Fill out this field and it's basically done.",
    "created_at": "2020-04-28 15:33:29"
  }
]
```


## How-To Endpoints

<a href="#top">Top</a>

## [GET]

#### Get all How-to's
#### URL: /api/howto

#### Get a single how-to by its ID
#### URL: /api/howto/:id

#### Get a single user's how-to's
#### URL: /api/howto/user/:id

```js
[
  {
    "id": 1,
    "title": "How to Put on a Medical Mask",
    "post": "Understand what a medical mask protects you from. Medical or surgical masks are intended to cover both your mouth and nose. They are designed with material that can block large-particle droplets, splashes, sprays and splatter — all of which may contain viruses or bacteria that may be harmful to you.",
    "created_at": "2020-04-28 15:33:29",
    "user_id": 1,
    "categories": [
      {
        "id": 1,
        "name": "General"
      },
      {
        "id": 2,
        "name": "Misc"
      }
    ]
  },
  {
    "id": 2,
    "title": "How to Write a How-To",
    "post": "Fill out this field and it's basically done.",
    "created_at": "2020-04-28 15:33:29",
    "user_id": 1,
    "categories": [
      {
        "id": 2,
        "name": "Misc"
      }
    ]
  }
]
```

## [POST]
### URL: /api/howto

### Request body should include:

| Input (case sensitive) | Input Type |
| :--------------------- | :--------- |
| title (required)       | string     |
| post (required)        | string     |
| user_id (required)     | integer    |

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
{
  "id": 1,
	"title":"Edgar's first how-to post",
	"post":"Instructions will go in here.",
  "created_at": "2020-04-29 00:40:13",
	"user_id": 1,
  "categories": []
}
```
## [PUT]
### URL: /api/howto/:id

This endpoint does not require every field. It should update only what you give it.

### Request body should include:
| Input (case sensitive)  | Input Type    |
| :---------------------- | :------------ |
| user_id (required)      | int           |
| title     							| string        |
| post 					     			| string        |

_An example of how the body should appear:_

```js
{
  "user_id": 1,
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
    "user_id": 1,
    "categories": []
  }
]
```

## [DELETE]
### URL: /api/howto/:id/delete?user_id=X

#### Requires the user's ID to be passed in as X

Returns boolean (1 on success, 0 on fail)

<a href="#top">Top</a>

## Category Endpoints

## [GET]
### URL: /api/categories
#### Returns an array of all categories

_An example of the returned JSON data:_

```js
[
  {
    "id": 1,
    "name": "General"
  },
  {
    "id": 2,
    "name": "Misc"
  }
]
```

## [POST]
### URL: /api/categories


### Request body should include:
| Input (case sensitive)  | Input Type    |
| :---------------------- | :------------ |
| name (required)					| string        |

_An example of how the body should appear:_
```js
{
	"name":"Miscellaneous"
}
```

<a href="#top">Top</a>





## "LIKES" endpoints-------------------------------------------------

[POST]
## URL: /api/likes

{
  user_id:integer,
  howto_id: integer
}

[GET]
## URL: /api/likes/:id
 send howto.id as request params and receive a response in the following shape:
  {
        "id": 1,
        "user_id": 1,
        "howto_id": 1
    }
_Returns the category's id as JSON data:_
```js
[
  2
]
```

## [POST]
### URL: /api/categories/:id/howto
#### Adds a category to a how-to

### Request body should include:
| Input (case sensitive)  | Input Type    |
| :---------------------- | :------------ |
| howto_id (required) 		| string        |

_An example of how the body should appear:_
```js
{
	"howto_id":"1"
}
```

_Returns the how-to and the categories on the how-to:_
```js
{
  "id": 1,
  "title": "How to Put on a Medical Mask",
  "post": "Understand what a medical mask protects you from. Medical or surgical masks are intended to cover both your mouth and nose. They are designed with material that can block large-particle droplets, splashes, sprays and splatter — all of which may contain viruses or bacteria that may be harmful to you.",
  "created_at": "2020-04-28 15:33:29",
  "user_id": 1,
  "categories": [
    {
      "id": 1,
      "name": "General"
    },
    {
      "id": 2,
      "name": "Misc"
    },
    {
      "id": 3,
      "name": "Third category"
    }
  ]
}
```

## [GET]
### URL: /api/categories/:id/howto
#### Returns all how-to's for a category, where the category is :id

_Returns the how-to it was attached to in an array:_
```js
[
  {
    "category_name": "General",
    "howto_id": 1,
    "howto_title": "How to Put on a Medical Mask",
    "howto_post": "Understand what a medical mask protects you from. Medical or surgical masks are intended to cover both your mouth and nose. They are designed with material that can block large-particle droplets, splashes, sprays and splatter — all of which may contain viruses or bacteria that may be harmful to you.",
    "created_at": "2020-04-28 15:33:29"
  },
  {
    "category_name": "General",
    "howto_id": 2,
    "howto_title": "How to Write a How-To",
    "howto_post": "Fill out this field and it's basically done.",
    "created_at": "2020-04-28 15:33:29"
  }
]
```

## [DELETE]
### URL: /api/categories/:id/howto
#### Removes a category from a how-to and returns that how-to and any current categories

_Example request to /api/categories/2/howto_
```js
{
	"howto_id":"1"
}
```

_Example of what will be returned:_
```js
{
  "id": 1,
  "title": "How to Put on a Medical Mask",
  "post": "Understand what a medical mask protects you from. Medical or surgical masks are intended to cover both your mouth and nose. They are designed with material that can block large-particle droplets, splashes, sprays and splatter — all of which may contain viruses or bacteria that may be harmful to you.",
  "created_at": "2020-04-28 15:33:29",
  "user_id": 1,
  "categories": [
    {
      "id": 1,
      "name": "General"
    },
    {
      "id": 3,
      "name": "Third category"
    }
  ]
}
```

## [DELETE]
### URL: /api/categories/:id
#### Completely removes a category from the database, returns boolean (1 on success, 0 on fail)

<a href="#top">Top</a>

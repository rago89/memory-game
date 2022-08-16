# Memory Game API

An API to manage users and the game played, below is a full description of all routes that you can use for development purposes

## Index

- [Memory Game API](#memory-game-api)
  - [Index](#index)
  - [Getting Started](#getting-started)
    - [Install database server](#install-database-server)
    - [In the Memory Game app repo](#in-the-memory-game-app-repo)
    - [Using the API](#using-the-api)
  - [The API Documentation](#the-api-documentation)
    - [Routes](#routes)
  - [Users](#users)
    - [Create new User](#create-new-user)
    - [Get users](#get-users)
    - [Get one user](#get-one-user)
    - [Delete user](#delete-user)
    - [Update User](#update-user)
  - [Games](#games)
    - [Create new Game](#create-new-game)
    - [Get Games](#get-games)
    - [Get one Game](#get-one-game)
    - [Delete Game](#delete-game)
    - [Update Game](#update-game)

## Getting Started

### Install database server

Follow the steps explained by [mongodb](https://docs.mongodb.com/manual/administration/install-community/)

### In the Memory Game app repo

- `npm install`
- **run the server**
  - `npm run api` - uses `nodemon` to restart the server each time you save a change

### Using the API

- **from postman**
  - `http://localhost:xxxx/api` - the main entry point to the API
- **from the browser**

  - `http://localhost:xxxx/` serves `/api/<route-api>`

> [Back to index routes](#index)

---

## The API Documentation

### Routes

- [users](#users)
- [games](#games)

## Users

### Create new User

Creates a new user.

- **URL**

  api/users/register

- **Method:**

  `POST`

- **Body:**

  ```js
  {
    "name": "sample10",
    "email": "test8@email.com",
    "password":"hello123"
  }
  ```

- **return:**

  ```js
  {
  "_id": "62fb72ba0bf9581b6e27eb37",
  "name": "sample9",
  "email": "test9@email.com"
  }

  ```

  > [Back to index routes](#index)

---

### Fetch users

Get all users from the collection.

> To use this route, you must register and then login. Once logged in, you can use the token to get the user.

Returns json data about a single channel.

- **URL**

api/users

- **Method:**

`GET`

- **Result:**

```js
[
  {
    _id: "62f0e3b5712912f5d2538674",
    name: "sample8",
    email: "test8@email.com",
    password: "4233137d1c510f2e55ba5cb220b864b11033f156",
  },
  {
    _id: "62f0e6bd6b92a7b049d17222",
    name: "update6",
    email: "test8@email.com",
    password: "4233137d1c510f2e55ba5cb220b864b11033f156",
  },
];
```

> [Back to index routes](#index)

---

### Fetch one user

Get one user from the system.

> To use this route, you must register and then login. Once logged in, you can use the token to get the user.

- **URL**

  /api/users/:id

- **Method:**

  `GET`

- **URL Params**

  `id = string` -> the user id

  **Required:**

  `id = string`s

- **Result:**

  ```js
  {
  "_id": "62f0e3b5712912f5d2538674",
  "name": "sample8",
  "email": "test8@email.com",
  "password": "4233137d1c510f2e55ba5cb220b864b11033f156"
  }
  ```

  Is there is not user:

  ```js
  null;
  ```

> [Back to index routes](#index)

---

### Delete user

Remove a user and all registered animals of the dataBase.

> To use this route, you must register and then login. Once logged in, you can use the token to get the user.

- **URL**

  /api/users/delete/:id

- **Method:**

  `GET`

- **URL Params**

  `id = string` -> the user id

  **Required:**

  `id = string`

- **Result:**

  ```js
  {
  "message": "User id:62f0e6bd6b92a7b049d17222 was removed successfully"
  }
  ```

  If there is not user with the given id:

  ```js
  "Cannot delete user with given id:62f0e6bd6b92a7b049d17222, doesn't exist!";
  ```

  > [Back to index routes](#index)

---

### Update User

> To use this route, you must register and then login. Once logged in, you can use the token to get the user.

- **URL**

  /api/users/update/:id

- **Method:**

  `POST`

- **URL Params**

  `id = string` -> the user id

- **Body**

Multiform data

| key         | value                    | type |
| ----------- | ------------------------ | ---- |
| id          | 616ed72339ecbbf9b4c1c0b5 | text |
| name        | rafael                   | text |
| email       | abcd@hyf.com             | text |
| repeatEmail | abcd@hyf.com             | text |
| newPassword | hello                    | text |
| oldPassword | hello123                 | text |
| avatar      | profile.jpg              | file |

- **Result:**

  ```js
  {
  "_id": "62f0e3b5712912f5d2538674",
  "name": "update6",
  "email": "test8@email.com",
  "avatar": {
    "data": "/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABwAMgDASIAAhEBAxEB/",
    "contentType": "image/jpg"
  },
  "updateDate": "2022-08-16T11:07:37.198Z"
  }
  ```

  If there is not user with the given id:

  ```js
  "Cannot update user with given id:62f0e6bd6b92a7b049d17222, doesn't exist!";
  ```

  > [Back to index routes](#index)

---

## Games

### Create new Game

> To use this route, you must register and then login. Once logged in, you can use the token to get the user.

Creates a new user.

- **URL**

  /api/games/level

- **Method:**

  `POST`

- **Body**

application/json

```js
{
    "gameLevel": 1,
    "userId": "62f0e3b5712912f5d2538674"
}
```

- **return:**

  ```js
  {
  "_id": "62fb885aecf1676e8cd81d83",
  "gameLevel": 1,
  "userId": "62fb72ba0bf9581b6e27eb37"
  }
  ```

  > [Back to index routes](#index)

---

### Get Games

Get all games from the collection.

> no login or register required

- **URL**

  /api/games

- **Method:**

`GET`

- **Result:**

```js
[
  {
    _id: "62f540163539e1058d15aed0",
    gameLevel: 6,
    userId: "62f0e3b5712912f5d2538674",
    updateDate: "2022-08-16T10:23:54.276Z",
  },
  {
    _id: "62fb883be6fdea85a31330a9",
    gameLevel: 0,
    userId: "62fb72ba0bf9581b6e27eb37",
  },
  {
    _id: "62fb885aecf1676e8cd81d83",
    gameLevel: 1,
    userId: "62fb72ba0bf9581b6e27eb37",
  },
];
```

> [Back to index routes](#index)

---

### Get one Game

Get one game from the system.

> No registration or authorization required

- **URL**

  /api/games/:id

- **Method:**

  `GET`

- **URL Params**

  `id = string` -> user's id

  **Required:**

  `id = string`

- **Result:**

  ```js
  {
    "_id": "62fb883be6fdea85a31330a9",
    "gameLevel": 10,
    "userId": "62fb72ba0bf9581b6e27eb37"
  },
  ```

  If there is not user with the given id:

  ```js
  "Cannot update user with given id:62f0e6bd6b92a7b049d17222, doesn't exist!";
  ```

  > [Back to index routes](#index)

---

### Delete Game

Remove an animal of the dataBase.

> To use this route, you must register and then login. Once logged in, you can use the token to get the user.

- **URL**

  /api/games/delete/:id

- **Method:**

  `DELETE`

- **URL Params**

  `id = string` -> game id

  **Required:**

  `id = string`s

- **Result:**

  ```js
  "Game, with the id: '616fc5693e31fe2c1f5629a0' removed successfully";
  ```

> [Back to index routes](#index)

---

### Update Game

> To use this route, you must register and then login. Once logged in, you can use the token to get the user.

- **URL**

  /api/games/update/:id

- **Method:**

  `PUT`

- **URL Params**

  `id = string` -> Game id

  **Required:**

  `id, userId, gameLevel`

- **Body**

Multiform data

| key       | value                    | type |
| --------- | ------------------------ | ---- |
| userId    | 62f0e3b5712912f5d2538674 | text |
| gameLEvel | 12                       | text |
| gameId    | 62f540163539e1058d15aed0 | text |

- **Result:**

  ```js
  {
  "_id": "62f540163539e1058d15aed0",
  "gameLevel": 6,
  "userId": "62f0e3b5712912f5d2538674",
  "updateDate": "2022-08-16T12:56:26.296Z"
  }
  ```

  > [Back to index routes](#index)

---

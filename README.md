## Instructions on how to run

```bash
git clone git@github.com:ayimdomnic/nest-prisma.git && cd nest-prisma


yarn

docker-compose up -d

yarn start

http://localhost:3000/graphql


```

### TESTING ENDPOINTS

## Register
```graphql

# Write your query or mutation here
mutation {
  register(input:{
    fullName:"Odhis Two",
    email:"odhis@app.com",
    password:"odhis123",
    passwordConfirm:"odhis123"
  }) {
    refreshToken,
    accessToken
  }
}

```

![Register](./screenshots/register_success.png)
![WeakPassword](./screenshots/weak_password.png)
![Login](./screenshots/login.png)

## Result (Weak Password)

```graphql
{
  "errors": [
    {
      "message": "Bad Request Exception",
      "extensions": {
        "code": "BAD_USER_INPUT",
        "response": {
          "statusCode": 400,
          "message": [
            "password too weak"
          ],
          "error": "Bad Request"
        }
      }
    }
  ],
  "data": null
}
```

## Result (Strong Password)

```graphql

{
  "data": {
    "register": {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzZkYTBmNy0xMjZhLTQ2ODMtOTRlNS1lZTkyOWQ3OGM3N2QiLCJpYXQiOjE2Mzg1NDk3MjMsImV4cCI6MTYzOTE1NDUyM30.VhZ0j5s9zOsRiAxIDoyV2JCaEclgdlsZOffvRTxHceU",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzZkYTBmNy0xMjZhLTQ2ODMtOTRlNS1lZTkyOWQ3OGM3N2QiLCJpYXQiOjE2Mzg1NDk3MjMsImV4cCI6MTYzODU0OTg0M30.hZqzYzs_Wxz2vqn3HOpnAXYNSiAo8IDU4dMOjBxkT2E"
    }
  }
}

```

## Login

```graphql

# Write your query or mutation here
mutation {
  login(input:{
    email:"odhis@app.com",
    password:"KL@#457jkl0987&^",
  }) {
    refreshToken,
    accessToken
  }
}
```

```json

{
  "data": {
    "login": {
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzZkYTBmNy0xMjZhLTQ2ODMtOTRlNS1lZTkyOWQ3OGM3N2QiLCJpYXQiOjE2Mzg1NDk3ODYsImV4cCI6MTYzOTE1NDU4Nn0.Gl82lYX7Tiz6BKa4sGmRNGTW3fnvOOddO-rZrKRN7Vs",
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMzZkYTBmNy0xMjZhLTQ2ODMtOTRlNS1lZTkyOWQ3OGM3N2QiLCJpYXQiOjE2Mzg1NDk3ODYsImV4cCI6MTYzODU0OTkwNn0.T_ZrwEHFG5oYpxWmSjPwl03dT4sbLilXzsc4si_nJeI"
    }
  }
}
```

## Authenticated User

```graphql
query {
  getUser {
    fullName
    email
    createdAt
    updatedAt
  }
}

```

## Resutl Not Loggged In

```json
{
  "errors": [
    {
      "message": "Unauthorized",
      "extensions": {
        "code": "UNAUTHENTICATED",
        "response": {
          "statusCode": 401,
          "message": "Unauthorized"
        }
      }
    }
  ],
  "data": null
}
```

## Result Logged In

```graphql
{
  "data": {
    "getUser": {
      "fullname": "Odhiambo Dormnic",
      "email": "ayimdomnic++@gmail.com",
      "status": "active",
      "createdAt": "2021-12-23T12:18:37.629Z",
      "updatedAt": "2021-12-23T12:18:37.630Z"
    }
  }
}
```

## Too Many Attempts

```json
{
  "errors": [
    {
      "message": "User is blocked",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "login"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "Error: User is blocked",
            "    at AuthService.login (/Users/ayim/Code/nest-prisma/src/services/auth.service.ts:77:42)",
            "    at AuthResolver.login (/Users/ayim/Code/nest-prisma/src/resolvers/auth.resolver.ts:22:43)",
            "    at target (/Users/ayim/Code/nest-prisma/node_modules/@nestjs/core/helpers/external-context-creator.js:77:28)",
            "    at /Users/ayim/Code/nest-prisma/node_modules/@nestjs/core/helpers/external-proxy.js:9:24"
          ]
        }
      }
    }
  ],
  "data": null
}

```

## Send Request


```graphql
mutation {
  sendFriendRequest(input: { userId:"94f32208-9531-4446-8d4a-1aca79525428"}) {
    id
    status
    requesterId
    createdAt
    updatedAt
  }
}

```

```json
{
  "errors": [
    {
      "message": "Unauthorized",
      "extensions": {
        "code": "UNAUTHENTICATED",
        "response": {
          "statusCode": 401,
          "message": "Unauthorized"
        }
      }
    }
  ],
  "data": null
}

```
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
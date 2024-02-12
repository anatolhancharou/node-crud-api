# CRUD API

---

### Prerequisites

1. Go to folder `node-crude-api`
2. Install all dependencies using [`npm install`](https://docs.npmjs.com/cli/install)
3. Rename `.env.example` to `.env`
4. Run **scripts** in command line.

---

### Scripts

```bash
# run in development mode
$ npm run start:dev

# run in production mode
$ npm run start:prod

# run unit tests
$ npm run test

# with logging
$ npm run test:verbose
```

---

#### Notes

To test functionality use Postman (other tools are available).

#### Available endpoints:

- **GET** `api/users` is used to get all users,
- **GET** `api/users/{userId}` is used to get a user by id,
- **POST** `api/users` is used to create a user,
- **PUT** `api/users/{userId}` is used to update a user,
- **DELETE** `api/users/{userId}` is used to delete a user

Users are stored as `objects` that have following properties:

- `id` — unique identifier (`string`, `uuid`) generated on server side
- `username` — user's name (`string`, **required**)
- `age` — user's age (`number`, **required**)
- `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)

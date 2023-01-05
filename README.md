<div align="center">
  <br>
  <h1><strong>Backend Figilante Coffee App</strong></h1
  <br>

  <!-- [**View the Web App**](https://exceltodynamodbjson.vercel.app) -->
</div>


##  Description
Backend application Figilante Coffee App for Repo **figilante-backend**

## Built With
![Express](https://img.shields.io/badge/Express-v4.18.2-pink?style=flat)
![Cors](https://img.shields.io/badge/cors-v2.8.5-green?style=flat)
![Argon2](https://img.shields.io/badge/argon2-v0.30.2-blue?style=flat)
![Dotenv](https://img.shields.io/badge/dotenv-v16.0.3-orange?style=flat)
![Express Validator](https://img.shields.io/badge/expressvalidator-v6.14.2-red?style=flat)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Morgan](https://img.shields.io/badge/morgan-v1.10.0-cyan?style=flat)
![Multer](https://img.shields.io/badge/multer-v8.4.5-ray?style=flat)
![Nodemon](https://img.shields.io/badge/nodemon-v2.0.20-white?style=flat)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

## Table of Contents
- [Description](#description)
- [Built With](#built-with)
- [Table of Contents](#table-of-contents)
- [Technologies](#technologies)
- [Run App](#run-app)
- [ENV Example](#env-example)
- [Main End Point](#main-end-point)


## Technologies
- [Node Js](https://nodejs.org/en/)
- [Express Js](https://expressjs.com/)
- [Postman](https://www.postman.com/)
- [Postgree SQL](https://www.postgresql.org/)
- [Supabase](https://supabase.com/)
- [Vercel](https://vercel.com/)


## Run App
-   Requirement:

    -   Install [Node.js](https://nodejs.org)
    -   Recommended to use [NPM](https://www.npmjs.com/)

-   Clone the repo.

    ```bash
    git clone https://github.com/filwathan/figilante-backend.git
    ```

    ```bash
    cd figilante-backend
    ```

-   Install the dependencies.

    ```bash
    npm install
    ```

    ### Development
    Set up your ENV

     ```bash
    npx prisma db pull (when you already have databases using PostgreSQL or other RDBMS) && npx prisma generate
    npm run dev
    ```

    Open Postman
    Run the development server and open [http://localhost:8888](http://localhost:8888)



## ENV Example
```DATABASE_URL
  DATABASE_URL="postgresql://postgres:figilante12@db.glktxwvozuajipixmiet.supabase.co:5432/postgres?schema=public"
```
```PORT
PORT=
```
```SECRET KEY
SECRET=
```
```CLOUDINARY
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Main End Point
|url|method|desc|
|---|------|----|
|/auth/login|POST|login user or admin|
|/auth/register|POST|register new user|
|/auth/forgot-password|POST|if user forgot password / account recovery|
|/profile/|GET|profile endpoint should have token|
|/profile/|PATCH|update profile endpoint should have token|
|/profile/changePassword|PATCH|update user password endpoint should have token|
|/profile/uploadProfilePicture|PATCH|update user picture endpoint should have token|
|/products|GET|get all product with filter (Favorite, Foods, Coffee, Non Coffee Add-on), page, and limit|
|/products/:id|GET|get product details by id its product|
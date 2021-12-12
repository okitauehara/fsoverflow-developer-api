<h1 align="center">
   💻 <a href="#"> FullStack Overflow Developer API </a>
</h1>

<h3 align="center">
    For those who like to find someone in the same situation, but also a solution to the problem.
</h3>

<h4 align="center"> 
	 Status: Finished
</h4>

<p align="center">
 <a href="#about">About</a> •
 <a href="#database">Database</a> • 
 <a href="#how-it-works">How It Works</a> • 
 <a href="#pre-requisites">Pre-requisites</a> • 
 <a href="#tech-stack">Tech Stack</a> • 
 <a href="#how-to-contribute">How to contribute</a> • 
 <a href="#author">Author</a>
</p>


## About

FullStack Overflow API was designed to facilitate the flow of questions and answers from your group of friends and co-workers in the tech world!

---


## Database


The database was designed at https://www.dbdesigner.net/ for PostgreSQL.

``` postgresql

/* In your psql terminal */
CREATE DATABASE fsoverflow;

/* Access the database */
\c fsoverflow

```
Now, just run the commands listed in <a href="https://github.com/okitauehara/fsoverflow-developer-api/blob/main/dump.sql">dump.sql</a>

---

## How It Works

### POST /questions

``` jsx
POST /questions
```

#### Expected Body

``` jsx
{
  "question": "How it works?",
  "student": "Bob",
  "classname": "T3",
  "tags": "typescript, lifestyle, javascript, java?"
}
```

#### Possible Response Status

``` jsx
400: 'The request body contains invalid elements';
201: 'Created';
404: 'The student name does not belong to any registered user';
404: 'The class name does not belong to any registered class';
500: 'Internal Server Error - error details'
```

---

### POST /questions/:id

``` jsx
POST /questions/:id
```

#### Expected Body

``` jsx
{
  "answer": "Just look at the README file :)" 
}
```

#### Possible Response Status

``` jsx
400: 'The request body contains invalid elements';
200: 'OK';
404: 'Question not found';
409: 'Question already answered';
500: 'Internal Server Error - error details'
```

---

### POST /users

``` jsx
POST /users
```

#### Expected Body

``` jsx
{
  "name": "John",
  "classname": "T4" 
}
```

#### Possible Response Status

``` jsx
400: 'The request body contains invalid elements';
201: 'Created';
404: 'The class name does not belong to any registered class';
409: 'User already registered';
500: 'Internal Server Error - error details'
```

---

### GET /questions

``` jsx
GET /questions
```

#### Expect to receive

``` jsx
[
  {
    "id": 11,
    "question": "We gonna learn TS?", 
    "student": "Zoru", 
    "class": "T3",
    "submitedAt": "2021-11-20 10:12"
  },
  {
    "id": 15,
    "question": "New here, should I learn JS or Python first?", 
    "student": "Zoru", 
    "class": "T4",
    "submitedAt": "2021-11-19 07:12"
  }
]
```

#### Possible Response Status

``` jsx
200: 'OK'
404: 'Unanswered questions not found';
500: 'Internal Server Error - error details'
```

---

### GET /questions/:id

``` jsx
GET /questions/:id
```

#### Expect to receive

``` jsx
// Answered Question
{
  "question": "How It Works?",
  "student": "Bob",
  "class": "T3",
  "tags": "typescript, lifestyle, javascript, java?"
  "answered": true,
  "submitedAt": "2021-11-16 08:35"
  "answeredAt": "2021-11-16 13:30"
  "answeredBy": "Dylan",
  "answer": "Just look at the README file :)" 
}

//Unanswered Question
{
  "question": "We gonna learn TS?", 
  "student": "Zoru", 
  "class": "T3",
  "tags": "typescript, bootcamp",
  "answered": false,
  "submitedAt": "2021-11-20 10:12"
}
```

#### Possible Response Status

``` jsx
200: 'OK'
404: 'Question not found';
500: 'Internal Server Error - error details'
```

---

## Pre-requisites

Before you begin, you will need to have the following tools installed on your machine:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/), [VSCode](https://code.visualstudio.com/).

### Running the Backend (server)

``` jsx

// Clone this repository
$ git clone git@github.com:okitauehara/fsoverflow-developer-api.git

// Access the project folder cmd/terminal
$ cd fsoverflow-developer-api

// Install the dependencies
$ npm install

// Create a .env.dev file and fill it using your environment variables following the .env.example

// Run the application in development mode
$ ntl -> start:dev

// The server will start at port: 4000

```
You can find the .env.example <a href="https://github.com/okitauehara/fsoverflow-developer-api/blob/main/.env.example">here</a>

---

## Tech Stack

The following tools were used in the construction of the project-api:

**Server**  ([NodeJS](https://nodejs.org/en/))

-   **[Express](https://expressjs.com/)**
-   **[CORS](https://expressjs.com/en/resources/middleware/cors.html)**
-   **[NTL](https://github.com/ruyadorno/ntl)**
-   **[Pg](https://github.com/brianc/node-postgres)**
-   **[DotENV](https://github.com/motdotla/dotenv)**
-   **[Joi](https://github.com/hapijs/joi)**
-   **[TypeScript](https://github.com/Microsoft/TypeScript)**
-   **[Eslint - Airbnb](https://github.com/airbnb/javascript)**

> See the file  [package.json](https://github.com/okitauehara/fsoverflow-developer-api/blob/main/package.json)

**Utilitários**

-   Editor:  **[Visual Studio Code](https://code.visualstudio.com/)**
-   API Test:  **[Insomnia](https://insomnia.rest/)**


---


## How to contribute

1. Fork the project.
2. Create a new branch with your changes: `git checkout -b feat/myFeatureName`
3. For each feature implemented, make a commit specifying what was done
4. Submit your changes: `git push -u origin feat/myFeatureName`

---

## Author

Developed by Marcos Okita Uehara.
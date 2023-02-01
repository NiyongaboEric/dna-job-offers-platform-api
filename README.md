# DNA Job Offers Platform API

Unofficial DNA job offer platform for screaning, tracking, hiring great candidates who apply for a job.

## Project set up

### System Specification

This is the current OS and node version I use.
- Node `v18.13.0`
- NPM `8.19.3`
- Ubuntu OS `22.04.1 LTS`

### Technologies

- NodeJS
- TypeScript
- ExpressJS

### Database

- PostgreSQL
- Sequelize ORM

### Tools

- Yarn
- ESlint

### CI/CD and Deployment

- Github workflow
- Github Repository

### Documentation

- Swagger API

## Instructions

- Make sure you have `yarn` ready
- Clone the repository `dna-job-offers-platform-api`
- `cd` to project directory
- Run `yarn install` to Install dependencies
- Run `yarn start:watch` to Start the local server
- Run `yarn test` to check the test
- Run `yarn start` to build the application in production

## API Versioning

At the moment the platform has version API 1. The routes is `url/api/v1`

## Available endpoints

| URL                            | HTTP Methods | Description             |
| -------------------------------| ------------ | ----------------------- |
| /                              | GET          | Homepage                |
| *                              | GET          | 404   File not found    |
| api/v1/job-offer/new           | POST         | Save new job offer      |
| api/v1/user/signup             | POST         | Sign up a user          |
| api/v1/user/signin             | POST         | Login a user            |
| api/v1/user/all                | GET          | View all users          |
| api/v1/user/:user_id           | GET          | View single user        |


## API Documentation

Each API Version, has its specific swagger documentation. In order to have docs running pass through AP1 V1.

- If you name the `api/v1` the full route would be `url/api/v1/api-docs/`
- The full url is `http://localhost:{port}/api/v1/api-docs/`

## .env.example

- Create `.env` file
- Pass your own info or
- Leave it as is with current default settings app should work

## Database

- Make sure you have Postgres installed
- create your own database and use that name

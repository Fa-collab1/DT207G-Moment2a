# WorkExperienceAPI - MongoDB version

## Table of Contents

- [About](#about)
- [Services](#services)
- [API Request Structure](#api-request-structure)
- [Work Experience Collection](#work-experience-collection)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Package Dependencies](#package-dependencies)
- [Contact Information](#contact-information)

## About

- **Purpose**: The repository contains code for a simple REST API developed using Express. 
- **Access**: To access the home page of the API, I visit [WorkExperienceAPI](https://joni2307-mongodb-fb4a10f76f99.herokuapp.com).[GitHub](https://github.com/Fa-collab1/DT207G-Moment2a/tree/MongoDB).
- **Functionality**: The API allows me to add, update, delete, and retrieve work experiences. It includes basic CRUD (Create, Read, Update, Delete) functionalities.
- **Database**: A MongoDB database at MongoAtlas is used to store the work experience data.
- **Deployment**: The API is deployed on Heroku, [WorkExperienceAPI](https://joni2307-mongodb-fb4a10f76f99.herokuapp.com).

## Services

Here are the main services provided by the API:

| Method | Endpoint    | Description                                                                                   |
|--------|-------------|-----------------------------------------------------------------------------------------------|
| GET    | [`/get`](https://joni2307-mongodb-fb4a10f76f99.herokuapp.com/get)      | Retrieves all work experiences. |
| GET    | `/get/:id`  | Retrieves a specific work experience with the specified ID.                                  |
| POST   | `/post`     | Adds a new work experience. Requires a work experience object to be sent.                    |
| PUT    | `/put/:id`  | Updates an existing work experience with the specified ID. Requires a work experience object to be sent. |
| DELETE | `/delete/:id` | Deletes a work experience with the specified ID.                                             |

### API Request Structure

```json
{
  "id": "id",
  "companyname": "Example Farm AB",
  "jobtitle": "Predator Caretaker",
  "location": "Bjurholm",
  "startdate": "2021-05-17",
  "enddate": null,
  "description": "Responsible for developing and maintaining goats and sheep."
}
```

/ "id" is not sent when adding a new post.
/ "enddate" can be either "null" or a date.
/ "description" can be either "null" or a string.

### Work Experience Collection

| Field        | Type     | Constraints |
|--------------|----------|-------------|
| _id          | ObjectId |             |
| companyname  | String   | Required    |
| jobtitle     | String   | Required    |
| location     | String   | Required    |
| startdate    | Date     | Required    |
| enddate      | Date     |             |
| description  | String   |             |

### Project Structure

The project follows a standard structure for a Node.js application with TypeScript:

| Directory/File | Description |
|----------------|-------------|
| **src/**       | Directory containing the source code files. |
| **server.ts**  | Main entry point of the application. |
| **initializeDatabase.ts**  | Database starter|
| **public/**    | Directory containing static assets such as CSS, some javascript files and images. |
| **views/**     | Directory containing EJS templates for rendering HTML. |
| **.env**       | Configuration file for storing environment variables. (Not included in the repository for safety reasons) |
| **package.json** | File containing metadata and dependencies for the project. |
| **tsconfig.json** | TypeScript configuration file specifying compiler options and project settings. |
| **.gitignore** | File specifying patterns to be ignored by Git. |
| **README.md**  | Markdown file containing project documentation. |

### Technologies Used

| Technology   | Description                                                                   |
|--------------|-------------------------------------------------------------------------------|
| VS Code      | Integrated development environment (IDE) used for coding.                     |
| Heroku       | Cloud platform used for deployment.                                           |
| MongoDB      | NoSQL database management system used for data storage (run on MongoAtlas). |
| Parcel       | Web application bundler used for bundling and serving static assets.           |
| TypeScript   | Typed superset of JavaScript used for development.                             |
| Express      | Web application framework used for building APIs.                              |
| EJS          | Embedded JavaScript templating language used for generating HTML markup.       |
| Dotenv       | Zero-dependency module used for loading environment variables from a `.env` file. |
| CORS         | Node.js package used for enabling CORS with various options.                  |
| Mongoose     | MongoDB object modeling for Node.js, providing a schema-based solution for data modeling and interaction with MongoDB databases.|
| Node.js      | JavaScript runtime environment used for running the API server.                |

### Package Dependencies

```json
{
  "name": "moment2a",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "start": "npm run build && node src/server.js",
    "postinstall": "echo \"Postinstall tasks complete\""
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.9",
    "express": "^4.19.2",
    "pg": "^8.11.5",
    "typescript": "^5.4.4",  
    "@types/node": "^20.12.5"  
  },
  "devDependencies": {
    "parcel": "^2.12.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  }
}
```

## Contact Information

For questions or support, I know where to find me...

&copy; 2024 [joni2307@student.miun.se](mailto:joni2307@student.miun.se) All rights reserved.

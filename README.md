# WorkExperienceAPI

## About

This repository contains code for a simple REST API built with Express. The API is designed to manage various courses that I have studied during my time at Mid Sweden University. Basic CRUD (Create, Read, Update, Delete) functionality is implemented. This API provides services for managing work experiences. With this API, I can perform various operations such as fetching, adding, updating, and deleting work experiences. To access the home page for the API, I visit [WorkExperienceAPI](https://jn2307-api-server-8db335f8b5ca.herokuapp.com/). The database used for storing the course data is PostgreSQL, which is provided by Heroku as an add-on. The API is deployed on Heroku, and the database is hosted on the same platform.

## Services

Here are the main services provided by the API:

| Method | Endpoint                        | Description                                                   |
|--------|---------------------------------|---------------------------------------------------------------|
| GET    | /workexperience                 | Retrieves all work experiences.                               |
| GET    | /workexperience/:id             | Retrieves a specific work experience with the specified ID.  |
| POST   | /workexperience                 | Adds a new work experience. Requires a work experience object to be sent. |
| PUT    | /workexperience/:id             | Updates an existing work experience with the specified ID. Requires a work experience object to be sent. |
| DELETE | /workexperience/:id             | Deletes a work experience with the specified ID.             |

### API Request Structure

```json
{
  "Id": "id" (note: not sent when adding a new course),
  "companyname": "Example Farm AB",
  "jobtitle": "Predator Caretaker",
  "location": "Bjurholm",
  "startdate": "2021-05-17",
  "enddate": null,
  "description": "Responsible for developing and maintaining goats and sheep."
}
```

### Project Structure

The project follows a standard structure for a Node.js application with TypeScript:

| Directory/File | Description |
|----------------|-------------|
| **src/**       | Directory containing the source code files. |
| **server.ts**  | Main entry point of the application. |
| **public/**    | Directory containing static assets such as CSS and images. |
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
| PostgreSQL   | Relational database management system used for data storage (included in Heroku platform). |
| Parcel       | Web application bundler used for bundling and serving static assets.           |
| TypeScript   | Typed superset of JavaScript used for development.                             |
| Express      | Web application framework used for building APIs.                              |
| EJS          | Embedded JavaScript templating language used for generating HTML markup.       |
| Dotenv       | Zero-dependency module used for loading environment variables from a `.env` file. |
| CORS         | Node.js package used for enabling CORS with various options.                  |
| PG           | PostgreSQL client for Node.js used for interfacing with PostgreSQL database.  |
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
    "start": "node src/server.ts"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "ejs": "^3.1.9",
    "express": "^4.19.2",
    "parcel": "^2.12.0",
    "pg": "^8.11.5",
    "typescript": "^5.4.4"
  },
  "devDependencies": {
    "@types/node": "^20.12.5"
  }
}
```

## Contact Information

For questions or support, feel free to contact me at [joni2307@student.miun.se](mailto:joni2307@student.miun.se).

&copy; 2024 All rights reserved.

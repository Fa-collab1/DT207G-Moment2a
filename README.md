# WorkExperienceAPI

## About

- **Purpose**: The repository contains code for a simple REST API built with Express to manage courses studied at Mid Sweden University, offering CRUD functionality for work experiences.
- **Access**: Visit [WorkExperienceAPI](https://jn2307-api-server-8db335f8b5ca.herokuapp.com/) to access the home page of the API.
- **Database**: PostgreSQL is used to store course data, provided by Heroku as an add-on.
- **Deployment**: Both the API and the database are deployed on Heroku for seamless integration and management of work experience data.

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
  "id": "id",
  "companyname": "Example Farm AB",
  "jobtitle": "Predator Caretaker",
  "location": "Bjurholm",
  "startdate": "2021-05-17",
  "enddate": null,
  "description": "Responsible for developing and maintaining goats and sheep."
}
```
* "id" is not sent when adding a new post.
* "enddate" can be either "null" or a date.
* "description" can be either "null" or a string.

### ER Diagram
   
   | Table: workexperience |
|-----------------------|
| id: SERIAL PK        |
| companyname: VARCHAR(255) NOT NULL |
| jobtitle: VARCHAR(255) NOT NULL |
| location: VARCHAR(255) NOT NULL |
| startdate: DATE NOT NULL      |
| enddate: DATE         |
| description: TEXT     |



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

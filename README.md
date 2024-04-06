# WorkExperienceAPI

## About

This API provides services for managing work experiences. With this API, I can perform various operations such as fetching, adding, updating, and deleting work experiences.
To access the home page for the API, please visit [WorkExperienceAPI](https://jn2307-api-server-8db335f8b5ca.herokuapp.com/).

## Services

Here are the main services provided by the API:

- **GET**: Retrieve all work experiences - [Retrieve Work Experiences](https://jn2307-api-server-8db335f8b5ca.herokuapp.com/get)  
  URI: `https://jn2307-api-server-8db335f8b5ca.herokuapp.com/get`

- **POST**: Add a new work experience  
  URI: `https://jn2307-api-server-8db335f8b5ca.herokuapp.com/post`

- **PUT**: Update an existing work experience  
  URI: `https://jn2307-api-server-8db335f8b5ca.herokuapp.com/put/{id}`  
  (Replace `{id}` with the ID number of the specific work experience)

- **DELETE**: Delete a work experience  
  URI: `https://jn2307-api-server-8db335f8b5ca.herokuapp.com/delete/{id}`  
  (Replace `{id}` with the ID number of the specific work experience)

### Project Structure

The project follows a standard structure for a Node.js application with TypeScript:

- **src/**: Directory containing the source code files.
  - **server.ts**: Main entry point of the application.
- **public/**: Directory containing static assets as CSS and images.
- **views/**: Directory containing EJS templates for rendering HTML.
- **.env**: Configuration file for storing environment variables.  (Not included in the repository for safety reasons)
- **package.json**: File containing metadata and dependencies for the project.
- **tsconfig.json**: TypeScript configuration file specifying compiler options and project settings.
- **.gitignore**: File specifying patterns to be ignored by Git.
- **README.md**: Markdown file containing project documentation.

### Technologies Used

- **VS Code**: Integrated development environment (IDE) used for coding.
- **Heroku**: Cloud platform used for deployment.
- **PostgreSQL**: Relational database management system used for data storage (included in the Heruko platform).
- **Parcel**: Web application bundler used for bundling and serving static assets.
- **TypeScript**: Typed superset of JavaScript used for development.
- **Express**: Web application framework used for building APIs.
- **EJS**: Embedded JavaScript templating language used for generating HTML markup.
- **Dotenv**: Zero-dependency module used for loading environment variables from a `.env` file.
- **CORS**: Node.js package used for enabling CORS with various options.
- **PG**: PostgreSQL client for Node.js used for interfacing with the PostgreSQL database.
- **Node.js**: JavaScript runtime environment used for running the API server.

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

## Contact Information

For questions or support, I know where to find me...

---

&copy; 2024 [joni2307@student.miun.se](mailto:joni2307@student.miun.se) All rights reserved.

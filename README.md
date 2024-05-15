# ts-birthday-sender
a backend app that schedule birthday message delivery and API for managing users

## Using Environment Variables

This project relies on environment variables to be set in a .env file. To set up the necessary environment variables, create a copy of the `.env.example` file and rename it to `.env`. Then, fill in the values for each variable.

## Configuration and Usage

To get started with this project, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine using Git:
``` bash
git clone <repository-url>
```

2. **Install Dependencies**: Use Yarn to install project dependencies:
```bash
yarn install
```

All dependencies, will be installed automatically.

## Swagger Documentation

This project provides Swagger documentation for the API. You can access it using the following endpoints:

- **Swagger JSON**: [http://localhost:3333/swagger](http://localhost:3333/swagger)
- **Swagger UI**: [http://localhost:3333/api-docs](http://localhost:3333/api-docs)
- **Swagger ReDoc**: [http://localhost:3333/](http://localhost:3333/)

The Swagger JSON file (`swagger.json`) contains the API specification, the Swagger UI (`api-docs`) allows for interactive exploration of the API, and Swagger ReDoc (`/`) provides an alternative documentation view.

### Style and Quality Checking

The project is already configured to use Eslint for style and code quality checking.

- To check and format the TypeScrypt code with Eslint, run the following command:
```bash
 yarn lint
```

### Running Express Server and Prisma Migrations
To run the Express server and apply Prisma migrations, follow these steps:

1. **Running the Express Server**: To start the Express server, use the following command:
```bash
yarn dev
```
This command will launch your Express server, allowing you to access your app.

2. **Running Prisma Migrations**: Prisma simplifies database migrations. To create and apply migrations, use the following command:
```bash
yarn prisma migrate dev
```
This command will automatically generate and apply migrations to your database based on your Prisma schema.

With these commands, you can easily run your Express server and manage your database schema using Prisma's migration capabilities.

### Creating a New Schema

To maintain a well-organized codebase, this project has a dedicated folder called "models" where all schemas are separated into individual files. If you need to create a new schema, follow these steps:

1. **Create a New Schema File**:

  - Inside the "models" folder, create a new file for your schema (e.g., `new-schema.prisma`).

2. **Generate Prisma Artifacts**:

  - After creating the new schema file, run the following command to generate Prisma artifacts:

  ```bash
  yarn generate
  ```

  - This command will update the "schema.prisma" file, incorporating your new schema definition.
  - This command will create and apply migrations

By following these steps, you can seamlessly add new schemas to your project while maintaining a clear and organized structure.

### Running Tests

This project is equipped with a comprehensive testing setup that includes both unit and integration tests. You can use the following commands to run different types of tests:

- **Run Unit Tests**:
 - To run unit tests, use the following command:
  ```bash
  yarn test:unit
  ```
 - You can also run unit tests in UI mode with the following command:
  ```bash
  yarn test:unit:ui
  ```

- **Run Integration Tests**:
 - Integration tests are located in the "integration" folder. To run integration tests, use the following command:
  ```bash
  yarn test:int
  ```
 - You can run integration tests in UI mode with the following command:
  ```bash
  yarn test:int:ui
  ```

 - Note: Integration tests include additional setup and can be executed using a custom script located at "./scripts/run-integration.sh." This script allows you to control the test environment and run tests in UI mode when needed.

With these commands, you can thoroughly test your app, ensuring its reliability and functionality.




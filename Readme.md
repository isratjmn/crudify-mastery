# Crudify Mastery

Crudify Mastery Backend Project is a robust data management system, facilitating user, order, and address organization. Powered by MongoDB, it ensures secure data storage and smooth operation, making it an essential tool for efficient application data handling.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- Node.js: [Download and Install Node.js](https://nodejs.org/)
- TypeScript: Install TypeScript globally using the following command:

```bash
  npm install -g typescript
```

# Installing

## Clone the repository:

```bash
  git clone https://github.com/isratjmn/crudify-mastery
```

## Navigate to the project directory:

```bash
  cd crud-mastery
```

## Install the dependencies:

```bash
  npm install
```

## Configuring the Environment Variables

Create a `.env` file in the root of the project and add any necessary environment variables. You can use the provided `.env.example` file as a template.

```bash
    NODE_ENV= development
    PORT= PORT 
    DATABASE_URL= DATABASE_URL
    BCRYPT_SALT_ROUNDS= 8
```

# Usage

## Development Mode

To run the application in development mode with automatic transpilation and server restart:

```bash
  npm run dev
```

This command uses `ts-node-dev` to watch for changes in the `src` directory, transpile TypeScript files, and restart the server.

## Production Mode

To build the project for production:

```bash
  npm run build
```

This command uses the TypeScript compiler `tsc` to transpile the TypeScript code into JavaScript. The compiled code is output to the `dist` directory.

To start the application in production mode:

```bash
  npm start:dev
```

## Code Linting

To lint the code using `ESLint`:

```bash
  npm run lint
```

To automatically fix linting issues:

```bash
  npm run lint:fix
```

## Code Formatting

To format the code using `Prettier`:

```bash
  npm run format
```

To automatically fix formatting issues:

```bash
  npm run format:fix
```

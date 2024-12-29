# `Turborepo` MONOREPO

This is Frontend Monorepo for frontend apps to share common configurations and utilities

### Apps and Packages

- `admin`: admin application
- `app`: main fe app
- `@repo/ui`: styles/configs, shared by both `admin` and `app` applications
- `@repo/eslint-config`: shared `eslint` configurations
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

This is a responsive web application built using Vite and TypeScript. Follow the steps below to set up and explore the app.

## Getting Started
### Clone the Repository
Clone the repository to your local machine:

```
git clone git@github.com:snakecharmergh/lingo-hub.git
```
### Run the App Locally: 
Navigate to the project directory:

```
cd vite-ts-app
```

### Install dependencies:

```
npm install
```

### Start the development server:

```
npm run dev
```

Once the server is running, open your browser and go to http://localhost:3000 (or the port specified in your terminal). You should be directed to the homepage of the app.
[Screenshot at 2024-12-01 14-11-57](https://github.com/user-attachments/assets/2a4a33cc-410a-4152-8699-dd72bc49646c)

### Required Dependencies:
All required dependencies are included in the package.json file and will be installed automatically when you run npm install. However, for reference, the project uses the following dependencies:

````
```
Axios
React Bootstrap
React DOM
React Markdown
React Router DOM
React Select
UUID
```
````

To install any additional dependencies manually, use the corresponding commands:


```
npm i <dependency-name>
```

### App Features:  
Explore the follwoing different features of the app:

````
```
- Tags are appended to each memo 
- Filtering memos through tags & titles
- Creating new memos
- Choosing from existing tags or creating new tags
- Editing & deleting existing Tags 
- Editing & deleting existing  memos
- Accessing other resources
- Responsive Design
```
````


### nodejs-typescript

# NodeJS project using Typescript

## Step 1 — Initializing the Project

$ mkdir node_project
$ cd node_project

Next, initialize it as an npm project:
$ npm init -y

The -y flag tells npm init to automatically say “yes” to the defaults. You can always update this information later in your package.json file.

## Step 2 — Configuring the TypeScript Compiler

$ npm install --save-dev typescript

Now npm project is initialized, it is ready to install and set up TypeScript.
Run the following command from inside your project directory to install the TypeScript:

$ npm install --save-dev typescript

Output
added 1 package, and audited 2 packages in 1s

found 0 vulnerabilities

$ nano tsconfig.json

Then paste in the following JSON:

{
"compilerOptions": {
"module": "commonjs",
"esModuleInterop": true,
"target": "es6",
"moduleResolution": "node",
"sourceMap": true,
"outDir": "dist"
},
"lib": ["es2015"]
}

## Step 3 — Creating a Minimal TypeScript Express Server

Now, it is time to install the Express framework and create a minimal server:
$ npm install --save express@4.17.1
$ npm install -save-dev @types/express@4.17.1

Next, create a src folder in the root of your project directory:

$ mkdir src

## Nano Installation

you can install nano if not installed

The easiest way to install the Nano text editor on Windows is to go through Chocolatey.

Open a PowerShell command prompt as administrator.

If you don’t have chocolatey installed, enter this command to install it:

Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
Now to install Nano, enter the command:

choco install nano -y

Create App.ts file using nano

$ nano src/app.ts

Open up the app.ts file with a text editor of your choice and paste in the following code snippet:

import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
res.send('Hello World!');
});

app.listen(port, () => {
return console.log(`Express is listening at http://localhost:${port}`);
});

The code above creates a Node Server that listens on the port 3000 for requests. To run the app, you first need to compile it to JavaScript using the following command:
$ npx tsc

This uses the configuration file we created in the previous step to determine how to compile the code and where to place the result. In our case, the JavaScript is output to the dist directory.

Run the JavaScript output with node:
$ node dist/app.js

OutputExpress is listening at http://localhost:3000

## Step 4 — Configuring Typescript Linting with eslin

$ npm install --save-dev eslint

Then, run eslint’s initialization command to interactively set up the project:

$ npm init @eslint/config@latest

Finally, you will be prompted to install some additional eslint libraries. Choose Yes. The process will finish and you’ll be left with the following configuration file:

module.exports = {
env: {
es2021: true,
node: true,
},
extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
parser: '@typescript-eslint/parser',
parserOptions: {
ecmaVersion: 13,
sourceType: 'module',
},
plugins: ['@typescript-eslint'],
rules: {},
}

Run the linter to check all files with the .ts TypeScript extension:
$ npx eslint . --ext .ts

## Step 5 — Updating the package.json File

Open the package.json file and update it accordingly:

{
"name": "nodejs-typescript",
"version": "1.0.0",
"description": "NodeJS project with Typescript",
"keywords": [],
"author": "",
"license": "ISC",
"main": "dist/app.js",
"scripts": {
"start": "tsc && node dist/app.js",
"lint": "eslint . --ext .ts",
"test": "echo \"Error: no test specified\" && exit 1"
},
"dependencies": {
"express": "4.21.1"
},
"devDependencies": {
"typescript": "^5.7.2",
"@types/express": "^5.0.0"
}
}

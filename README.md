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

### Create App.ts file using nano

$ nano src/app.ts

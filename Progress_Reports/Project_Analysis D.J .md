# Project Analysis

## Setup Instructions

1. Open VS Code.
2. Clone the repository into an empty folder using: `git clone <URL>`
3. Navigate to the frontend directory: `cd frontend`
4. Run `npm install` to install all frontend dependencies.
5. Navigate to the backend directory: `cd backend`
6. Run `npm install` to install all backend dependencies.
7. Once completed, your environment is ready.

Installing in the wrong place  
Running npm install at the project root instead of inside the dedicated frontend or backend folders often leads to missing dependencies or “no package.json found” errors. Always double‑check you’re in the correct directory before installing.

Mixing package managers  
Switching between npm, yarn, or pnpm can create mismatched lockfiles and dependency conflicts. Stick to one package manager consistently. The team is currently standardizing on npm, with improvements being rolled out in upcoming commits from Ben.

Version mismatches  
Node.js or dependency versions that differ from the ones specified in the project can cause subtle runtime errors. Using a version manager (like nvm) to align with the project’s .nvmrc or documentation helps avoid this.

Technology Overview
Next.js  
A powerful React‑based meta‑framework that blends Server‑Side Rendering (SSR), Static Site Generation (SSG), and Client‑Side Rendering (CSR). It improves SEO, speeds up initial page loads, and provides a unified developer experience for both frontend and backend logic.

Tailwind CSS  
A utility‑first styling framework that lets developers compose designs directly in the markup using class names. This reduces the need for separate CSS files, accelerates prototyping, and ensures consistent styling across components.

TypeScript  
A strongly typed superset of JavaScript that introduces compile‑time type checking. It helps catch bugs early, improves code readability, and makes refactoring safer. Its syntax feels familiar to developers coming from languages like Java or C#.

Drizzle ORM  
A lightweight Object‑Relational Mapper chosen for its speed and simplicity when working with PostgreSQL. It provides type‑safe queries and schema management, serving as a leaner alternative to Prisma while still offering modern developer ergonomics.




Spreadsheet Application
A Next.js application that mimics the functionality of a spreadsheet with advanced features, styled with Tailwind CSS, and state management handled by Zustand.

Features
Grid Rendering: Renders a grid of cells.
Cell Editing: Allows editing of cell values with support for text, numbers, and multi-line text.
Cell Formatting: Supports text alignment and font size adjustments.
Data Validation: Includes basic data validation rules.
Search and Filter: Quickly locate specific data within the grid.
Pagination/Infinite Scrolling: Efficiently handles large datasets.
Undo/Redo: Revert changes made to cells.
Responsive Design: Fully responsive layout using Tailwind CSS.
Dependencies
The following dependencies are used in this project:

Next.js: Framework for server-rendered React applications.
Tailwind CSS: Utility-first CSS framework for styling.
Zustand: State management library for React.
react-window: Virtualization library for efficiently rendering large lists and grids.
Development Dependencies
eslint: Linter for JavaScript/TypeScript.
prettier: Code formatter.
jest: Testing framework.
@testing-library/react: Testing utilities for React.
Installation
Clone the Repository

bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
Install Dependencies
npm i to install node_module

bash
npm install
Running the Application
Start the Development Server

bash
npm run dev
Navigate to http://localhost:3000 in your browser to view the application.

Build the Application for Production

bash
npm run build
Start the Production Server

bash
npm start
Navigate to http://localhost:3000 to view the production build.

Available Scripts
npm run dev: Starts the development server with hot reloading.
npm run build: Builds the application for production.
npm start: Starts the production server.
npm test: Runs tests.
npm run format: Formats code using Prettier.
npm run lint: Lints code using ESLint.
Usage
Editing Cells: Click on a cell to edit its value. Press Enter to save changes and move to the next cell.
Searching: Use the search bar to filter cells based on their content.
Cell Formatting: Use the formatting controls to adjust text alignment and font size.
Contributing
Fork the Repository: Create a personal copy of the repository.


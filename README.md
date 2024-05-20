# sudoku-gamepage

This is a simple web-based Sudoku game created as a final project for an introductory web development course.

## Summary

The Sudoku Game project aims to create an interactive and user-friendly web application for playing Sudoku. This project demonstrates the use of HTML, CSS, and JavaScript to build a complete and functional game, showcasing web development skills acquired during the course.

## Table of Contents

- [Summary](#summary)
- [Preparation](#preparation)
- [Form](#form)
- [Function](#function)
- [Installation](#installation)
- [Usage](#usage)
- [File Overview](#file-overview)
- [License](#license)

## Preparation

### Project Planning

The planning phase involved outlining the core features and functionalities of the Sudoku game. The primary focus was on creating a clean and responsive design, intuitive user interactions, and implementing the game logic in JavaScript.

### Technology Stack

- **HTML**: Structure of the web pages.
- **CSS**: Styling and layout of the game.
- **JavaScript**: Game logic and interactivity.

### Design Considerations

The design aimed to provide a clear and engaging user interface, with a focus on accessibility and ease of use.

## Form

### User Interface

The user interface was designed to be simple and clean, allowing users to focus on the game.

### Styling

Custom fonts and styles were used to enhance the visual appeal of the game. The styling was done using both CSS and inline styles within the HTML.

## Function

### Game Logic

The game logic was implemented in JavaScript, including:

- Generation of a valid Sudoku puzzle, for the selected difficulty level.
- Checking user inputs for correctness.
- Providing feedback on errors.

### Interaction

Users can interact with the game by clicking on cells to enter numbers. The game checks for mistakes and provides immediate feedback.

## Installation

To run the Sudoku game locally:

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/sudoku-game.git
   ```
2. Navigate to the project directory:
   ```sh
   cd sudoku-game
   ```
3. Open `index.html` in your web browser.

## Usage

Open `index.html` in a web browser to start playing the game. Ensure that all associated files (CSS, JavaScript, fonts, and images) are in the correct directories.

## File Overview

- **index.html**: The main HTML file.
- **css/**: Contains all CSS files.
  - `mainStyle.css`: Main stylesheet for general styling.
  - `sudokuStyle.css`: Styles specific to the Sudoku board.
- **js/**: Contains all JavaScript files.
  - `index.js`: Main JavaScript file to handle the game logic.
  - `sudoku.js`: Additional JavaScript functions specific to the Sudoku game.
- **assets/**: Contains non-code assets like fonts and images.
  - **fonts/**: Contains custom fonts.
    - `Sixtyfour-Regular-VariableFont_BLED,SCAN.ttf`: Custom font used in the project.
  - **images/**: Contains images used in the project.
    - `Sudoku_trans.png`: Image asset used in the project.
- **tests/**: Contains test files.
  - `tests.txt`: Basic tests for game functionality.

## License

This project is open-source and available under the MIT License.

## Detailed Report

For a comprehensive project report, including detailed descriptions of each phase and design decisions, please refer to [PROJECT_REPORT.md](./PROJECT_REPORT.md).

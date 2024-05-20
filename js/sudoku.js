// Generates and manages a Sudoku game interface.
// Upon loading, it retrieves the difficulty level from the URL parameters
// Initializes the game board based on the selected difficulty.
// It provides functions for generating a Sudoku board, removing numbers based on difficulty, and checking the validity and completion of the Sudoku.
// It handles user interaction with the Sudoku grid, allowing users to input values and validating their input.

document.addEventListener("DOMContentLoaded", function () {
  // Retrieve the selected difficulty from localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const difficulty = urlParams.get("difficulty");
  console.log("Received Difficulty:", difficulty);
  removeProbability = selectedDifficulty(difficulty);
  // Reload the window
  document
    .getElementById("refreshButton")
    .addEventListener("click", function () {
      location.reload();
    });

  // Redirect to the home page
  document.getElementById("homeButton").addEventListener("click", function () {
    window.location.href = "index.html";
  });
  var sud = emptySudoku();
  generate(sud);
  removeNumbers(sud, removeProbability);
  init(sud);
});
function selectedDifficulty(difficulty) {
  switch (difficulty) {
    case "Easy":
      return 0.25;

    case "Medium":
      return 0.4;

    case "Hard":
      return 0.55;

    case "Expert":
      return 0.7;
    default:
      break;
  }
}
// Return an empty sudoku
function emptySudoku() {
  return [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
}

// Convert an array of arrays to a string keeping track of the inner
// arrays.
function arrayToString(arr) {
  var arrStr = "";
  for (row of arr) {
    // loop over each row (array) in 2D-array
    arrStr += "[" + row + "]<br>";
  }
  return arrStr;
}

// Compute all 27 blocks of a sudoku. Returns all 9 rows, 9 cols and 9
// 3x3 blocks
function blocks(sud) {
  var colBlock = emptySudoku();
  var boxBlock = emptySudoku();

  // rows
  var rowBlock = sud;

  // cols
  for (var i = 0; i < sud.length; i++) {
    for (var j = 0; j < sud.length; j++) {
      colBlock[i][j] = sud[j][i];
    }
  }

  /* We go through all 9, 3x3 "boxes", and put all the elements from the box,
    in an array of 9 elements so that we get a 9x9 array.
    Indices for sud is "block-wise" and indices for boxBlock is "array-wise".
    */

  for (var lc = 0; lc < sud.length; lc += 3) {
    // lc = large col := 3 cols
    for (var lr = 0; lr < sud.length; lr += 3) {
      // lr = large row := 3 rows
      for (var r = 0; r < 3; r++) {
        // row
        for (var c = 0; c < 3; c++) {
          // col
          boxBlock[lr / 3 + lc][r * 3 + c] = sud[r + lr][c + lc];
        }
      }
    }
  }

  return rowBlock.concat(colBlock).concat(boxBlock);
}

// Check that a block is valid (i.e. that it contains no duplicate
// number 1-9, but multiple 0 is fine).
function isValidBlock(b) {
  var sortedArr = b.slice().sort(); // slice() for copy.

  for (var i = 1; i < b.length; i++) {
    if (
      sortedArr[i] != 0 &&
      sortedArr[i] != "" &&
      sortedArr[i - 1] == sortedArr[i]
    ) {
      return false;
    }
  }
  return true;
}

// Check that a sudoku is valid by checking that all of its blocks are
// valid.
function isValid(sud) {
  for (var block of blocks(sud)) {
    // for block in all blocks
    if (!isValidBlock(block)) {
      return false;
    }
  }
  return true;
}

// Check if a sudoku is solved by checking that there are no zeroes
// and that it is valid.
function isSolved(sud) {
  if (isValid(sud)) {
    // check valid for all blocks
    for (var row of sud) {
      if (row.includes("") || row.includes(0)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

// Generating Sudoku board using backtracking
function generate(sud) {
  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      if (sud[row][col] === 0) {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const nums = array.sort(() => Math.random() - 0.5);
        for (var num of nums) {
          sud[row][col] = num;
          if (isValid(sud)) {
            if (generate(sud)) {
              return true;
            }
          } else {
            sud[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Remove numbers from the board by setting cells to 0, based on chosen difficulty
function removeNumbers(board, removeProbability) {
  for (var r = 0; r < board.length; r++) {
    for (var c = 0; c < board.length; c++) {
      if (Math.random() < removeProbability) {
        board[r][c] = 0;
      }
    }
  }
}

// Draw the start sudoku
function init(sud) {
  var cellId;
  for (var r = 0; r < sud.length; r++) {
    for (var c = 0; c < sud.length; c++) {
      cellId = "c" + r + "x" + c;
      if (sud[r][c] != 0) {
        document.getElementById(cellId).innerHTML = sud[r][c];
        document.getElementById(cellId).style.backgroundColor = "#eabe6c";
      } else {
        document.getElementById(cellId).innerHTML = "";
        document.getElementById(cellId).onclick = klick;
      }
    }
  }
}

// What to do when the user clicks on a tile (not called "click"
// because that caused some problems with some browsers)
function klick() {
  /*
    This implementation of klick() attempts to convert the input to numbers in the following way: 
    For example 01 and '`space`1' is converted to 1 and 3.0 is converted to 3.
    If an input is valid for a cell and you want to change it you have to enter another valid value.
    To completely erase the cell, you can enter a number (1-9) that is not valid for that cell.
    NOTE: You cannot change the value of a cell (if it already has a value) with a completely invalid entry, 
    Example: typing "asd", "" or the cancel button does nothing.
    This is my interpretation of the task description.
    */
  var validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var userInput = prompt("Enter a value (1-9): ");

  // if cancel button of promt is pressed or the input is empty
  if (userInput === null || userInput == "") {
    return;
  } else if (isNaN(Number(userInput))) {
    // No possible conversion to a number.
    alert(
      "Could not interpret '" + userInput + "' as a number.\nPlease try again!"
    );
    return;
  } else if (!validValues.includes(Number(userInput))) {
    // could convert to number but it's not valid
    alert(
      "You wrote: " +
        userInput +
        ".\nIt was interpreted as '" +
        Number(userInput) +
        "' which is not a valid input.\nIn Sudoku you are supposed to write a number between 1-9." +
        "\nPlease try again!"
    );
    return;
  } else {
    document.getElementById(this.id).innerHTML = Number(userInput);
    var currentSud = getSudoku();
    if (!isValid(currentSud)) {
      document.getElementById(this.id).innerHTML = "";
      alert(
        "That is not a valid position in the Sudoku for the number: " +
          userInput +
          ".\nPlease try again!"
      );
    } else {
      if (isSolved(currentSud)) {
        alert("Congratulations! You have solved the Sudoku!");
        init(currentSud); // To get colors and remove onclick attribue
      }
    }
  }
}

// Fetch the current sudoku
function getSudoku() {
  var currentSud = emptySudoku();
  var cellId;
  for (var row = 0; row < currentSud.length; row++) {
    for (col = 0; col < currentSud.length; col++) {
      cellId = "c" + row + "x" + col;
      currentSud[row][col] = document.getElementById(cellId).innerHTML;
    }
  }

  return currentSud;
}

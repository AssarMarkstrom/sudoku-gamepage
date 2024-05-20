document.addEventListener("DOMContentLoaded", function () {
  // redirect to sudokupage if difficulty has been selected otherwise flash
  document.getElementById("start-btn").addEventListener("click", function () {
    const selectedDifficulty = document.querySelector(
      ".difficulty-btn.selected"
    );
    if (selectedDifficulty) {
      setTimeout(function () {
        window.location.href =
          "solveSudoku.html?difficulty=" +
          encodeURIComponent(selectedDifficulty.textContent.trim());
      }, 100);
    } else {
      const difficultyBtns = document.querySelectorAll(".difficulty-btn");
      difficultyBtns.forEach((btn) => {
        btn.classList.add("flashing");
        setTimeout(() => {
          btn.classList.remove("flashing");
        }, 500);
      });
    }
  });

  const difficultyBtns = document.querySelectorAll(".difficulty-btn");
  difficultyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      difficultyBtns.forEach((btn) => btn.classList.remove("selected"));
      btn.classList.add("selected");
    });
  });
});

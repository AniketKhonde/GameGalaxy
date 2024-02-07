$(document).ready(function() {
    var wordsWithHints = [
      { word: "Instagram", hint: "A social media platform." },
      { word: "javascript", hint: "A programming language for the web." },
      { word: "programming", hint: "The act of writing computer programs." },
      { word: "virat kohlu", hint: "An Indian batsman." },
      { word: "Bacglore", hint: "A tech city." },
      { word: "bmw", hint: "A car brand." },
      { word: "dog", hint: "An animal." },
      { word: "nepal", hint: "A neighbour country of India." },
      { word: "Akshay kumar", hint: "An actor." }
    ];

    var currentWordIndex = 0;
    var currentWord = "";
    var currentHint = "";
    var guessedLetters = [];
    var lives = 5;

    function startNewGame() {
      currentWord = wordsWithHints[currentWordIndex].word.toLowerCase();
      currentHint = wordsWithHints[currentWordIndex].hint;
      guessedLetters = [];
      lives = 5;
      updateWordDisplay();
      updateHint();
      updateLifeCounter();
      renderAlphabetButtons();
    }

    function updateWordDisplay() {
      var displayedWord = "";
      for (var i = 0; i < currentWord.length; i++) {
        if (guessedLetters.includes(currentWord[i])) {
          displayedWord += `<span class="correct-letter">${currentWord[i]}</span> `;
        } else {
          displayedWord += "_ ";
        }
      }
      $("#word-display").html(displayedWord.trim());
    }

    function updateHint() {
      $("#hint").text("Hint: " + currentHint);
    }

    function updateLifeCounter() {
      $("#life-counter").text("Lives: " + lives);
    }

    function renderAlphabetButtons() {
      $("#alphabet-buttons").empty();
      for (var i = 97; i <= 122; i++) {
        var letter = String.fromCharCode(i);
        var button = $("<button>").text(letter.toUpperCase()).click(function() {
          guessLetter($(this).text().toLowerCase());
        });
        $("#alphabet-buttons").append(button);
      }
    }

    function guessLetter(letter) {
      if (!guessedLetters.includes(letter)) {
        guessedLetters.push(letter);

        if (currentWord.includes(letter)) {
          // Correct guess
          $(".correct-letter:contains('" + letter + "')").addClass("correct-letter");
        } else {
          // Incorrect guess
          lives--;
          updateLifeCounter();
        }

        updateWordDisplay();
        checkGameStatus();

        if (letter.toUpperCase() !== "Next") {
          $(`button:contains('${letter.toUpperCase()}')`).addClass("incorrect-letter").prop("disabled", true);
        }

        if (lives === 0) {
          Swal.fire({
          title: 'Game Over !',
          text: "You ran out of lives. The correct word was: " + currentWord,
          icon: 'info',
          confirmButtonText: 'OK'
          });
          goToNextWord();
        }
      }
    }

    function checkGameStatus() {
      if (currentWord.split("").every(letter => guessedLetters.includes(letter))) {
        Swal.fire({
        title: 'Success !',
        icon: 'success',
        text: 'you are smart!',
        confirmButtonText: 'OK'
        });
        goToNextWord();
      }
    }

    function goToNextWord() {
      // Reset button styles
      $("button").removeClass("incorrect-letter").prop("disabled", false);
      currentWordIndex = (currentWordIndex + 1) % wordsWithHints.length;
      startNewGame();
    }

    $("#next-button").click(function() {
      goToNextWord();
    });

    // Start the first game
    startNewGame();
  });
  function goHome(){
      window.location.href="../html/index.html";
    }
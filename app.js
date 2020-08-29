var score = 0;  // score counter
var timer;  // timer shows time
var progress = 0; // for progression bar
var attemp = 0; // attemp counter
var sec; // second counter
var timeInterval; // time interval for game over
var level = 0; // level counter
var spelling = 2; // spelling counter
var progressionNumber = 2; // progression counter

// increase when player click on right spelling and decrease when player choose wrong spelling 
var count = 0;

var spell = []; // store spell's fetched info from html


// Animation names
var animationName = ["one", "two", "three", "four", "five", "six"];

var animationIndex = []; // Animation index array

// Color code for background of speliing
var colorCode = [
  "#B20A0A",
  "#B2320A",
  "#B25B0A",
  "#B2790A",
  "#AFB20A",
  "#86B20A",
  "#40B20A",
  "#0AB21B",
  "#0AB24D",
  "#0AB276",
  "#0AB2A8",
  "#0A8AB2",
  "#0A4DB2",
  "#0A11B2",
  "#5E0AB2",
  "#7C0AB2",
  "#B20AA1",
  "#B20A3C",
  "#B20A14",
];

// Correct words array
var correctWord = [
  "cat",
  "dog",
  "bat",
  "watch",
  "size",
  "night",
  "high",
  "next",
  "Choose",
  "easier",
  "active",
  "creativity",
  "People",
  "childhood",
  "something",
  "congratulations",
  "Literally",
  "language",
  "vocabulary",
  "Hardest",
  "Renouncing",
  "combinations",
  "learners",
  "Finding",
  "probably",
  "pronounce",
  "tough",
  "prose",
  "difficult",
  "ideas",
  "Explore",
  "perplexing",
  "attempt",
  "google",
  "where",
  "board",
  "networth",
  "plus",
  "sunset",
  "keyboard",
  "level",
  "elephant",
  "one",
  "nuclear",
  "amazon",
  "microsoft",
  "facebook",
  "accept",
  "machine",
  "superman",
  "computer",
  "door",
  "mobile",
  "mouse",
  "bottle",
  "button",
  "number",
  "windows",
  "screen",
  "recorder",
  "screenshot",
  "supply",
  "textile",
  "mango",
  "capslock",
  "backspace",
  "center"
];

// wrong words array
var wrongWord = [
  "dag",
  "woht",
  "nxet",
  "baord",
  "plas",
  "netwarth",
  "braek",
  "goolge",
  "disble",
  "eigth",
  "controvercy",
  "sunries",
  "suncet",
  "congratolations",
  "keybaord",
  "elephante",
  "accepte",
  "levle",
  "nuetrition",
  "microsuft",
  "amozan",
  "raedy",
  "conditionre",
  "instently",
  "langueges",
  "Transalate",
  "serevice",
  "femiliar",
  "machin",
  "Hihlight",
  "multinatinal",
  "mobiale",
  "typicaly",
  "knowldge",
  "aodience",
  "genrate",
  "specyfic",
  "millioner",
  "billioner",
  "cuntains",
  "alphabatical",
  "senetence",
  "referance",
  "seperated",
  "regulerly",
  "alternat",
  "installtion",
  "prodactive",
  "infonmation",
  "pupolar",
  "Managment",
  "Nueclear",
  "chemicale",
  "involv",
  "atomiq",
  "electrisity",
  "recyling",
  "satllite",
  "terretories",
  "relationsips",
  "inserttion",
  "alraedy",
  "arived",
  "visaul",
  "mornning",
  "winndow",
  "ligth",
  "lentgh",
  "height",
  "elevon",
  "notbook",
  "chargar",
  "perfum",
  "screeshot",
  "purpel",
  "yellew",
  "suprme",
  "andriod",
];

var correctWordIndex = []; // save index numbers which has already arrived from correctWord.
var wrongWordIndex = []; // save index numbers which has already arrived from wrongWord.

// var spell1;
// var spell2;

var startBtn = document.getElementById("start-btn"); // start button
var gameDisplay = document.getElementById("game-display"); // game display

// default screen includes rule box, completion of level and game over screen
var defaultDisplay = document.getElementById("default-display");

var ruleBox = document.getElementById("rule-box"); // rules box
var nextLevel = document.getElementById("next-level"); // completion of level screen
var comment = document.getElementById("comment"); // comment like GAME OVER
var message = document.getElementById("message"); // message like BAD LUCK
var finalScore = document.getElementById("final-score"); // final score message
var scores = document.getElementById("score"); // score board
var levels = document.getElementById("level"); // level board
var progressIncreaser = document.getElementById("progress"); // progress bar

startBtn.addEventListener("click", startGame); // when click on start button
gameDisplay.display = "none"; // by default game display is not shows

// Start Game function
function startGame() {
  gameDisplay.style.display = "block";
  defaultDisplay.style.display = "none";

  progress = 0;
  progressIncreaser.style.width = "0%";

  level++;
  attemp = 0;
  count = 0;
  levels.innerHTML = level;

  timerDecreser();
  numberOfSpellings();
  numberOfProgression();
  spellingGenerator();
  loadIds();

  // for rebuild spellings or avoid game crash
  if (level % 2 == 0) {
    wrongWordIndex.length = 0;
  } else if (level % 5 == 0) {
    correctWordIndex.length = 0;
  }
}

// Spelling Genrator
function spellingGenerator() {
  count++;
  var id = 1; // for wrong spellings id
  var right;

  // Right spelling generate and store index of spell into "correctWordIndex"
  while (true) {
    right = randomWord(1);
    if (!correctWordIndex.includes(right[1])) {
      correctWordIndex.push(right[1]);
      break;
    }
  }

  // html code generate for right spelling
  let rightHTML = `<div>
    <h2 class="box-shadow" id="spell1">${right[0]}</h2>
</div>\n`;

  id++;
  var wrongs = [];
  var wrong;
  var wrongHTML = ``;

  for (let i = 0; i < spelling - 1; i++) {
    // wrong spelling generate and store index of spell into "wrongWordIndex"
    // and store spelling in to "wrongs" 
    while (true) {
      wrong = randomWord(0);
      if (!wrongWordIndex.includes(wrong[1])) {
        wrongWordIndex.push(wrong[1]);
        wrongs.push(wrong[0]);
        break;
      }
    }

    // html code generate for wrong spelling
    wrongHTML += `<div>
    <h2 class="box-shadow" id="spell${id}">${wrong[0]}</h2>
</div>\n`;
    id++;
  }

  // right and wrong spelling's code pass to in html
  gameDisplay.innerHTML = wrongHTML + rightHTML;
}

//  Load ids of spellings
function loadIds() {
  spell.length = 0;
  var animationValue; // store name of animation

  // background color, position, click event, animation and animation time generator for each spelling
  for (let i = 0; i < spelling; i++) {
    spell[i] = document.getElementById("spell" + (i + 1));
    spell[i].addEventListener("click", () => spellChecker(spell[i].id));
    spell[i].style.position = "relative";
    spell[i].style.backgroundColor =
      colorCode[Math.floor(Math.random() * colorCode.length)];

    // for avoid game crash
    if (i % 6 == 0) {
      animationIndex.length = 0;
    }

    // animation name generator and store its index in to "animationIndex"
    while (true) {
      animationValue = randomWord(-1);
      if (!animationIndex.includes(animationValue[1])) {
        animationIndex.push(animationValue[1]);
        break;
      }
    }

    spell[i].style.animation = animationValue[0];
    spell[i].style.animationDuration = "16s";
  }
  attemp = 0; // for restart score point
}

// Function for check spell is currect or wrong
function spellChecker(name) {
  attemp++;

  // take id of spell and if it is 1 then spell is right otherwise it is wrong
  if (name.slice(-1) == 1) {
    scoreIncrease();
    progress += 100 / progressionNumber;

    // For right spelling background color change in success color "#00FF19"
    document.getElementById(name).style.backgroundColor = "#00FF19";

    // after half second new spell generator for better user experience
    setTimeout(() => {
      if (count != progressionNumber) {
        spellingGenerator();
        loadIds();
      }
    }, 500);
    progressBar(1); // for increasing progress bar
    clearInterval(timeInterval); // clear timer
    timerDecreser(); // restart timer
  } else {
    progress -= 100 / progressionNumber;

    // For right spelling background color change in failiur color "#FF4141"
    document.getElementById(name).style.backgroundColor = "#FF4141";

    // after 0.2 second background color automatically change for increasing difficulty
    setTimeout(() => {
      document.getElementById(name).style.backgroundColor =
        colorCode[Math.floor(Math.random() * colorCode.length)];
    }, 200);

    progressBar(-1); // for decreasing progress bar
    count--;
  }
}

// Score Increaser
function scoreIncrease() {
  if (attemp == 1) {
    score += 10;
  } else if (attemp == 2) {
    score += 5;
  } else {
    score += 2;
  }

  scores.innerHTML = score; // update score board
}

// Timer
function timerDecreser() {
  timer = document.getElementById("timer");
  sec = 15;

  // timer for 15 seconds
  timeInterval = setInterval(() => {
    timer.innerHTML = sec;
    sec--;

    if (sec == -1) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}

// Random word
function randomWord(type) {

  // Correct word generator
  if (type == 1) {
    let index = Math.floor(Math.random() * correctWord.length);
    return [correctWord[index], index];
  }
  // Wrong word generator
  else if (type == 0) {
    let index = Math.floor(Math.random() * wrongWord.length);
    return [wrongWord[index], index];
  }
  // Animation generator
  else {
    let index = Math.floor(Math.random() * animationName.length);
    return [animationName[index], index];
  }
}

// Progress Bar
function progressBar(mode) {
  // Progress bar animation
  let animation = setInterval(progression, 22);

  function progression() {
    // when progress bar reach to end point
    if (progressIncreaser.style.width == progress + "%") {
      clearInterval(animation);
      // when progress bar reached to 100%
      if (progressIncreaser.style.width == "100%") {
        progressIncreaser.style.borderRadius = 0 + "px";
      } else {
        progressIncreaser.style.borderRadius = "0px 10px 10px 0px";
      }
    }
    else {
      // for 0% progress bar
      if (progressIncreaser.style.width == "") {
        progressIncreaser.style.width = "0%";
      }
      // for increasing progress bar
      else if (mode == 1) {
        let i = parseInt(progressIncreaser.style.width.slice(0, -1));
        progressIncreaser.style.width = ++i + "%";
        if (i == 100) {
          completeLevel();
        }
      }
      // for decreasing progress bar
      else {
        if (progressIncreaser.style.width == "0%") {
          clearInterval(animation);
          progress = 0;
          gameOver();
        } else {
          let i = parseInt(progressIncreaser.style.width.slice(0, -1));
          progressIncreaser.style.width = --i + "%";
        }
      }
    }
  }
}

// Game Over
function gameOver() {
  gameDisplay.style.display = "none";
  defaultDisplay.style.display = "block";
  ruleBox.style.display = "none";
  nextLevel.style.display = "block";

  comment.innerHTML = "Game Over";
  message.innerHTML = "Bad luck";
  finalScore.innerHTML = "score " + score;
  scores.innerHTML = 0;

  startBtn.innerHTML = "Try Again";

  level = 0;
  progress = 0;
  score = 0;
  correctWordIndex.length = 0;
  wrongWordIndex.length = 0;
  progressIncreaser.style.width = "0%";

  clearInterval(timeInterval);
  timer.innerHTML = 0;
}

// Complete Level

function completeLevel() {
  gameDisplay.style.display = "none";
  defaultDisplay.style.display = "block";
  ruleBox.style.display = "none";
  nextLevel.style.display = "block";

  comment.innerHTML = "Congratulations";
  message.innerHTML = "level Completed";
  finalScore.innerHTML = "score " + score;
  startBtn.innerHTML = "Next Level";

  clearInterval(timeInterval);
  timer.innerHTML = 0;
}

// Number of Spelling
function numberOfSpellings() {
  spelling = 2;
  let flag = 0;
  for (let i = 2; i <= level; i++) {
    flag = 0;
    for (let j = 2; j < i; j++) {
      if (i % j == 0) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      spelling++;
    }
  }
}

// Number of progression
function numberOfProgression() {
  progressionNumber = 2;
  let cnt = 0;
  let flag = 0;
  for (let i = 2; i <= level; i++) {
    flag = 0;
    for (let j = 2; j < i; j++) {
      if (i % j == 0) {
        flag = 1;
        break;
      }
    }
    if (flag == 0) {
      cnt++;
      if (cnt == 3) {
        cnt = 0;
        while (true) {
          progressionNumber++;
          if (100 % progressionNumber == 0) {
            break;
          }
        }
      }
    }
  }
}

// SPAN of btn to start the game
let mySpan = document.querySelector(".con-butns span");
// span of game over
let myOvr = document.querySelector(".A2");
let myOvrS = document.querySelector(".A2 span");
// span of the name
let mySpanb = document.querySelector(".Name span");
// span of time
let myTimer = document.querySelector(".timer span");

// function to satrt the game
mySpan.onclick = function () {
  // prompt to write the name on it
  let yourName = prompt("What's Your Name ??");
  // condtion for empty prompt
  if (yourName == null || yourName == "") {
    mySpanb.innerHTML = "Unknown";
  } else {
    mySpanb.innerHTML = yourName;
  }
  // remove splsh screen
  document.querySelector(".con-butns").remove();
  // the timer
  let counter = setInterval(() => {
    myTimer.innerHTML = parseInt(myTimer.innerHTML) - 1;
    // if the time is over then the game is over
    if (myTimer.innerHTML === "0") {
      clearInterval(counter);
      myOvr.classList.add("Game-over");
      // reload button
      myOvrS.onclick = () => window.location.reload();
      // gameover tone
      document.getElementById("GO").play();
    } else if (document.querySelector(".cor-t").innerHTML === "10") {
      clearInterval(counter);
    }
  }, 1000);

  setInterval(() => {
    document.getElementById("luf").play();
  }, 30000);
};
// time for turn
let duration = 1000;
// blocks box
let blocksCon = document.querySelector(".MG-Blocks");
// blocks
let blocks = Array.from(blocksCon.children);
// orderRange for blocks
let orderRange = [...Array(blocks.length).keys()];
// RUN shuffle function
shuffle(orderRange);
// Actvite blocks
blocks.forEach((block, indix) => {
  // every block take random num
  block.style.order = orderRange[indix];
  // Add click event
  block.addEventListener("click", () => {
    // trigger the flip block function
    flipBlock(block);
  });
});
// shffule function
function shuffle(array) {
  // settings vars
  let current = array.length;
  let temp;
  let random;
  while (current > 0) {
    // get random element
    random = Math.floor(Math.random() * current);
    // decrease length by one
    current--;
    // [1] save current element in stach
    temp = array[current];
    // [2] current Element = random Element
    array[current] = array[random];
    // [3] random Element = get Element from stach
    array[random] = temp;
  }
  return array;
}
// Flip block function
function flipBlock(selectedBlock) {
  // Add class is-fliped
  selectedBlock.classList.add("is-flipped");
  // collect All Flipped Cards
  let allFlippedCards = blocks.filter((flippedBlocks) =>
    flippedBlocks.classList.contains("is-flipped")
  );
  // if there two selcted blocks
  if (allFlippedCards.length === 2) {
    // stop clicking function
    stopClicking();
    // check function
    checkMatchedB(allFlippedCards[0], allFlippedCards[1]);
  }
}
// stop clicking function
function stopClicking() {
  // Add class no clicking on main Container
  blocksCon.classList.add("no-clicking");
  // set time
  setTimeout(() => {
    // remove class no clicking
    blocksCon.classList.remove("no-clicking");
  }, duration);
}
// check matched block
function checkMatchedB(firstBlock, secondBlock) {
  let treisElement = document.querySelector(".tries span");
  let tryElement = document.querySelector(".try span");
  if (firstBlock.dataset.tech === secondBlock.dataset.tech) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("is-matched");
    secondBlock.classList.add("is-matched");
    document.getElementById("fail").play();
    tryElement.innerHTML = parseInt(tryElement.innerHTML) + 1;
    if (tryElement.innerHTML === "10") {
      document.getElementById("cong").play();
      document.querySelector(".A3").classList.add("cong");
      let score =
        (parseInt(myTimer.innerHTML) - parseInt(treisElement.innerHTML)) * 10;
      let palyer = { name: mySpanb.innerHTML, score: score };
      localStorage.setItem(mySpanb.innerHTML, JSON.stringify(palyer));
      document.querySelector(".A3 span").onclick = () =>
        window.location.reload();
    }
  } else {
    treisElement.innerHTML = parseInt(treisElement.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");
    }, duration);
    document.getElementById("suc").play();
  }
}
let scoreboard = document.querySelector(".score-container ul");
let players = [];
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
  const player = JSON.parse(value);
  console.log(player);
  players.push(player);
}
players.sort((a, b) => b.score - a.score);
scoreboard.innerHTML = players
  .map((element, index) => {
    return index === 0
      ? `<li class="first">${element.name}: ${element.score}</li>`
      : `<li>${element.name}:${element.score}</li>`;
  })
  .join("");

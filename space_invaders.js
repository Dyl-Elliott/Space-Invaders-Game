// const state = {
//   numberCells: (600 / 40) * (600 / 40), // (15squared) to fit within the size of the box
//   cells: [],
//   shipPosition: 217, // starting position
//   alienPositions: [
//     3, 4, 5, 6, 7, 8, 9, 10, 11, 18, 19, 20, 21, 22, 23, 24, 25, 26,
//   ],
// };

// const drawGrid = function () {
//   // create the containing element
//   const grid = document.createElement("div");
//   grid.classList.add("grid");

//   // create a LOT of cells - 15x15 grid (225 grid cells)
//   for (let i = 0; i < state.numberCells; i++) {
//     // create a cell
//     const cell = document.createElement("div");
//     grid.append(cell);
//     // store cell in game state
//     state.cells.push(cell);
//   }
//   // append cells to the containing elemenet
//   // append the containing element to the app
//   state.element.append(grid);
// };

// const drawShip = function () {
//   state.cells[state.shipPosition].classList.add("spaceship");
//   // find bottom row, middle cell (from game state), and add a background image for the ship to be used
// };

// const drawAliens = function () {
//   // adding the aliens to the grid
//   // we need to store the position of the aliens in our game state
//   state.cells.forEach((cell, index) => {
//     // add the image via the class name to the cell, if the index is in the set of alien positions
//     if (state.alienPositions.includes(index)) {
//       cell.classList.add("alien");
//     }
//   });
// };

// const setupGame = function (element) {
//   state.element = element;
//   // do all things needed to draw the game. Grid / Spaceship / Aliens / add instructions / score
//   // grid -->
//   drawGrid();
//   drawShip();
//   drawAliens();
// };

// const controlShip = function (event) {
//   if (event.code === "ArrowLeft") {
//     moveShip("left");
//   } else if (event.code === "ArrowRight") {
//     moveShip("right");
//   } else if (event.code === "Space") {
//     // fire gun
//     fire();
//   }
// };

// const moveShip = function (direction) {
//   // move left and right
//   // remove image from current position and place it into a new position depending on direction
//   state.cells[state.shipPosition].classList.remove("spaceship");

//   if (direction === "left" && state.shipPosition % 15 == 0) {
//     state.shipPosition--;
//   } else if (direction === "right" && state.shipPosition % 15 == 14) {
//     state.shipPosition++;
//   }

//   // add an image to new position
//   state.cells[state.shipPosition].classList.add("spaceship");
// };

// const fire = function () {
//   // use 'interval' to run some code repeatedly each time after a specified time
//   let interval;

//   // laster starts at the ship position
//   let laser_position = state.shipPosition;
//   interval = setInterval(() => {
//     // remove laser image
//     state.cells[laser_position].classList.remove("laser");
//     // decrease (move up a row) the laser position
//     laser_position -= 15;
//     // check we are still within the bounds
//     if (laser_position < 0) {
//       clearInterval(interval);
//       return;
//     }

//     // if there is an alien when laser is fired, go BOOM!
//     // clear the interval
//     // remove alien image
//     // remove the alien from the alien position
//     // add the boom image
//     // set a timeout to remove the boom image
//     if (state.alienPositions.includes(laser_position)) {
//       clearInterval(interval);
//       state.alienPositions.splice(
//         state.alienPositions.indexOf(laser_position),
//         1
//       );
//       state.cells[laser_position].classList.remove("alien", "laser");
//       state.cells[laser_position].classList.remove("hit");
//       setTimeout(() => {
//         state.cells[laser_position].classList.remove("hit");
//       });

//       return;
//     }

//     // re add image
//     state.cells[laser_position].classList.add("laser");
//   }, 100);
// };

// const play = function () {
//   window.addEventListener("keydown", controlShip);
// };

// // quert the page for the splace to insert my game -->
// const app_element = document.querySelector(".app");
// // do everything needed to draw the game -->
// setupGame(app_element);
// // play game -->
// // start bvein gable to move the ship and move the aliens
// play();

// define the state and behaviour needed.
//
//
//
//
//
//
//
// define the state and behaviour needed.
const state = {
  numCells: (600 / 40) * (600 / 40), // 15x15 grid
  cells: [],
  shipPosition: 217, // default position of ship
  alienPositions: [
    // position of aliens to shoot
    3, 4, 5, 6, 7, 8, 9, 10, 11, 18, 19, 20, 21, 22, 23, 24, 25, 26, 33, 34, 35,
    36, 37, 38, 39, 40, 41, 48, 49, 50, 51, 52, 53, 54, 55, 56,
  ],
  score: 0,
};

const setupGame = function (element) {
  state.element = element;
  // draw the grid
  drawGrid();
  // draw the spaceship
  drawShip();
  // draw the aliens
  drawAliens();
  // draw the scoreboard
  drawScoreboard();
};

const drawGrid = () => {
  // create container div
  const grid = document.createElement("div");
  grid.classList.add("grid");
  // insert grid into the app
  state.element.append(grid);
  // loop through a certain number to generate cells.
  for (let i = 0; i < state.numCells; i++) {
    // creating a cell each iteration
    const cell = document.createElement("div");
    state.cells.push(cell);
    // insert cell into grid
    grid.append(cell);
  }
};

const drawShip = () => {
  // find starting point
  // add class to cell to add background image.
  state.cells[state.shipPosition].classList.add("spaceship");
};

const controlShip = (event) => {
  if (state.gameover) return;

  // demonstrate
  // console.log(event)
  if (event.code === "ArrowLeft") {
    moveShip("left");
  } else if (event.code === "ArrowRight") {
    moveShip("right");
  } else if (event.code === "Space") {
    fire();
  }
};

const moveShip = (direction) => {
  // remove class, update position, add class.
  // grid boundaries using modulo (left side multiples of 15, right side (15 minus 1))
  state.cells[state.shipPosition].classList.remove("spaceship");
  if (direction === "left" && state.shipPosition % 15 !== 0) {
    state.shipPosition--;
  } else if (direction === "right" && state.shipPosition % 15 !== 14) {
    state.shipPosition++;
  }
  state.cells[state.shipPosition].classList.add("spaceship");
};

const fire = () => {
  // using an interval add and remove bg image for a laser increasing up the grid
  // clear interval when laser reaches the top.
  // laser starts at ship position
  let interval;
  let laserPosition = state.shipPosition;

  interval = setInterval(() => {
    // first remove laser image from cell
    state.cells[laserPosition].classList.remove("laser");
    // then move up the grid
    laserPosition -= 15;
    // before we do anything, check we're still in the grid.
    if (laserPosition < 0) {
      clearInterval(interval);
      return;
    }

    // if there's an alien, BOOM!
    // clear interval, remove alien image, remove alien from positions, set a timeout for a boom emoji
    if (state.alienPositions.includes(laserPosition)) {
      clearInterval(interval);
      state.alienPositions.splice(
        state.alienPositions.indexOf(laserPosition),
        1
      );
      state.cells[laserPosition].classList.remove("alien");
      state.cells[laserPosition].classList.add("hit");
      state.score++;
      state.scoreElement.innerText = state.score;
      setTimeout(() => {
        state.cells[laserPosition].classList.remove("hit");
      }, 200);
      return;
    }

    // add image
    state.cells[laserPosition].classList.add("laser");
  }, 100);
};

const drawAliens = () => {
  // loop through cells, remove, and add class name to corresponding cell.
  state.cells.forEach((cell, index) => {
    // reset: if cell index is currently an alien position remove it
    if (cell.classList.contains("alien")) {
      cell.classList.remove("alien");
    }
    // update: if cell index is an alien position, add alien class
    if (state.alienPositions.includes(index)) {
      cell.classList.add("alien");
    }
  });
};

const play = () => {
  // start the aliens moving!
  let interval;
  // set starting direction
  let direction = "right";
  // set interval to repeat updating alien positions and drawing them
  interval = setInterval(() => {
    let movement;
    // if right
    if (direction === "right") {
      if (atSide("right")) {
        // go down a row and reverse direction to the left
        movement = 15 - 1;
        direction = "left";
      } else {
        // continue right
        movement = 1;
      }
      // if left
    } else if (direction === "left") {
      if (atSide("left")) {
        // go down a row and reverse direction to the right
        movement = 15 + 1;
        direction = "right";
      } else {
        // continue left
        movement = -1;
      }
    }
    //update alien positions
    state.alienPositions = state.alienPositions.map(
      (position) => position + movement
    );
    // redraw aliens
    drawAliens();
    // check game state (and stop the aliens, and stop the ship)
    checkGameState(interval);
  }, 300);
  // start the ability to move and fire
  window.addEventListener("keydown", controlShip);
};

const atSide = (side) => {
  if (side === "left") {
    // are there any aliens with a position in left hand column? (index multiple of 15)
    return state.alienPositions.some((position) => position % 15 === 0);
  } else if (side === "right") {
    // are there any aliens with a position in right hand column? (index multiple of 15 -1)
    return state.alienPositions.some((position) => position % 15 === 14);
  }
};

const checkGameState = (interval) => {
  // if there are no more aliens
  if (state.alienPositions.length === 0) {
    // stop aliens
    clearInterval(interval);
    // set game state
    state.gameover = true;
    // show win message
    drawMessage("HUMAN WINS!");

    // if aliens reach bottom row..ish
  } else if (
    state.alienPositions.some((position) => position >= state.shipPosition)
  ) {
    // stop aliens
    clearInterval(interval);
    // set game state
    state.gameover = true;
    // make ship go boom
    state.cells[state.shipPosition].classList.remove("spaceship");
    state.cells[state.shipPosition].classList.add("hit");
    // show lose message
    drawMessage("GAME OVER!");
  }
};

const drawMessage = (message) => {
  // add message element with class
  const messageEl = document.createElement("div");
  messageEl.classList.add("message");

  // append h1 with text
  const h1 = document.createElement("h1");
  h1.innerText = message;
  messageEl.append(h1);

  // append el to the app
  state.element.append(messageEl);
};

const drawScoreboard = () => {
  const heading = document.createElement("h1");
  heading.innerText = "Space Invaders";
  const paragraph1 = document.createElement("p");
  paragraph1.innerText = "Press SPACE to shoot.";
  const paragraph2 = document.createElement("p");
  paragraph2.innerText = "Press ← and → to move";
  const scoreboard = document.createElement("div");
  scoreboard.classList.add("scoreboard");
  const scoreElement = document.createElement("span");
  scoreElement.innerText = state.score;
  const heading3 = document.createElement("h3");
  heading3.innerText = "Score: ";
  heading3.append(scoreElement);
  scoreboard.append(heading, paragraph1, paragraph2, heading3);

  state.scoreElement = scoreElement;
  state.element.append(scoreboard);
};

// query the page for the element
const appElement = document.querySelector(".app");
// insert app into the game
setupGame(appElement);
// play!
play();

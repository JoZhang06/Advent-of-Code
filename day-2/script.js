//PART 1

const summonPuzzleInput = async (day) => {
    const response = await fetch(`https://adventofcode.com/2022/day/2/input`);
    const responseText = await response.text();
    return responseText.trim();
  };
  
  /* 
  A is rock
  B is paper
  C is scissors
  
  X is rock (1 point)
  Y is paper (2 points)
  Z is scissors (3 points)
  */
  
  const sumReducer = (sum, num) => sum + num;
  
  const puzzleInput = await summonPuzzleInput(2);
  
  const gameValues = {
    A: { X: 3, Y: 6, Z: 0 },
    B: { X: 0, Y: 3, Z: 6 },
    C: { X: 6, Y: 0, Z: 3 },
  };
  
  const moreValues = { X: 1, Y: 2, Z: 3 };
  
  const getTheScore = (game) => {
    const [opponentMove, yourMove] = game.split(" ");
    //get the game score (win, lose, draw)
    const gameScore = gameValues[opponentMove][yourMove];
  
    // console.log(gameScore + ", " + yourMove + ", " + opponentMove);
    //get the moce score
    const moveScore = moreValues[yourMove];
  
    //add them up
    return gameScore + moveScore;
  };
  
  //get the score of all the games
  const games = puzzleInput.split("\n");
  const scores = games.map(getTheScore);
  
  //add them all up
  const totalScore = scores.reduce((sum, num) => sum + num, 0);
  
  console.log(totalScore);
  
  //PART 2
  /*
  X is lose
  Y is draw
  Z is win
  */
  
  const requiredMoves = {
    A: { X: "S", Y: "R", Z: "P" },
    B: { X: "R", Y: "P", Z: "S" },
    C: { X: "P", Y: "S", Z: "R" },
  };
  
  const actualMoveValues = { R: 1, P: 2, S: 3 };
  
  const actualGameValues = { X: 0, Y: 3, Z: 6 };
  
  const getTheActualScore = (game) => {
    const [opponentMove, gameOutcome] = game.split(" ");
  
    //find which move you need to play
    const yourMove = requiredMoves[opponentMove][gameOutcome];
  
    //get the game score
    const gameScore = actualGameValues[gameOutcome];
  
    //get the move score
    const moveScore = actualMoveValues[yourMove];
  
    //add them up
    return gameScore + moveScore;
  };
  
  const actualScores = games.map(getTheActualScore);
  const actualTotalScore = actualScores.reduce(sumReducer, 0);
  
  console.log(actualTotalScore);
  
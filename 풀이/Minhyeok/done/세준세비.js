// 1524

let fs = require("fs");
let inputData = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const warGame = (inputData) => {
  inputData = inputData.filter((line) => line !== "");

  const testCaseCount = +inputData.shift();

  for (let i = 0; i < testCaseCount; i++) {
    const [seJoonCount, seBiCount] = inputData.shift().split(" ").map(Number);

    const seJoonArmy = inputData
      .shift()
      .split(" ")
      .map(Number)
      .sort((a, b) => b - a);
    const seBiArmy = inputData
      .shift()
      .split(" ")
      .map(Number)
      .sort((a, b) => b - a);

    while (seJoonArmy.length && seBiArmy.length) {
      const weakestSeJoon = seJoonArmy[seJoonArmy.length - 1];
      const weakestSeBi = seBiArmy[seBiArmy.length - 1];

      if (weakestSeJoon >= weakestSeBi) {
        seBiArmy.pop();
      } else {
        seJoonArmy.pop();
      }
    }

    if (seJoonArmy.length) {
      console.log("S");
    } else if (seBiArmy.length) {
      console.log("B");
    } else {
      console.log("C");
    }
  }
};

warGame(inputData);

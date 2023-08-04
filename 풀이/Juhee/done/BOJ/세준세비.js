// 1524

let fs = require("fs");
let input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const solution = (input) => {
  // \n 기준으로 split 하여 빈 배열이 함께 저장되는 예외 처리
  input = input.filter((value) => value != "");

  const TC = +input.shift();

  for (let tc = 0; tc < TC; tc++) {
    const [sCount, bCount] = input.shift().split(" ").map(Number);

    const sSoldiers = input.shift().split(" ").map(Number);
    const bSoldiers = input.shift().split(" ").map(Number);

    sSoldiers.sort((a, b) => b - a);
    bSoldiers.sort((a, b) => b - a);

    while (sSoldiers.length != 0 && bSoldiers.length != 0) {
      if (sSoldiers[sSoldiers.length - 1] >= bSoldiers[bSoldiers.length - 1]) {
        bSoldiers.pop();
      } else {
        sSoldiers.pop();
      }
    }

    // 세준이가 이기면 S, 세비가 이기면 B, 둘다 아닐 경우에는 C를 출력
    if (sSoldiers.length != 0) {
      console.log("S");
    } else if (bSoldiers.length != 0) {
      console.log("B");
    } else {
      console.log("C");
    }
  }
};

solution(input);

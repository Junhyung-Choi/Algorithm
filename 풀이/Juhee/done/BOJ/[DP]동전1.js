// https://www.acmicpc.net/problem/2293 동전1

let fs = require("fs");
let input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (input) => {
  const [N, K] = input.shift().split(" ").map(Number); // 동전 가지수 n, 목표 k원
  const coins = input.map(Number);

  const dp = Array.from({ length: K + 1 }, () => 0);
  dp[0] = 1;

  // dp[i] = i를 만들 수 있는 경우의 수
  for (const coin of coins) {
    for (let now = coin; now <= K; now++) {
      dp[now] += dp[now - coin];
    }
  }

  return dp[K];
};

console.log(solution(input));

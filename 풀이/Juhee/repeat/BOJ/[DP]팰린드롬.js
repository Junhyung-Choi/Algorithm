// https://www.acmicpc.net/problem/10942 백준 - 팰린드롬?

let fs = require("fs");
let input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (input) => {
  const answer = [];
  const N = Number(input.shift());
  const numbers = input.shift().split(" ").map(Number); // N개의 홍준이가 칠판에 적은 수
  const M = Number(input.shift()); // 질문의 갯수

  const dp = Array.from({ length: N }, () => Array(N).fill(false));

  // 길이가 1인 경우, 펠린드롬
  for (let i = 0; i < N; i++) {
    dp[i][i] = true;
  }

  // 길이가 2인 경우, 양옆 값이 똑같아야 펠린드롬
  for (let i = 0; i < N - 1; i++) {
    if (numbers[i] === numbers[i + 1]) {
      dp[i][i + 1] = true;
    }
  }

  // 길이가 3 이상인 경우, numbers[i] === numbers[j] && dp[i + 1][j - 1]
  for (let k = 3; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      let j = i + k - 1;
      if (numbers[i] === numbers[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
      }
    }
  }

  for (let i = 0; i < M; i++) {
    const [S, E] = input[i].split(" ").map(Number);
    // const target = numbers.slice(S - 1, E); // 해당 target에 대해 펠린드롬 여부를 체크해야함
    dp[S - 1][E - 1] ? answer.push(1) : answer.push(0);
    // checkPalindrome(target) ? answer.push(1) : answer.push(0);
  }

  return answer.join("\n");
};

// const checkPalindrome = (numbers) => {
//   // 처음 풀이한 코드 : pointer 활용하여 끝과 끝 비교하기 -> 시간초과
//   if (numbers.length === 1) return true;

//   let left = 0;
//   let right = numbers.length - 1;

//   while (left < right) {
//     if (numbers[left] !== numbers[right]) return false;
//     left++;
//     right--;
//   }

//   return true;
// };

console.log(solution(input));

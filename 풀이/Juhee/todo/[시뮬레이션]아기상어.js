// https://www.acmicpc.net/problem/16236

let fs = require("fs");
let input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (input) => {
  let answer = 0; // 걸리는 시간 (1초에 1칸 이동)
  let sharkSize = 2; // 상어의 크기 (초기값 2)
  let needFishForSizeUp = sharkSize; // 크기 상승을 위해 먹어야하는 생선의 갯수

  const N = input.shift();
  let graph = input.map((line) => line.split(" ").map(Number));

  // 1. 아기상어 위치 초기화
  let sharkLocation = [0, 0];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] === 9) {
        sharkLocation = [i, j];
        graph[i][j] = 0;
      }
    }
  }

  // 2. 먹을 수 있는 생선이 있는 경우에 대해 while 탐색
  while (true) {
    const fishLocations = getFishToEatByBfs(sharkLocation, sharkSize, graph);

    if (fishLocations.length <= 0) break;

    // 2-1. 해당 탐색에서 먹을 생선의 좌표값, 거리 차이
    const [fishY, fishX, diffLocation] = fishLocations[0];

    answer += diffLocation;

    // 2-2. 먹은 생선의 값, 현재 상어의 위치 초기화
    graph[fishY][fishX] = 0;
    sharkLocation = [fishY, fishX];

    // 2-2. 상어 크기 상승 로직을 위한 먹은 생선의 갯수 추가
    needFishForSizeUp -= 1;
    if (needFishForSizeUp === 0) {
      sharkSize++;
      needFishForSizeUp = sharkSize;
    }
  }

  return answer;
};

/** BFS 를 통해 이동 가능한 길 여부 확인 및 먹을 수 있는 물고기 정보 배열 구하는 함수 */
const getFishToEatByBfs = (sharkLocation, sharkSize, graph) => {
  const ableToEat = [];

  const N = graph.length;
  const queue = [sharkLocation];

  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];

  let visited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => 0)
  );

  visited[sharkLocation[0]][sharkLocation[1]] = 1;

  while (queue.length > 0) {
    const [Y, X] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = [Y + dy[i], X + dx[i]];
      // 1. 이동 가능 여부 판단 (범위 내에 있으며, 현재 상어의 크기보다 작거나 같아야 함)
      if (
        nextY >= 0 &&
        nextX >= 0 &&
        nextY < N &&
        nextY < N &&
        !visited[nextY][nextX] &&
        graph[nextY][nextX] <= sharkSize
      ) {
        queue.push([nextY, nextX]);
        visited[nextY][nextX] = visited[Y][X] + 1;
        // 2. 먹을 수 있는 생선 여부 판단 (현재 상어 크기보다 작아야함)
        if (
          graph[nextY][nextX] != 0 &&
          graph[nextY][nextX] != 9 &&
          graph[nextY][nextX] < sharkSize
        ) {
          // 3.생선의 y, x, 거리 차이
          ableToEat.push([nextY, nextX, visited[nextY][nextX] - 1]);
        }
      }
    }
  }

  ableToEat.sort((a, b) => {
    // 4. 문제에 조건에 맞게 오름차순 정렬 (가장 가까운 거리 -> 만약 같다면, 가장 위에 있는 고기 (y축) -> 만약 같다면, 가장 왼쪽에 있는 고기 (x축))
    if (a[2] !== b[2]) return a[2] - b[2];
    if (a[0] !== b[0]) return a[0] - b[0];
    return a[1] - b[1];
  });

  return ableToEat;
};

console.log(solution(input));

// DRAFT CODE
// const fishLocations = [];
// for (let i = 0; i < N; i++) {
//   for (let j = 0; j < N; j++) {
//     if (graph[i][j] < sharkSize && graph[i][j] != 0 && graph[i][j] != 9) {
//       const diffLocation =
//         Math.abs(sharkLocation[0] - i) + Math.abs(sharkLocation[1] - j);
//       // 큰 물고기를 지나갈 수 없다
//       fishLocations.push([i, j, diffLocation]);
//     }
//   }
// }
// fishLocations.sort((a, b) => {
//   // 가장 가까운 거리 -> 가장 위에 있는 고기 -> 가장 왼쪽에 있는 고기
//   if (a[2] !== b[2]) return a[2] - b[2];
//   if (a[0] !== b[0]) return a[0] - b[0];
//   return a[1] - b[1];
// });
// if (fishLocations.length === 0) break;
// const fishToEat = fishLocations[0];
// // 크가가 같은 고기를 먹으면 크기가 1 증가
// if (
//   graph[fishToEat[0]][fishToEat[1]] ===
//   graph[sharkLocation[0]][sharkLocation[1]]
// )
//   sharkSize++;
// graph[fishToEat[0]][fishToEat[1]] = 0;
// sharkLocation = [fishToEat[0], fishToEat[1]];
// answer += fishToEat[2]; // 초 시간 (거리 차이)

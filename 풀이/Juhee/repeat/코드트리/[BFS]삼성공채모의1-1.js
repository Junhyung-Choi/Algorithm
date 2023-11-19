// https://www.codetree.ai/training-field/mock-tests
// 삼성 공채 코딩테스트 모의1 1번 - 동전 챙기기

let fs = require("fs");
let input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift()); // 격자의 길이 N
const graph = input.map((line) => line.split("")); // ‘#'(벽), ‘.’ (빈 공간), ‘S’ (시작점), ‘E' (도착점), '1~9' 숫자로 이루어진 그래프

const bfs = (start, end) => {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, 1, -1];

  let visited = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => false)
  );
  visited[start[0]][start[1]] = true;

  const queue = [[start[0], start[1], 0]]; // index 2에 이동 거리 count 함께 저장

  while (queue.length > 0) {
    const [currentX, currentY, count] = queue.shift();
    if (currentX === end[0] && currentY === end[1]) return count; // 도착지에 도달한다면 '이동거리 횟수' 리턴

    // 상하좌우 탐색
    for (let d = 0; d < 4; d++) {
      const nextX = currentX + dx[d];
      const nextY = currentY + dy[d];

      // 주어진 그래프 범위를 만족하며,
      // 방문 기록이 없고, 막힌 벽이 아닌 경우 이동 가능
      if (
        0 <= nextX &&
        nextX < N &&
        0 <= nextY &&
        nextY < N &&
        !visited[nextX][nextY] &&
        graph[nextX][nextY] !== "#"
      ) {
        queue.push([nextX, nextY, count + 1]);
        visited[nextX][nextY] = true;
      }
    }
  }

  return Infinity; // 도착지 도달 못한 경우 Infinity 리턴
};

/** solution 함수 */
const solution = () => {
  const coin = []; // 동전들의 위치 및 값
  let start, end; // 첫 시작점 및 최종 도착점

  // 첫 시작점, 각 동전들의 위치 및 값, 최종 도착점 초기화
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (graph[i][j] === "S") start = [i, j];
      else if (graph[i][j] === "E") end = [i, j];
      else if (graph[i][j] !== "." && graph[i][j] !== "#")
        coin.push([i, j, Number(graph[i][j])]);
    }
  }

  coin.sort((a, b) => a[2] - b[2]); // 동전 값을 기준으로 오름차순 정렬 (작은 수부터 차례로 진행해야한다)

  let answer = Infinity; // 최단 경로를 찾아야 하므로, 첫 값은 Infinity 로 설정한다.

  // i, j, k 총 3개의 동전을 거친다고 하였을 때, 경로 값을 구한다.
  // 동전이 오름차순으로 정렬되어 있어 아래처럼 작성할 수 있다
  // (출발지 ~ 동전 i 까지의 최단 경로) + (동전 i ~ 동전 j 까지의 최단 경로) + (동전 j ~ 동전 k 까지의 최단 경로) + (동전 k ~ 도착지 까지의 최단 경로)
  for (let i = 0; i < coin.length - 2; i++) {
    for (let j = i + 1; j < coin.length - 1; j++) {
      for (let k = j + 1; k < coin.length; k++) {
        const dist =
          bfs(start, coin[i]) +
          bfs(coin[i], coin[j]) +
          bfs(coin[j], coin[k]) +
          bfs(coin[k], end);
        answer = Math.min(answer, dist);
      }
    }
  }

  return answer === Infinity ? -1 : answer; // 자꾸 실패가 떴는데 해당 예외처리를 놓쳤다 ^__________^
};

console.log(solution());

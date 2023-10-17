// 4485

let fs = require("fs");
let input = fs.readFileSync("test.txt").toString().trim().split("\n");

const dijkstra = (graph, cost) => {
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  const N = graph.length;

  // 1. 시작 노드에 대해 <비용, x좌표, y좌표> 초기화
  const queue = [];
  queue.push([graph[0][0], 0, 0]);
  cost[0][0] = graph[0][0];

  while (queue.length != 0) {
    // 2. queue 에 저장된 진로를 탐색함
    const [currentValue, currentX, currentY] = queue.shift();
    if (currentValue > cost[currentX][currentY]) continue; // 현재 노드 비용이 더 크다면 넘어감

    for (let i = 0; i < 4; i++) {
      const nextX = currentX + dx[i];
      const nextY = currentY + dy[i];

      // 3. 다음 노드가 범위 내에 존재해야함
      if (nextX >= 0 && nextY >= 0 && nextX < N && nextY < N) {
        const nextValue = currentValue + graph[nextX][nextY];

        // 4. 가중치 비교하기
        // 현재 노드를 거치는 경우(nextValue)의 가중치 합과
        // 현재 노드를 거치지 않을 때(cost[nextX][nextY]) 의 가중치 합 비교하여 갱신
        // 초기에 cost 는 Infinite로 초기화 되어 있음
        if (nextValue < cost[nextX][nextY]) {
          queue.push([nextValue, nextX, nextY]);
          cost[nextX][nextY] = nextValue;
        }
      }
    }
  }
  // 5. 최종 목적지에 저장된 최소 비용 리턴
  return cost[N - 1][N - 1];
};

const solution = (input) => {
  let count = 1;

  // 1. 0이 아닌 경우에 대해 케이스 돌기
  while (1) {
    const N = +input.shift();
    if (N === 0) break;

    // 2. 그래프 및 비용 배열 초기화
    const graph = Array.from(Array(N), () =>
      input.shift().split(" ").map(Number)
    );
    let cost = Array.from(Array(N), () => Array(N).fill(Infinity));

    // 3. 다익스트라 알고리즘 활용하여 최소 비용 구하기
    const minimumCost = dijkstra(graph, cost);

    console.log(`Problem ${count}: ${minimumCost}`);
    count++;
  }
};

solution(input);

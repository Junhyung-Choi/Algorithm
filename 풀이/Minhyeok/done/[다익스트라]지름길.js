const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 우선순위 큐에서 사용할 요소 클래스를 생성
// element는 값이고, priority는 우선순위를 나타냅니다.
class QElement {
  constructor(element, priority) {
    this.element = element;
    this.priority = priority;
  }
}

// 우선순위 큐 클래스를 생성
class PriorityQueue {
  constructor() {
    this.queue = [];
  }
  // 우선순위에 따라 요소를 큐에 추가
  enqueue(element, priority) {
    let isContain = false;
    const qElement = new QElement(element, priority);
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].priority > qElement.priority) {
        this.queue.splice(i, 0, qElement);
        isContain = true;
        break;
      }
    }
    if (!isContain) {
      this.queue.push(qElement);
    }
  }
  // 큐에서 가장 높은 우선순위를 가진 요소를 제거하고 반환
  dequeue() {
    if (!this.isEmpty()) return this.queue.shift();
  }
  // 큐에서 가장 높은 우선순위를 가진 요소를 반환
  front() {
    if (!this.isEmpty()) return this.queue[0];
  }
  // 큐에서 가장 낮은 우선순위를 가진 요소를 반환
  rear() {
    if (!this.isEmpty()) return this.queue[this.queue.length - 1];
  }
  // 큐가 비어있는지 체크
  isEmpty() {
    return this.queue.length === 0;
  }
}

const solution = function (input) {
  // 첫 줄에서 지름길 개수와 고속도로 길이를 뽑아냄
  const [N, D] = input
    .shift()
    .split(" ")
    .map((e) => parseInt(e));
  // dp 배열을 생성하고, 각 요소를 무한대로 초기화
  // dp[i]는 i까지의 거리를 이동하는 데 필요한 최소 시간을 나타내기기
  const dp = Array.from({ length: D + 1 }, () => Infinity);
  // 각 위치에서 이동 가능한 경로를 저장하는 배열 생성
  const edges = Array.from({ length: D + 1 }, () => []);
  // 입력에서 지름길 정보를 추출하고 이동 가능한 경로를 edges 배열에 추가
  for (const row of input) {
    const [a, b, c] = row.split(" ").map((e) => parseInt(e));
    if (D < b) continue;
    if (b - a <= c) continue;
    edges[a].push([b, c]);
  }
  // 우선순위 큐를 생성
  const pq = new PriorityQueue();

  // dp 배열의 첫 번째 요소를 0으로 설정
  dp[0] = 0;
  // 모든 위치에 대해 최소 이동 시간을 찾기
  for (let start = 0; start <= D; start++) {
    // 이전 위치에서 이동하는 시간을 현재 위치의 최소 이동 시간으로 설정
    if (start > 0) {
      dp[start] = Math.min(dp[start], dp[start - 1] + 1);
    }

    // 현재 위치를 우선순위 큐에 추가
    pq.enqueue(start, dp[start]);
    // 큐가 빌 때까지 반복!
    while (!pq.isEmpty()) {
      // 큐에서 가장 높은 우선순위를 가진 요소를 제거하고 반환합니다.
      const qe = pq.dequeue();
      // 큐 요소에서 위치를 추출
      const currPos = qe.element;

      // 현재 위치에서 이동할 수 있는 모든 위치에 대해
      // 해당 위치로 이동하는 데 필요한 시간이 dp 배열에 저장된 시간보다 작은 경우
      // dp 배열을 업데이트하고, 해당 위치를 우선순위 큐에 추가
      for (const [nextPos, nextDist] of edges[currPos]) {
        if (dp[nextPos] > dp[currPos] + nextDist) {
          dp[nextPos] = dp[currPos] + nextDist;
          pq.enqueue(nextPos, dp[nextPos]);
        }
      }
    }
  }
  // 세준이가 이동해야 하는 최소 거리를 출력
  console.log(dp[D]);
};

// 입력을 저장할 배열을 생성
const input = [];
rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  solution(input);
  process.exit();
});

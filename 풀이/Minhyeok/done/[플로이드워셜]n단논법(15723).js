// 15723

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

const n = parseInt(input[0]); // 전제의 수
const premises = input.slice(1, n + 1).map((line) => line.split(" is ")); // 전제를 분리하여 배열로 변환
const m = parseInt(input[n + 1]); // 결론의 수
const conclusions = input.slice(n + 2).map((line) => line.split(" is ")); // 결론을 분리하여 배열로 변환

let graph = {};

// 그래프 생성
for (let premise of premises) {
  const [start, end] = premise; // 각 전제에서 시작과 끝 노드 분리
  if (!graph[start]) {
    graph[start] = []; // 만약 해당 시작 노드가 그래프에 없으면 초기화
  }
  graph[start].push(end); // 그래프에 연결된 노드 추가
}

// 주어진 시작점에서 목표점까지 이르는 경로가 있는지 확인하는 DFS 함수
const dfs = (start, target, visited) => {
  if (!graph[start]) return false; // 시작점이 그래프에 없으면 바로 false 반환
  if (graph[start].includes(target)) return true; // 시작점에서 바로 목표점으로 연결되어 있다면 true 반환

  visited[start] = true; // 현재 노드를 방문했음을 표시
  for (let neighbor of graph[start]) {
    // 현재 노드와 연결된 모든 이웃 노드에 대해
    if (!visited[neighbor]) {
      // 만약 아직 방문하지 않은 이웃 노드라면
      if (dfs(neighbor, target, visited)) return true; // 해당 이웃 노드에서 목표점까지의 경로가 있는지 재귀적으로 확인
    }
  }
  return false; // 모든 경로를 확인했지만 목표점까지의 경로를 찾지 못했으면 false 반환
};

// 각 결론 확인
for (let conclusion of conclusions) {
  const [start, target] = conclusion; // 각 결론에서 시작과 목표 노드 분리
  let visited = {}; // 방문한 노드를 기록할 객체 초기화
  if (dfs(start, target, visited)) {
    // 시작 노드에서 목표 노드까지의 경로가 있다면
    console.log("T");
  } else {
    console.log("F");
  }
}

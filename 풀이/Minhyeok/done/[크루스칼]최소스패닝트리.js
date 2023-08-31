// 본인이 선택한 언어로 풀이해주세요.
// https://www.acmicpc.net/problem/1197

const fs = require("fs");
const input = fs.readFileSync("/dev/stdin").toString().trim().split("\n");

// 첫 번째 줄에서 정점(V)과 간선(E)의 수를 구함
const [V, E] = input[0].split(" ").map(Number);
// 나머지 줄에서 간선 정보를 추출
const edges = input.slice(1).map((line) => line.split(" ").map(Number));

// 간선들을 가중치를 기준으로 오름차순 정렬
edges.sort((a, b) => a[2] - b[2]);

// 부모 테이블 초기화: 각 정점의 부모는 자기 자신으로 설정
let parent = Array(V + 1)
  .fill(0)
  .map((_, idx) => idx);

// Find 연산: 특정 원소가 속한 집합을 찾기
const find = (u) => {
  // 루트 노드를 찾을 때까지 재귀적으로 호출
  if (u === parent[u]) return u;
  return (parent[u] = find(parent[u]));
};

// Union 연산: 두 집합을 합치기
const union = (u, v) => {
  u = find(u);
  v = find(v);
  // 두 원소가 속한 집합이 다르다면 합치기
  if (u !== v) {
    parent[u] = v;
  }
};

let result = 0;

// 모든 간선에 대하여 확인
for (let i = 0; i < E; i++) {
  const [a, b, w] = edges[i];

  // 사이클을 형성하지 않는 경우에만 간선을 추가
  if (find(a) !== find(b)) {
    union(a, b);
    result += w; // 최소 스패닝 트리의 가중치에 더하기
  }
}

// 최소 스패닝 트리의 가중치 합 출력
console.log(result);

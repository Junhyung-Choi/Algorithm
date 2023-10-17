// https://www.acmicpc.net/problem/1647

let fs = require("fs");
let input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

// 마을에는 집이 하나 이상 있어야 하며, 분리된 마을 안에 있는 임의의 '두 집 사이에 경로가 항상 존재', 문제에서 파악 가능한 정보: 모든 집들은 연결되어 있다.
// 사이클의 존재 여부 -> Union/Find 알고리즘을 활용하여 해결 가능하다

const solution = (input) => {
  const [N, M] = input.shift().split(" ").map(Number);
  let road = input.map((line) => line.split(" ").map(Number));

  // 1. 유지비를 기준으로 오름차순으로 정렬
  road.sort((a, b) => a[2] - b[2]);

  // 2. Union-Find 활용을 위한 parent 초기화
  let parent = new Array(N + 1).fill(0);
  for (let i = 0; i <= N; i++) parent[i] = i;

  // 3. 사이클 없이 간선을 이을 수 있는 스패닝 트리 저장
  let MST = [];

  for (let i = 0; i < M; i++) {
    const [from, to, cost] = road[i];
    // 3-1. 사이클 체크
    if (!findParent(from, to, parent)) {
      unionParent(from, to, parent);
      MST.push([from, to, cost]);
    }
  }
  // 4. 비용이 제일 높은 간선 자르기 (비용을 기준으로 오름차순 하였기 때문에 pop 하면 비용 가장 높은 값이 제외됨)
  let answer = 0;
  MST.pop();
  for (let i = 0; i < MST.length; i++) {
    answer += MST[i][2];
  }

  return answer;
};

/** x의 부모 검사 */
const getParent = (x, parent) => {
  if (parent[x] === x) return x;
  else return (parent[x] = getParent(parent[x], parent)); // return 이 있어야 축약됨.
};

/** a, b가 parent 로부터 연결되어 있는지 검사 */
const findParent = (a, b, parent) => {
  a = getParent(a, parent);
  b = getParent(b, parent);
  if (a === b) return true;
  else return false;
};

/** a, b를 하나의 부모로 연결 */
const unionParent = (a, b, parent) => {
  a = parent[a];
  b = parent[b];
  if (a < b) parent[b] = a;
  else parent[a] = b;
};

console.log(solution(input));

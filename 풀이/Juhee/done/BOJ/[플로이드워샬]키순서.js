// 2458

let fs = require("fs");
let input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

/**
 *
 * @param {*} relation 관계 배열
 * @param {*} visited 방문 여부
 * @param {*} number 탐색하고자 하는 학생 번호
 * @param {*} count 연결된 횟수 count
 */
const dfs = (relation, visited, number, count) => {
  visited[number] = 1;

  for (const otherStudent of relation[number]) {
    if (visited[otherStudent] === 1) continue;
    count++;
    count = dfs(relation, visited, otherStudent, count);
  }

  return count;
};

const solution = (input) => {
  // N명의 학생의 키는 모두 다르다, 키는 양수이다
  // 핵심: 정확히 본인의 키가 몇 번째인지 알 수 있는지 여부 = 본인과 연결된 정점이 N-1 개이면 정확히 키가 몇 번째 인지 알 수 있음

  let answer = 0;

  // 학생 수 N, 비교 횟수 M
  const [N, M] = input[0].split(" ").map(Number);

  // 관계 초기화
  const upperRelation = Array.from({ length: N + 1 }, () => []); // 각 배열에는 i 번째 학생보다 키가 큰 학생들의 번호가 저장
  const underRelation = Array.from({ length: N + 1 }, () => []); // 각 배열에는 i 번째 학생보다 키가 작은 학생들의 번호가 저장

  for (let i = 1; i < input.length; i++) {
    const [small, big] = input[i].split(" ").map(Number);
    upperRelation[small].push(big);
    underRelation[big].push(small);
  }

  // DFS/BFS 탐색 통해 비교 가능한 횟수 구하기
  let upperCount = Array.from({ length: N + 1 }, () => 0); // i 번째 학생보다 키 큰 학생 수
  let underCount = Array.from({ length: N + 1 }, () => 0); // i 번째 학생보다 키 작은 학생 수

  for (let student = 1; student <= N; student++) {
    let upperVisited = Array.from({ length: N + 1 }, () => 0);
    let underVisited = Array.from({ length: N + 1 }, () => 0);

    // student 보다 큰, 작은 학생 수 저장
    upperCount[student] = dfs(upperRelation, upperVisited, student, 0);
    underCount[student] = dfs(underRelation, underVisited, student, 0);

    const totalRelationCount = upperCount[student] + underCount[student];
    if (totalRelationCount === N - 1) answer++;
  }

  console.log(answer);
};

// 플로이드 워샬 문제로 알려져 있는데 BFS/DFS 같은 탐색 알고리즘으로도 풀이가 가능할 것 같다..!
solution(input);

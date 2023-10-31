// https://www.acmicpc.net/problem/1043

let fs = require("fs");
let input = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "test.txt")
  .toString()
  .trim()
  .split("\n");

const solution = (input) => {
  let answer = 0; // 과장된 이야기를 할 수 있는 파티 개수의 최댓값

  // N: 사람의 수, M: 파티의 수
  const [N, M] = input[0].split(" ").map(Number);

  // trueGroupCount: 진실을 아는 사람들의 명수, trueGroup: 진실을 아는 사람들
  let [trueGroupCount, ...trueGroup] = input[1].split(" ").map(Number);

  const graph = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => 0)
  );

  // 같은 파티에 있는 사람들 정보를 graph에 저장
  for (let i = 2; i < input.length; i++) {
    const [_, participants] = input[i].split(" ").map(Number);
    union(graph, participants);
  }

  //  파티 함께하는 사람들 정보를 통해 진실을 아는 참여자 갱신
  trueGroup = bfs(N, graph, trueGroup);

  console.log(trueGroup);

  // 이쯤에.. 이제 trueGroup에 속하는 사람인지 체크하면 되지 않을까 흑흑

  return;
};

const bfs = (N, graph, trueGroup) => {
  const visited = Array(N + 1).fill(false);
  const queue = [...trueGroup];

  for (let item of queue) {
    visited[item] = true;
  }

  while (queue.length !== 0) {
    const current = queue.shift();

    for (let i = 0; i < graph[current].length; i++) {
      if (graph[current][i] && !visited[i]) {
        queue.push(i);
        trueGroup.push(i);
        visited[i] = true;
      }
    }
  }

  return trueGroup;
};

const union = (graph, partyGroup) => {
  for (let i = 0; i < partyGroup.length - 1; i++) {
    const person1 = partyGroup[i];
    for (let j = i + 1; j < partyGroup.length; j++) {
      const person2 = partyGroup[j];
      graph[person1][person2] = 1;
      graph[person2][person1] = 1;
    }
  }
};

console.log(solution(input));

// 과장된 이야기를 할 수 있는 파티 개수의 최댓값 구하기

// 진실을 아는 사람이 하나라도 속해있는 파티에서는, 해당 파티에 참여하는 모든 사람이 진실을 알 수 밖에..
// 따라서 각 파티원들이 속해있는 파티에 진실을 알고 있는 사람이 있는지 파악해야한다.

// - 같은 그룹에 속해있는지 (진실을 아는 그룹) 판단하기 위해서, union-find 알고리즘을 활용할 수 있다.
// - 일명 합집합 알고리즘으로 위 문제처럼 특정 조건에 해당하는 그룹에 함께 포함되어 있는지 체크할 때 활용하기 좋다.

// 수도 코드
// - 진실을 알고 있는 사람이 0명이라면, 모든 파티에서 거짓말을 칠 수 있어, 파티의 수 M을 리턴
// - 추후에 진실을 알게 된다면?

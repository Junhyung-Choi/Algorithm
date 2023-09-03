// 본인이 선택한 언어로 풀이해주세요.
// 키 순서: https://www.acmicpc.net/problem/2458

// ? 다익스트라와 비슷하게 자기 자신을 거쳐서 갈 것인지, 거치지 않고 갈 것인지 판단
// ? -> 각 노드에 대해서 모두 검사를 진행해야 한다.
// ? -> 따라서 가장 바깥쪽 for문의 경우 n번만큼(= 노드의 갯수) 순회를 한다.
// ? -> 내부 for문의 경우, 현재 노드를 거치는 것과 거치지 않는 것을 비교해야하기 때문에 2차원 리스트를 모두 순회하며 확인해야 한다. 
// ? => 3중 for문 필요 (각 n회씩 순회)

// * - 문제 풀이 접근
// * 자신의 키 순서를 알아내려면 자신보다 작은 학생의 수 + 자신보다 큰 학생의 수를 모두 알 수 있어야 한다.
// * 즉, 문제에서 주어진 그래프로 설명하면 자기 자신까지 도달하는 노드의 수 + 자기 자신에서 출발해서 도달할 수 있는 노드의 수 == n-1(자신 제외)이 되어야 한다.

#include <iostream>
#include <algorithm>
#define INF 1000

using namespace std;

int main() {
    cin.tie(nullptr);
    ios::sync_with_stdio(false);

    int n, m;
    cin >> n >> m;

    int start, end;
    int distance[n+1][n+1]; // 시작점 - 끝점 사이 거리

    // * distance 값 초기화 - 시작점 == 끝점: 0, 나머지: INF
    for (int i = 0; i < n+1; ++i) {
        for (int j = 0; j < n+1; ++j) {
            if (i == j) distance[i][j] = 0;
            else distance[i][j] = INF;
        }
    }

    // * 그래프 연결 관계 입력 받기
    for (int i = 0; i < m; ++i) {
        cin >> start >> end;
        distance[start][end] = 1;
    }

    // * 플로이드 워셜 알고리즘
    for (int current_node = 1; current_node <= n; ++current_node) {
        for (start = 1; start <= n; ++start) {
            for (end = 1; end <= n; ++end) {
                // ? 현재 노드를 거쳐서 가는 것 vs 거치지 않는 것 중에 더 짧은 거리를 택한다.
                distance[start][end] = min(distance[start][end], distance[start][current_node] + distance[current_node][end]);
            }
        }
    }

    // * 답 구하기
    int count = 0, result = 0;
    // ? -> 1번 노드부터 n번 노드까지 자신과 연결된 노드의 갯수가 n - 1개인지 확인
    for (int node = 1; node <= n; ++node) {
        // ? 시작점이 node인 경우
        for (end = 1; end <= n; ++end) {
            if (distance[node][end] != 0 && distance[node][end] != INF) count++;
        }

        // ? 끝점이 node인 경우
        for (start = 1; start <= n; ++start) {
            if (distance[start][node] != 0 && distance[start][node] != INF) count++;
        }

        if (count == n-1) result++;
        count = 0;
    }

    cout << result << '\n';

    return 0;
}
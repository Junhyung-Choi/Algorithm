// 본인이 선택한 언어로 풀이해주세요.
// https://www.acmicpc.net/problem/1647
// ? 가중치 합이 최소인 그래프(= 최소 스패닝 트리)를 두 개 만들어야 한다.
// ? 전체 노드(=집)에 대해서 최소 스패닝 트리를 만들고, 가장 큰 가중치를 갖는 도로의 연결을 끊으면 원하는 결과를 얻을 수 있을 것.
// ? 최상위 부모끼리 비교하는 것이기 때문에, 그래프를 합칠 때마다 최상위 부모만 갱신한다.

#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int parent[100001];

// * node의 최상위 부모 노드를 찾는 함수
int find(int node) {
    if (parent[node] == node) return node;
    return parent[node] = find(parent[node]);
}

// * 두 node를 하나의 그래프로 합치는 함수
void _union(int a, int b) {
    // ? 서로의 최상위 부모끼리 비교
    a = find(a);
    b = find(b);
    // ? 둘 중 더 큰 노드가 상대를 최상위 부모로 삼음
    if (a < b) parent[b] = a;   // b의 부모를 a로 설정
    else parent[a] = b;         // a의 부모를 b로 설정
}

int main() {
    int n, m;
    cin >> n >> m;
    int start, end, cost;

    // * 도로 연결 정보 입력 ({cost, start, end} 순서)
    vector<pair<int, pair<int, int>>> road(m+1);
    for (int i = 1; i <= m; ++i) {
        cin >> start >> end >> cost;
        road[i] = make_pair(cost, make_pair(start, end));
    }

    // * 가중치 기준 오름차순 정렬
    sort(road.begin(), road.end());

    // * parent 값을 모두 자기 자신으로 초기화
    for (int i = 1; i <= n; ++i) {
        parent[i] = i;
    }

    int mst = 0, max_cost = 0;
    // * 모든 간선을 탐색하면서 연결 여부 결정
    for (int i = 1; i <= m; ++i) {
        cost = road[i].first;
        start = road[i].second.first;
        end = road[i].second.second;
        if (find(start) != find(end)) {
            _union(start, end);
            mst += cost;
            if (cost > max_cost) max_cost = cost;
        }
    }

    cout << mst - max_cost << '\n';

    return 0;
}
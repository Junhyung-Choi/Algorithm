#include <iostream>
#include <vector>
#include <queue>
#define INF 150000

// 본인이 선택한 언어로 풀이해주세요.
// https://www.acmicpc.net/problem/4485

using namespace std;

int main() {
    cin.tie(nullptr);
    ios::sync_with_stdio(false);

    // ? 상 -> 하 -> 좌 -> 우
    int dy[4] = {-1, 1, 0, 0};
    int dx[4] = {0, 0, -1, 1};

    int n, input_num;
    int result = 0, problem_number = 1;

    cin >> n;
    while (n) {
        vector<vector<int>> cave(n);
        vector<vector<int>> dist(n);
        // ? 도둑 루피의 크기 입력받기
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                cin >> input_num;
                cave[i].push_back(input_num);
                dist[i].push_back(INF);
            }
        }

        // ? 다익스트라
        dist[0][0] = cave[0][0]; // 시작점의 도둑 루피 크기는 무조건 합한다.
        // {cost, {row, col}}
        priority_queue<pair<int, pair<int, int>>, vector<pair<int, pair<int, int>>>, greater<pair<int, pair<int, int>>>> pq;
        pq.push({dist[0][0], {0, 0}});

        while (!pq.empty()) {
            int row = pq.top().second.first;
            int col = pq.top().second.second;
            pq.pop();

            // ? 상 -> 하 -> 좌 -> 우 순으로 방문 가능한 곳을 탐색한다.
            for (int i = 0; i < 4; ++i) {
                int next_row = row + dy[i];
                int next_col = col + dx[i];
                if (0 <= next_row && next_row < n && 0 <= next_col && next_col < n) {
                    int cost = dist[row][col] + cave[next_row][next_col];
                    // ? 현재 노드를 거쳐갔을 때가 더 적은 비용이 든다면, 비용을 갱신한다.
                    if (cost < dist[next_row][next_col]) {
                        dist[next_row][next_col] = cost;
                        pq.push({cost, {next_row, next_col}});
                    }
                }
            }
        }
        
        // ? 정답 출력
        cout << "Problem " << problem_number << ": " << dist[n-1][n-1] << '\n';

        // ? 하나의 케이스가 끝날 때마다 문제 번호를 갱신하고, n을 새로 입력받는다.
        problem_number++;
        cin >> n;
    }

    return 0;
}
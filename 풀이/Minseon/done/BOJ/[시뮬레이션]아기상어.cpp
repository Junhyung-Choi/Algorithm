// 본인이 선택한 언어로 풀이해주세요.
// https://www.acmicpc.net/problem/16236

// * 0. 현재 위치 값을 0으로 설정한다. 
// * 1. 현재 위치에서 가장 가까운 곳에 먹을 수 있는 물고기(< shark_size)를 탐색한다 (bfs - 지날 수 있는 조건: space[i][j] <= shark_size)
// * -> 같은 거리에 먹을 수 있는 물고기가 여러 마리인 경우 
// ?    (:: 최단거리 물고기를 처음 발견할 때, same_dist에 i, j, distance를 담아서 Push 한다)
// ?    (:: bfs 반복 조건은 !q.empty() && !same_dist.empty() && q.top()의 distance <= same_dist.top()의 distance)
// !        -> 틀림
// *    -> 1. 가장 위쪽에 있는(= row 값이 작은) 물고기를 우선적으로 찾는다.
// *    -> 2. 위쪽에 있는 물고기가 여러마리면 가장 왼쪽에 있는(= col 값이 작은) 물고기를 찾는다. 
// ? :: q.empty() && same_dist.empty()인 경우, bfs 탐색을 종료한다. (= 더 이상 먹을 수 있는 물고기가 없다.)
// * 2. 목표 물고기까지 가는 거리(bfs)를 시간에 더한다.
// * 3. eat_cnt를 1 증가시킨다.
// *    -> 이때, 만약 eat_cnt가 shark_size와 같아지면 shark_size를 1 증가시키고 eat_cnt를 0으로 초기화한다.
// * 4. 목표 물고기 위치를 아기 상어 위치로 설정하고 0번부터 반복한다. 

#include <iostream>
#include <vector>
#include <queue>
#include <algorithm>

using namespace std;

int n; 

int space[20][20];                                      // ? 물고기 & 상어 위치 정보
int shark_size = 2;                                     // ? 아기 상어의 현재 크기
int eat_cnt;                                            // ? 아기 상어가 먹은 물고기의 수
int spend_time;                                         // ? 소요 시간 (결괏값)
int next_row, next_col;                                 // ? 아기 상어의 위치

int visited[20][20];                                    // ? space[i][j]의 방문 여부 -> bfs 시작할 때마다 초기화
int current_row, current_col, current_dist;             // ? bfs에서 현재 탐색중인 위치정보
int dx[4] = {0, 0, -1, 1};                              // ? 다음 탐색 위치 col 변화량 (상 - 하 - 좌 - 우)
int dy[4] = {-1, 1, 0, 0};                              // ? 다음 탐색 위치 row 변화량 (상 - 하 - 좌 - 우)

vector<pair<pair<int, int>, int>> bfs(int start_row, int start_col) {
    // - 값 초기화
    // * 현재 아기상어 위치의 물고기 여부를 0으로 설정한다.
    space[start_row][start_col] = 0;

    vector<pair<pair<int, int>, int>> same_dist;    // ? 동일한 최단거리에 있는 물고기의 집합 ({{row, col}, distance})
    queue<pair<int, int>> q;                        // ? bfs에서 사용할 큐 ({{row, col}, distance})

    // - bfs 탐색
    // * 시작 지점의 방문 기록
    visited[start_row][start_col] = 0;
    q.push({start_row, start_col});

    while (!q.empty())
    {
        current_row = q.front().first; current_col = q.front().second;
        current_dist = visited[current_row][current_col];
        q.pop();

        // * 상 - 하 - 좌 - 우 순으로 탐색
        for (int i = 0; i < 4; ++i) {
            int next_row = current_row + dy[i]; int next_col = current_col + dx[i];
            // * 방문 가능 여부 체크
            if ((0 <= next_row && next_row < n) && (0 <= next_col && next_col < n) && visited[next_row][next_col] == -1 && space[next_row][next_col] <= shark_size) {
                visited[next_row][next_col] = current_dist + 1;
                // * 해당 위치에 아기 상어보다 작은 물고기가 존재하는 경우 - same_dist에 push
                if (0 < space[next_row][next_col] && space[next_row][next_col] < shark_size) {
                    same_dist.push_back({{next_row, next_col}, current_dist + 1}); 
                }
                // * q에 push
                q.push({next_row, next_col});
            }
        }
    }

    return same_dist;
}

// * 정렬 우선순위 - 1. 거리순, 2. row 오름차순, 3. col 오름차순
bool comp(pair<pair<int, int>, int> a, pair<pair<int, int>, int> b) {
    // ? 거리가 같은 경우 - 1. row 오름차순 2. col 오름차순
    if (a.second == b.second) {
        if (a.first.first == b.first.first) {
            return a.first.second < b.first.second;
        }
        return a.first.first < b.first.first;
    }
    // ? 거리가 더 가까운 것을 우선
    return a.second < b.second;
}

int main() {
    vector<pair<pair<int, int>, int>> fishes; // ? 먹을 수 있는 물고기의 집합 ({{row, col}, distance})
    
    // * 값 입력
    cin >> n;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            cin >> space[i][j];
            // ? 아기 상어의 초기 위치 설정
            if (space[i][j] == 9) {
                next_row = i; next_col = j;
            }
        }
    }

    // * 결과 계산
    while (1)
    {
        // * visited 초기화
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                visited[i][j] = -1;
            }
        }

        fishes = bfs(next_row, next_col);

        // * 더이상 먹을 수 있는 물고기가 존재하지 않는 경우, 탐색을 이어가지 않고 종료한다.
        if (fishes.empty()) break;

        // * 문제에서 주어진 우선순위 기준으로 정렬
        sort(fishes.begin(), fishes.end(), comp);
        
        next_row = fishes[0].first.first; next_col = fishes[0].first.second;
        current_dist = fishes[0].second;
        
        // * 목표 물고기까지 가는 거리를 소요 시간(spend_time)에 더한다.
        spend_time += current_dist;
        // * 물고기를 먹는다.
        eat_cnt++;
        if (eat_cnt == shark_size) {
            shark_size++;
            eat_cnt = 0;
        }
    }

    cout << spend_time << '\n';

    return 0;
}
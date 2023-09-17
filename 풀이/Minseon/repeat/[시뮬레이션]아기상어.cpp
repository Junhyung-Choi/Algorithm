// 본인이 선택한 언어로 풀이해주세요.
// https://www.acmicpc.net/problem/16236

// * 0. 현재 위치 값을 0으로 설정한다. 
// * 1. 현재 위치에서 가장 가까운 곳에 먹을 수 있는 물고기(< shark_size)를 탐색한다 (bfs - 지날 수 있는 조건: space[i][j] <= shark_size)
// * -> 같은 거리에 먹을 수 있는 물고기가 여러 마리인 경우 
// ?    (:: 최단거리 물고기를 처음 발견할 때, same_dist에 i, j, distance를 담아서 Push 한다)
// ?    (:: bfs 반복 조건은 !q.empty() && !same_dist.empty() && q.top()의 distance <= same_dist.top()의 distance)
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

vector<vector<int>> space(21);                          // ? 물고기 & 상어 위치 정보
vector<pair<pair<int, int>, int>> same_dist;            // ? 동일한 최단거리에 있는 물고기의 집합 ({{row, col}, distance})
int shark_size;                                         // ? 아기 상어의 현재 크기
int eat_cnt;                                            // ? 아기 상어가 먹은 물고기의 수
int spend_time;                                         // ? 소요 시간 (결괏값)
int start_row, start_col;                               // ? 아기 상어의 위치

vector<vector<bool>> visited(21);                        // ? space[i][j]의 방문 여부 -> bfs 시작할 때마다 초기화
queue<pair<pair<int, int>, int>> q;                     // ? bfs에서 사용할 큐 ({{row, col}, distance})
int current_row, current_col, current_dist;             // ? bfs에서 현재 탐색중인 위치정보
int dx[4] = {0, 0, -1, 1};                              // ? 다음 탐색 위치 col 변화량 (상 - 하 - 좌 - 우)
int dy[4] = {-1, 1, 0, 0};                              // ? 다음 탐색 위치 row 변화량 (상 - 하 - 좌 - 우)

void bfs(int start_row, int start_col) {
    // - 값 초기화
    // * 현재 아기상어 위치의 물고기 여부를 0으로 설정한다.
    space[start_row][start_col] = 0;

    // * visited 초기화
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            visited[i][j] = false;
        }
    }

    // * q, same_dist 초기화
    // while (!q.empty()) q.pop();
    same_dist.clear();

    // - bfs 탐색
    // * 시작 지점의 방문 기록
    visited[start_row][start_col] = true;
    q.push({{start_row, start_col}, 0});

    while (!q.empty())
    {
        // * 이미 더 가까운 먹이를 찾은 경우에는 탐색을 중단한다.
        if (!same_dist.empty() && q.front().second + 1 > same_dist[0].second) {
            while (!q.empty()) q.pop();
            break;
        }

        current_row = q.front().first.first; current_col = q.front().first.second;
        current_dist = q.front().second;
        q.pop();

        // * 상 - 하 - 좌 - 우 순으로 탐색
        for (int i = 0; i < 4; ++i) {
            int next_row = current_row + dy[i]; int next_col = current_col + dx[i];
            // * 방문 가능 여부 체크
            if ((0 <= next_row && next_row < n) && (0 <= next_col && next_col < n) && !visited[next_row][next_col] && space[next_row][next_col] <= shark_size) {
                visited[next_row][next_col] = true;
                // * 해당 위치에 아기 상어보다 작은 물고기가 존재하는 경우 - same_dist에 push
                if (0 < space[next_row][next_col] && space[next_row][next_col] < shark_size) {
                    same_dist.push_back({{next_row, next_col}, current_dist + 1}); 
                    // cout << "same_dist에 push: " << "row - " << next_row << " col - " << next_col << " dis - " << current_dist + 1 << '\n';
                }
                // * 아직 가까운 거리의 먹이를 찾지 못한 경우 - q에 push
                q.push({{next_row, next_col}, current_dist + 1});
            }
        }
    }

    // * 더이상 먹을 수 있는 물고기가 존재하지 않는 경우, 탐색을 이어가지 않고 종료한다.
    if (same_dist.empty()) return ;

    // ? row 값 기준으로 오름차순 정렬
    sort(same_dist.begin(), same_dist.end());
    
    start_row = same_dist[0].first.first; start_col = same_dist[0].first.second;
    current_dist = same_dist[0].second;

    // * 동일한 거리의 먹이가 여러 마리인 경우 - 우선순위 적용 (1. row 최소 2. col 최소)
    if (same_dist.size() > 1) {        
        // ? 동일한 row의 물고기가 여러 마리인 경우 - col이 최소인 물고기를 탐색
        if (same_dist[0].first.first == same_dist[1].first.first) {
            for (int i = 1; i < same_dist.size(); ++i) {
                if (same_dist[i].first.second < start_col) {
                    start_row = same_dist[i].first.first; start_col = same_dist[i].first.second;
                }
            }
        }
    }

    // cout << "shark_size >>> " << shark_size << " next_row: " << start_row << " next_col: " << start_col << '\n';
    
    // * 목표 물고기까지 가는 거리를 소요 시간(spend_time)에 더한다.
    spend_time += current_dist;
    eat_cnt++;
    if (eat_cnt == shark_size) {
        shark_size++;
        eat_cnt = 0;
    }

    bfs(start_row, start_col);
}

int main() {
    shark_size = 2;

    // ? 값 입력
    int input_num;
    cin >> n;

    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            cin >> input_num;
            space[i].push_back(input_num);
            // ? 아기 상어의 초기 위치 설정
            if (input_num == 9) {
                start_row = i; start_col = j;
            }
        }
    }

    // ? visited 초기화
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            visited[i].push_back(false);
        }
    }

    bfs(start_row, start_col);

    cout << spend_time << '\n';

    return 0;
}
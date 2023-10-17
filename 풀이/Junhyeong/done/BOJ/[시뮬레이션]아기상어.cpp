// 본인이 선택한 언어로 풀이해주세요.
// https://www.acmicpc.net/problem/16236
#include <iostream>
#include <deque>
#include <cstring>
#include <climits>

using namespace std;

int dayCount = 0;
int sharkSize = 2;
int sharkEatCount = 0;
int matSize;

int dx[4] = {-1,1,0,0};
int dy[4] = {0,0,-1,1};

int matrix[21][21];

pair<int,int> bfs(pair<int,int>);

int main(void)
{
    ios::sync_with_stdio(false);
    cin.tie(NULL);

    cin >> matSize;

    pair<int,int> sharkPos;

    for(int i = 0; i < matSize; i++)
    {
        for (int j = 0 ; j < matSize; j++)
        {
            int value;
            cin >> value;
            matrix[i][j] = value;

            if(value == 9)
            {
                sharkPos.first = i; sharkPos.second = j;
                matrix[i][j] = 0;
            }
        }
    }

    pair<int,int> nextPos = bfs(sharkPos);
    while(nextPos.first != INT_MAX)
    {
        matrix[nextPos.first][nextPos.second] = 0;
        sharkEatCount += 1;
        if(sharkEatCount == sharkSize)
        {
            sharkSize += 1;
            sharkEatCount = 0;
        }
        sharkPos = nextPos;
        nextPos = bfs(sharkPos);
    }
    cout << dayCount << endl;
}

pair<int,int> bfs(pair<int,int> sharkPos)
{
    int visited[21][21];
    memset(visited, 0, sizeof(visited));

    deque<pair<pair<int,int>,int> > dq;
    pair<pair<int,int>,int> node;
    node.first = sharkPos; node.second = 0;
    dq.push_back(node);

    pair<int,int> result;
    result.first = INT_MAX;
    int minDist = INT_MAX;

    while(!dq.empty())
    {
        pair<int,int> curPos = dq.front().first;
        int dist = dq.front().second;
        dq.pop_front();
        
        visited[curPos.first][curPos.second] = 1;
        
        for(int i = 0; i < 4; i++)
        {
            int nx = curPos.first + dx[i];
            int ny = curPos.second + dy[i];
            pair<pair<int,int>,int> tmpNode;

            if( 0 <= nx && nx < matSize &&
                0 <= ny && ny < matSize && 
                visited[nx][ny] == 0 &&
                matrix[nx][ny] <= sharkSize)
            {
                visited[nx][ny] = 1;
                tmpNode.first.first = nx;
                tmpNode.first.second = ny;
                tmpNode.second = dist + 1;
                dq.push_back(tmpNode);

                if(matrix[nx][ny] != 0 && matrix[nx][ny] < sharkSize)
                {
                    bool isNearest = minDist >= dist + 1;
                    bool isPrior = nx < result.first || (nx == result.first && ny < result.second);
                    if(isNearest && isPrior)
                    {
                        minDist = dist + 1;
                        result.first = nx; result.second = ny;
                    }
                }
            }
        }
    }
    if(minDist != INT_MAX)
    {
        dayCount += minDist;
    }
    return result;
}

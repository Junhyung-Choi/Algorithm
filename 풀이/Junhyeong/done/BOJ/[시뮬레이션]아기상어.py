# 본인이 선택한 언어로 풀이해주세요.
# https://www.acmicpc.net/problem/16236

import sys
from collections import deque

input = sys.stdin.readline

matsize = int(input())
matrix = []
dx = [-1,0,0,1]
dy = [0,-1,1,0]
shark_size = 2
shark_eat_count = 0
time = 0

for _ in range(matsize):
    matrix.append(list(map(int,input().split())))

def bfs(x,y):
    global time,shark_size
    timemat = [[-1] * matsize for _ in range(matsize)]
    timemat[x][y] = 0
    queue = deque()
    queue.append((x,y))
    while queue:
        cx,cy = queue.popleft()
        for i in range(4):
            nx = cx + dx[i]
            ny = cy + dy[i]
            if 0 <= nx < matsize and 0 <= ny < matsize and timemat[nx][ny] == -1 and matrix[nx][ny] <= shark_size:
                timemat[nx][ny] = timemat[cx][cy] + 1
                queue.append((nx,ny))
    return timemat

def minFind(timemat):
    min_dist = 123456789
    for x in range(matsize):
        for y in range(matsize):
            if timemat[x][y] != -1 and 0 < matrix[x][y] < shark_size and timemat[x][y] < min_dist:
                min_dist = timemat[x][y]
                mx = x
                my = y
    if min_dist == 123456789:
        return None
    else:
        return mx,my,min_dist

for x in range(matsize):
    for y in range(matsize):
        if matrix[x][y] == 9:
            sx,sy = x,y

while True:
    matrix[sx][sy] = 0
    result = minFind(bfs(sx,sy))
    if result == None:
        print(time)
        break
    else:
        sx = result[0]
        sy = result[1]
        time += result[2]
        shark_eat_count += 1
        if shark_eat_count == shark_size:
            shark_size += 1
            shark_eat_count = 0
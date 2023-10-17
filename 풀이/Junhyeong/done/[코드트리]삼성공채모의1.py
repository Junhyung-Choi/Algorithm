# 본인이 선택한 언어로 풀이해주세요.
# https://www.codetree.ai/training-field/mock-tests 삼성 - 공채 코딩테스트 모의1 1번

import sys
from collections import deque
from itertools import combinations

input = sys.stdin.readline

matrix_size = int(input())
matrix = [[] for _ in range(matrix_size)]

start_pos = end_pos = 0
coins = []
min_dist = 123456789

dx = [-1,1,0,0]
dy = [0,0,-1,1]

for row in range(matrix_size):
    line = input()
    for col in range(matrix_size):
        if line[col] == ".":
            matrix[row].append(0)
        if line[col] == "S":
            start_pos = (row,col)
            matrix[row].append(0)
        if line[col] == "E":
            end_pos = (row, col)
            matrix[row].append(0)
        if line[col] == "#":
            matrix[row].append(-1)
        if line[col] in ["1","2","3","4","5","6","7","8","9"]:
            matrix[row].append(0)
            coins.append((int(line[col]), (row,col)))
coins.sort()

candidates = list(combinations(coins,3))

def bfs(start,end):
    visited = [[0] * matrix_size for _ in range(matrix_size)]
    queue = deque()
    visited[start[0]][start[1]] = 1
    queue.append(start)

    while queue:
        x, y = queue.popleft()
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]
            if 0 <= nx < matrix_size and 0 <= ny < matrix_size:
                if visited[nx][ny] == 0 and matrix[nx][ny] != -1:
                    visited[nx][ny] = visited[x][y] + 1
                    queue.append((nx,ny))
                    if nx == end[0] and ny == end[1]:
                        return visited[nx][ny] - 1
    return -123456789

for c in candidates:
    tmp_sum_dist = 0
    dist_list = [start_pos, c[0][1], c[1][1], c[2][1], end_pos]
    
    is_continue = False
    for i in range(len(dist_list) - 1):
        tmp_dist = bfs(dist_list[i], dist_list[i+1])        
        tmp_sum_dist += tmp_dist

    min_dist = min(tmp_sum_dist, min_dist)

print(min_dist)
# 본인이 선택한 언어로 풀이해주세요.
# https://www.acmicpc.net/problem/4485

import sys
import heapq

count = 1
INF = 123456789
dx = [-1,1,0,0]
dy = [0,0,-1,1]

def dijkstra(matrix, costs, size):
    heap = []
    heapq.heapify(heap)

    heapq.heappush(heap, (matrix[0][0],0,0))

    while heap:
        value, x, y = heapq.heappop(heap)
        for i in range(4):
            nx = x + dx[i]
            ny = y + dy[i]

            if(0 <= nx < size and 0 <= ny < size):
                if(costs[nx][ny] > value + matrix[nx][ny]):
                    costs[nx][ny] = value + matrix[nx][ny]
                    heapq.heappush(heap, (costs[nx][ny], nx, ny))

while True:
    size = int(input())

    # 크기가 0인 입력이 들어올 시 반복 중단
    if(size == 0): break

    matrix = []
    costs = [[INF] * size for _ in range(size)]
    for i in range(size):
        matrix.append(list(map(int,input().split())))
    
    dijkstra(matrix, costs, size)

    print("Problem ", count, ": ", costs[size-1][size-1], sep="")

    count += 1
    
    


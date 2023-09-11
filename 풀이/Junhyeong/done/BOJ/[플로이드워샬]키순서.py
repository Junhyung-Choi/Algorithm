## 본인이 선택한 언어로 풀이해주세요.
# 키 순서: https://www.acmicpc.net/problem/2458

import sys
input = sys.stdin.readline

INF = 123456789

node_num, edge_num = map(int,input().split())
matrix = [[INF]*(node_num+1) for _ in range(node_num+1)]

for i in range(node_num+1):
    matrix[i][i] = 0

for _ in range(edge_num):
    start,end = map(int,input().split())
    matrix[start][end] = 1

def floyd_warshall(matrix):
    for k in range(1,node_num+1):
        for i in range(1,node_num+1):
            for j in range(1,node_num+1):
                matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j])

floyd_warshall(matrix)

count = 0
for node in range(1,node_num+1):
    is_count = True
    for index in range(1, node_num+1):
        if(matrix[node][index] == INF and matrix[index][node] == INF):
            is_count = False
            break
    if is_count:
        count += 1

print(count)
# 본인이 선택한 언어로 풀이해주세요.
# https://www.acmicpc.net/problem/1647

import sys
input = sys.stdin.readline

def find(parent, x):
    if parent[x] == x:
        return x
    parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, a, b):
    rootA = find(parent, a)
    rootB = find(parent, b)

    if rootA < rootB:
        parent[rootB] = rootA
    else:
        parent[rootA] = rootB


house_num, road_num = map(int, input().split())
parent = [0] * (house_num + 1)

edges = []
result = 0

for i in range(1, house_num + 1):
    parent[i] = i

for _ in range(road_num):
    a, b, cost = map(int, input().split())
    edges.append((cost, a, b))

edges.sort()

count = 0
for edge in edges:
    cost, a, b = edge
    if find(parent, a) != find(parent, b):
        union(parent, a, b)
        result += cost
        count += 1
        if(count == house_num-1):
            result -= cost

print(result)
# 지름길

import heapq
import sys
input = sys.stdin.readline
INF = int(1e9)

n, d = map(int, input().split())
graph = [[] for i in range(d+1)]
distance = [INF] * (d+1)

# 거리를 1로 초기화
for i in range(d):
    graph[i].append((i+1, 1))

# 지름길 업데이트, 만약 최대 거리를 넘어갈 시 고려 x
for i in range(n):
    a, b, c = map(int, input().split())
    if b > d: continue
    graph[a].append((b, c))

def dijkstra(start):
    q = []
    heapq.heappush(q, (0, start))
    distance[start] = 0
    while q:
        dist, now = heapq.heappop(q)
        if distance[now] < dist:
            continue
        for i in graph[now]:
            cost = dist + i[1]
            if cost < distance[i[0]]:
                distance[i[0]] = cost
                heapq.heappush(q,(cost, i[0]))

dijkstra(0)
print(distance[d])

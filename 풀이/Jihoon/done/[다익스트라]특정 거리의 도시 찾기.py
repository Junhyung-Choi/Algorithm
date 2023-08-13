# https://www.acmicpc.net/problem/18352

from collections import deque
import sys

input = sys.stdin.readline

# N개의 도시, M개의 도로 수, K거리 정보 , X출발 도시
N, M , K, X = map(int, input().split())
graph = [[] for _ in range(N+1)]

distance = [-1] * (N + 1)

# 간선 정보 입력
for _ in range(M):
    to, end = map(int, input().split())
    graph[to].append(end)

def bfs(start):
    queue = deque([start])
    distance[start] = 0
    
    while queue:
        now = queue.popleft()
        for i in graph[now]:
            if distance[i] == -1:
                distance[i] = 0
                queue.append(i)
                distance[i] = distance[now] + 1

bfs(X)
if K in distance:
  for i in range(1, N+1):
    if distance[i] == K:
      print(i)
      check = True
else:
  print(-1)

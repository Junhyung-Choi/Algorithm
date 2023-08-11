# 숨바꼭질

from collections import deque

MAX = 100000
dist = [0] * (MAX + 1) # 이동 거리를 알려주는 변수
n, k = map(int, input().split())

def bfs() :
    q = deque([n]) # n부터 시작
  
    while q:
        x = q.popleft()
        if x == k:
            print(dist[x])
            break
        for nx in (x-1, x+1, 2*x):
            if 0 <= nx <= MAX and not dist[nx]:
                dist[nx] = dist[x] + 1
                q.append(nx)

bfs()

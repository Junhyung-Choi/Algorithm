# https://www.acmicpc.net/problem/1697

import sys
from collections import deque
input = sys.stdin.readline

MAX = 100001
N, K = map(int, input().split())
array = [0] * MAX

def bfs(v):
    q = deque([v])
    while q:
        v = q.popleft()
        if v == K:
            return array[v]
        for next_v in (v-1, v+1, 2*v):
            if 0 <= next_v < MAX and not array[next_v]:
                array[next_v] = array[v] + 1
                q.append(next_v)
 
print(bfs(N))
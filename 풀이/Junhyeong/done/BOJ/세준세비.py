# BOJ 1524 - 세준세비
# https://www.acmicpc.net/problem/1524

import sys
input = sys.stdin.readline

TC = int(input())
for _ in range(TC):
    input()
    # m : 세준 / n : 세비
    m,n = map(int,input().split())
    m_list = list(map(int,input().split()))
    n_list = list(map(int,input().split()))

    # 약한 순서대로 정렬
    m_list.sort()
    n_list.sort()

    while(len(m_list) != 0 and len(n_list) != 0):
        # 세준이가 가장 약한 병사를 가지고 있을 때
        if m_list[0] < n_list[0]:
            m_list.pop(0)
        # 세비가 가장 약한 병사를 가지고 있거나 동등할때
        else:
            n_list.pop(0)

    if(len(m_list) == 0):
        print("B")
    else:
        print("S")
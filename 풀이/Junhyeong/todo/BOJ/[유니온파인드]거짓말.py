# 본인이 선택한 언어로 풀이해주세요.
#  https://www.acmicpc.net/problem/1043
import sys
from collections import deque
input = sys.stdin.readline

def set_matrix_and_parties(matrix, parties):
    for _ in range(party):
        tmp_party = list(map(int,input().split()))
        for i in range(1,tmp_party[0]+1):
            for j in range(i + 1,tmp_party[0]+1):
                first_person = tmp_party[i]
                second_person = tmp_party[j]
                
                matrix[first_person][second_person] = 1
                matrix[second_person][first_person] = 1

        parties.append(tmp_party[1:])

def check_truth_person(matrix, truth_person):
    queue = deque()
    for prty in truth_person:
        queue.append(prty)

    while queue:
        truth_p_index = queue.popleft()
        for p_index in range(1,people+1):
            if matrix[truth_p_index][p_index] == 1 and (p_index not in truth_person):
                queue.append(p_index)
                truth_person.append(p_index)

def count_false_party(truth_person, parties):
    result = 0
    for prty in parties:
        isFalse = True
        for t_person in truth_person:
            if t_person in prty:
                isFalse = False
                continue
        if isFalse:
            result += 1
    return result



# 초기 입력
people, party = map(int,input().split())
matrix = [[0]*(people+1) for _ in range(people+1)]
parties = []

# 진실을 아는 사람들의 수 입력
truth_person =  list(map(int,input().split()))
truth_person = truth_person[1:] if truth_person[0] != 0 else []

# 간선 및 파티 정보 입력
set_matrix_and_parties(matrix, parties)

# 진실을 알 수 있는 사람들 탐색
check_truth_person(matrix, truth_person)

# 거짓말을 할 수 있는 파티의 수 계산
result = count_false_party(truth_person, parties)

# 출력
print(result)

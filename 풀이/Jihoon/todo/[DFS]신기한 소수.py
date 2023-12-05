# https://www.acmicpc.net/problem/2023

n = int(input())

def checkPrimeNum(check_number):
    #에라토스테네스의 체로 소수인지 확인
    for i in range(2, int(check_number**0.5)+1): 
        if int(check_number) % i == 0: 
            return False
    return True

'''
에라토스테네스의 체 알고리즘은 여러 개의 수가 소수인지 아닌지를 판별할 때 사용하는 대표적인 알고리즘입니다. 
에라토스테네스의 체는 N보다 작거나 같은 모든 소수를 찾을 때 사용할 수 있습니다. 아래와 같은 과정을 통해 수행합니다.

1. 2부터 N까지의 모든 자연수를 나열한다

2. 남은 수 중에서 아직 처리하지 않은 가장 작은 수 i를 찾는다

3. 남은 수 중에서 i의 배수를 모두 제거한다(i는 제거하지 않는다)

4. 더 이상 반복할 수 없을 때까지 2번과 3번 과정을 반복한다.
'''

def dfs(num):
    if len(str(num))==n:
        print(num)  # 목표 길이 도달 시 멈춤
    else:
        for i in range(10):
            temp = num * 10 + i # 자릿 수를 늘리고 0-9까지를 더해줘가며 소수인지 확인한다
            if checkPrimeNum(temp) == True: # 소수인게 확인되면 다시 dfs를 돌린다
                dfs(temp)

dfs(2)
dfs(3)
dfs(5)
dfs(7)
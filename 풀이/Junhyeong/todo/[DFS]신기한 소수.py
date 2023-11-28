# https://www.acmicpc.net/problem/2023
import math

def isPrime(number):
    if number < 2 : return False
    for i in range(2, int(math.sqrt(number)) + 1):
        if number % i == 0:
            return False
    return True

digit = int(input())
iNumbers = [[2,3,5,7]]

if digit == 1:
    for i in iNumbers[0]:
        print(i)

for d in range(1, digit):
    iNumbers.append([])
    for front in iNumbers[d-1]:
        for behind in range(10):
            candidate = front * 10 + behind
            if isPrime(candidate):
                if d == digit - 1:
                    print(candidate)
                else:
                    iNumbers[d].append(candidate)

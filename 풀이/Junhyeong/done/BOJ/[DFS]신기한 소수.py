# https://www.acmicpc.net/problem/2023
import math

def isPrime(number):
    if number < 2 : return False
    for i in range(2, int(math.sqrt(number)) + 1):
        if number % i == 0:
            return False
    return True

def checkInterestingNumber(number):
    string_number = str(number)
    for i in range(len(string_number) - 1):
        if not int(string_number[:i+1]) in iNumbers:
            return False
    return isPrime(number)

digit = int(input())
iNumbers = [[2,3,5,7]]


for d in range(1, digit):
    iNumbers.append([])
    for front in iNumbers[d-1]:
        for behind in [1,3,5,7,9]:
            candidate = front * 10 + behind
            if isPrime(candidate):
                if d == digit - 1:
                    print(candidate)
                iNumbers[d].append(candidate)

for row in iNumbers:
    print(row)
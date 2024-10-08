+++
title = 'Insertion Sort'
date = 2024-07-24T19:03:42+07:00
draft = false
description = ""
image = "/images/20240724-insertion-sort.png"
imageBig = "/images/20240724-insertion-sort.png"
categories = ["dsa"]
authors = ["Tomodachii"]
avatar = "/images/avatar.png"
math = true
+++


# Insertion sort
Insertion sort works the way you might sort a hand of playing cards
- Start with an empty left hand; all cards are in a pile on the table
- With your right hand, pick up the first card in the pile
- Insert the card into the correct position in your left hand

## Pseudocode
```html
INSERTION-SORT(A, n)
1    for i = 2 to n
2        key = A[i]
3        // Insert A[i] into the sorted subarray A[1:i - 1]
4        j = i - 1
5        while j > 0 and A[j] > key
6            A[j + 1] = A[j]
7            j = j - 1
8        A[j + 1] = key
```
Explain by a little example
```
STEP 1:  7  4  5  2     -> No element on left side of 7, so no change in it position
          __
         /  v
STEP 2:  7  4  5  2     -> i = 1, key = A[1] = 4 < A[j = 0] = 7 -> Jump in the while loop to insert
         ^__|              A[j + 1] (A[0 + 1] = 4) to the correct position in the sorted subarray
             __
            /  v
STEP 3:  4  7  5  2
            ^__|
          __ __ __
         /  v  v  v
STEP 4:  4  5  7  2
         ^________|

FINAL:   2  4  5  7
```

## Analysis
The running time of the algorithm is the sum of running times for each statement executed. A statement that takes $c_{\scriptstyle k}$ steps to execute and executes $m$ times contributes $c_{\scriptstyle k}m$ to the total running time.

$c_{\scriptstyle k}$: number of steps to execute statement $k$ (or just consider it the time needed to execute line $k$)

$t_{\scriptstyle j}$: the number of times the while loop executed for that value of $j$ ($j = 2,3,...,n$). Because the while might not loop $n$ times, it depends on $i$. For example, if $j = n$ (the last item) and the while loop condition holds TRUE -> it will loop from $n$ to 1 ($n$ times)

The running time of insertion sort on an input of $n$ values:
$$T(n) = c_{\scriptstyle 1}n + c_{\scriptstyle 2}(n - 1) + c_{\scriptstyle 4}(n - 1) + c_{\scriptstyle 5}\sum_{j=2}^{n}t_{\scriptstyle j} + c_{\scriptstyle 6}\sum_{j=2}^{n}(t_{\scriptstyle j} - 1) + c_{\scriptstyle 7}\sum_{j=2}^{n}(t_{\scriptstyle j} - 1) + c_{\scriptstyle 8}(n - 1)$$

You might wonder why line 1 takes $n$ times not $(n - 1)$. 

When a for or while loop exits in the usual way, because the test in the loop header comes up FALSE, the test is executed one time more than the loop body. -> Same thing for $t_{\scriptstyle j}$

### Best case
**Best case: the array is already sorted**

In this case, each time that line 5 executes, the value of key ($A[i]$ origin value) is already greater than or equal all values in $A[0:i - 1]$, so that the while loop of lines 5-7 always exits upon the first test in line 5. Therefore $t_{\scriptstyle j} = 1$ for $j = 1,2,...,n$

Best-case running time:

$$
\begin{align*}
T(n) &= c_{\scriptstyle 1}n + c_{\scriptstyle 2}(n - 1) + c_{\scriptstyle 4}(n - 1) + c_{\scriptstyle 5}(n - 1) + c_{\scriptstyle 8}(n - 1) \\
&= (c_{\scriptstyle 1} + c_{\scriptstyle 2} + c_{\scriptstyle 4} + c_{\scriptstyle 5} + c_{\scriptstyle 8})n - (c_{\scriptstyle 2} + c_{\scriptstyle 4} + c_{\scriptstyle 5} + c_{\scriptstyle 8})
\end{align*}
$$

Best-case running time of the algorithm is $\Theta(n)$

### Worst case
**Worst case: the array is in reverse sorted order**

The procedure must compare each element $A[i]$ with each element in the entire sorted subarray $A[0:i - 1]$. The procedure find that $A[j] > key$ every time in line 5, and the while loop exits only when $j$ reaches 0 so $t_{\scriptstyle i} = i$ for $i = 2,3,...,n$

$$
\begin{align*}
T(n) &= c_{\scriptstyle 1}n + c_{\scriptstyle 2}(n - 1) + c_{\scriptstyle 4}(n - 1) + c_{\scriptstyle 5}(\frac{n(n + 1)}{2} - 1) + c_{\scriptstyle 6}(\frac{n(n - 1)}{2} - 1) + c_{\scriptstyle 7}(\frac{n(n - 1)}{2} - 1) + c_{\scriptstyle 8}(n - 1)\\
\end{align*}
$$

$$
\begin{align*}
&= (\frac{c_{\scriptstyle 5}}{2} + \frac{c_{\scriptstyle 6}}{2} + \frac{c_{\scriptstyle 7}}{2})n^2 + (c_{\scriptstyle 1} + c_{\scriptstyle 2} + c_{\scriptstyle 4} + \frac{c_{\scriptstyle 5}}{2} - \frac{c_{\scriptstyle 6}}{2} - \frac{c_{\scriptstyle 7}}{2} + c_{\scriptstyle 8})n
\end{align*}
$$

The worst-case running time is a **quadratic function** of $n$ or we can say $\Theta(n^2)$

So we can abuse the notations and say that the running time of the algorithm is $\Omega(n)$ and $\mathcal{O}(n^2)$

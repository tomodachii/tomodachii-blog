+++
title = 'Lecture 1: Introduction to Algorithms'
date = 2025-05-07T22:06:02+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["dsa"]
authors = ["Steven Skiena"]
avatar = "/images/avatar.png"
math = true
section = "CSE 373 - Analysis of Algorithms"
weight = 0
postColor = "#FF5103"
+++

# What is an Algorithm?
* A procedure that takes any of the possible input instances and transforms it to the desired output.
* Must solve a **general, well specified** problem.
    + An algorithmic problem is specified by describing the complete set of *instances*.

{{< callout type="info" >}}
We seek algorithms which are 
* correct
* efficient
{{< /callout >}}

### Correctness
* Always returns the desired output for all legal instances of the problem.
* Correct algorithms usually come with a proof of correctness.

## Robot Tour
* Problem: Robot Tour Optimization
* Input: A set $ S $ of $ n $ points in the plane.
* Output: Shortest cycle tour that visits each point in the set $ S $.

<br/>

```python
NearestNeighbor(P)
    Choose an initial point p0 from P
    Mark p0 as visited
    path = [p0]
    current = p0

    While there are unvisited points in P
        next = the closest unvisited point to current
        Mark next as visited
        Add next to path
        current = next

    Add p0 to path to complete the cycle
    Return path
```

{{< image-text image="/images/courses/CSE373/lecture-1/shortest-neighbour.png" width="40%" >}}
The algorithm always finds a tour, but it doesn't necessarily find the shortest possible tour.
{{< /image-text >}}

<br/>

Exhaustive Search: Try all possible orderings of the points, then select the one which minimizes the total length.
```python
d = INFINITY
For each of the factorial(n) permutations p_i of the n points
    If (cost(p_i) <= d)
    then d = cost(p_i) and p_min = p_i
Return p_min
```

Since all possible orderings are considered $ \righarrow $ guaranteed to end up with the shortest possible tour.
* However, for 20 points, a computer must enumerate all 20! orderings.

## Selecting the Right Jobs
* Problem: Movie Scheduling Problem
* Input: A set I of n intervals on the line.
* Output: What is the largest subset of mutually non-overlapping intervals that can be selected from I?

An instance of non-overlapping movie scheduling problem. Red titles: optimal solution.
![](/images/courses/CSE373/lecture-1/STRJ.png)

* Accept the earliest starting job first: might block us from taking many other jobs if that first job is long.
* Accept the shortest job and keep seeking the shortest available job: War and Peace is both the first job available and long enough to kill off all other prospects.

![](/images/courses/CSE373/lecture-1/STRJ-1.png)

```python
ExhaustiveScheduling(I)
    j = 0
    S_max = 0

    For each subset S_i of the 2^n possible subsets of intervals I
        If S_i is mutually non-overlapping AND size(S_i) > j
            j = size(S_i)
            S_max = S_i

    Return S_max
```

# Reasoning about Correctness
We need tools to distinguish correct algorithms from incorrect ones, the primary one of which is called a **proof**.
1. a clear, precise statement of what you are trying to prove.
2. a set of assumptions of things that are taken to be true, and hence can be used as part of the proof.
3.  a chain of reasoning that takes you from these assumptions to the statement you are trying to prove.
4. a little square (QED) at the bottom to denote that you have finished: "thus it is demonstrated."

# Problems and Properties

### Problem
1. a set of allowed input instances.
2. the required properties of the algorithm's output.

{{< callout type="danger" >}}
It is impossible to prove the correctness of an algorithm for a fuzzily stated problem.
{{< /callout >}}

# Demonstrating Incorrectness
Find an instance on which it yields an incorrect answer (counterexample).
* Verifiability
    + Calculate what answer the algorithm will give in this instance, and
    + display a better answer so as to prove that the algorithm didn't find it.
* Simplicity.

### Techniques
* Think small.
    + Small examples are easy to verify and reason about.
* Think exhaustively.
* Hunt for the weakness.
    + "always take the biggest" (greedy).
* Go for a tie.
    + break heuristic: provide instances of same size.
        - the heuristic has nothing to base its decision on.
* Seek extremes
    + hugh and tiny, left and right, few and many, near and far.

# Induction and Recursion
* Failure to find a counterexample to a given algorithm does not mean "it is obvious" that the algorithm is correct. 
* A proof or demonstration of correctness is needed.
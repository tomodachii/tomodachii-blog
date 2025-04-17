+++
title = 'Chapter 1: Computers, Complexity and Intractability'
date = 2025-04-02T08:20:25+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["complexity-theory"]
authors = ["Michael R. Garey", "David S. Johnson"]
avatar = "/images/avatar.png"
math = true
section = "Computers and Intractability: A Guide to the Theory of NP-Completeness"
weight = 1
postColor = "#FF5103"
+++

# Problems

{{< define >}}
Contain
1. a general description of all its params, and
2. a statement of what propaearties the solution, is required to satisfy.
{{< /define >}}

An {{< marker >}}instance{{< /marker >}} of the problem: specifying particular params.

<br/>

**Example:** Traveling Saleman Problem

Params:
* $C = \\{c_1, \dots, c_n\\} \rightarrow$ cities.
* $d(c_i, c_j)$.

Solution: 
* an ordering $<c_{\pi(1)}, c_{\pi(2)}, \dots, c_{\pi(m)}>$ of cities that minimizes
$$
[\sum_{i = 1}^{m - 1} d(c_{\pi(i)}, c_{\pi(i + 1)})] + d(c_{\pi(m)}, c_{\pi(1)})
$$

{{< callout type="info" >}}
a tour starts at $c_{\pi(1)}$, visits each city in sequence, then back to $c_{\pi(1)}$ from $c_{\pi(m)}$
{{< /callout >}}

One instance:
{{< image-text image="/images/books/computers-and-intractability/chapter-1/problem-instance-ex.png" width="20%" align="left" >}}
* $C = {c_1, c_2, c_3, c_4}$.
* $d(c_1, c_2) = 10$, $\dots$

$\rightarrow$ a solution $<c_1, c_2, c_4, c_3>$.
{{< /image-text >}}

# Algorithms
{{< define >}}
General, step-by-step procedures for solving problems.
{{< /define >}}

Think of them as being computer programs.

{{< callout type="danger" >}}
An algorithm is said to solve a problem $\Pi$ if 
* that algorithm can be applied to any instance $I$ of $\Pi$ and
* is guaranteed always to produce a solution for that instance $I$.
{{< /callout >}}

# Intractable
{{< define >}}
A problem is intractable if it is so hard that no polynomial time algorithm can possibly solve it.
{{< /define >}}

A problem has not been "well-solved" until a polynomial time algorithm is known for it.

## Encoding Scheme

{{< define >}}
A way of representing problem instances using symbols, typically as string.
{{< /define >}}

Algorithm operates on encoded inputs, not abstract objects $\rightarrow$ {{< marker >}}choice of encoding scheme affects SIZE of inputs (n).{{< /marker >}}

<br/>

**Example**
{{< image-text image="/images/books/computers-and-intractability/chapter-1/encoding-scheme-ex.png" align="left" width="10%" >}}
Graph $G = (V, E)$, 

vertices $V = \\{V_1, V_2, V_3, V_4\\}$, 

edges $E = \\{(V_1, V_2), (V_2, V_3)\\}$.
{{< /image-text >}}



<br/>

| Encoding Scheme          | String                                     | Length |
|--------------------------|--------------------------------------------|--------|
| Vertex list, Edge list   | V[1]V[2]V[3]V[4]\(V[1]V[2]\)(V[2]V[3])       | 36     |
| Neighbor list           | (V[2])(V[1]V[3])(V[2])()                   | 24     |
| Adjacency matrix rows   | 0100/1010/0010/0000                        | 19     |

## Provably Intractable Problems
two different causes of intractability:
1. Problems that require an exponential amount of time to solve
    * typical definition of an intractable problem.
2. Problems where the solution itself is too large to describe concisely
    * might not be hard to compute, but their output is so vast that it cannot be expressed with a polynomial-length formula.
    * Example: A variant of the Traveling Salesman Problem (TSP) where we want to find all tours with a total length $B$ or less.
        + There could be an exponentially large number of valid tours shorter than B. 
        + No polynomial-time algorithm can list all of them. {{< toggle title="explain" raw="true">}}
    Since the saleman must visit every city exactly once, the number of possible routes: $(n - 1)!$
    <br/>
    Say, even if half of them satisfy the B constraint, time complexity to explicitly list (n - 1)! routes is still
    $$
    \mathcal{O}(\frac{(n - 1)!}{2}) = \mathcal{O}(n!)
    $$

    Using <a href="https://en.wikipedia.org/wiki/Stirling%27s_approximation">Stirling's Approximation</a>
    $$
    n! \sim \sqrt{2\pi n}(\frac{n}{e})^n.
    $$
    This grows faster than exponential time algorithm. Even if a polynomial-time algorithm exists to check whether a route is valid, writing down all valid routes would take an exponential amount of space.
    {{< /toggle >}}

The 2nd type can be regarded as a sign that the problem is not defined realistically, bc we are asking for more information than we could ever hope to use.

Thus, the focus is primarily on the first type: problems that **requires exponential time** to solve.

### Undecidable Problems
Turing proved that
{{< define>}}
some problems are so hard that they are "undecidable", in the sense that no algorithm can solve them at all.
{{< /define >}}

* [The halting problem](https://en.wikipedia.org/wiki/Halting_problem)
* [Finitely Presented Groups' Triviality Problem (Rabin, 1958)](https://arxiv.org/pdf/2208.08560).
* Hilbert’s Tenth Problem (Matijasevic, 1970).
* Tiling the Plane Problem (Berger, 1966).

### Intractable but Decidable Problems
Meyer & Stockmeyer (1972) and Fischer & Rabin (1974).

{{< define >}}
Decidable but intractable problems have solutions, but they take exponential time using deterministic algorithms.
{{< /define >}}
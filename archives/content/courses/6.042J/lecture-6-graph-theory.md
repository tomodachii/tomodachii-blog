+++
title = 'Lecture 6: Graph Theory and Coloring'
date = 2025-06-02T21:52:48+07:00
draft = true
description = ""
image = ""
imageBig = ""
categories = ["graph-theory"]
authors = ["Tomodachii"]
avatar = "/images/avatar.png"
math = true
section = "6.042J: Mathematics for Computer Science"
weight = 1
postColor = "#FF5103"
+++

# Definitions
### Graphs
$ G = (V, E) $
* $ V $: **non empty** set of vertices (or nodes)
* $ E $: edges; set of two-element subsets of $ V $.

### Adjacent
Two nodes $ x_i $ and $ x_j $ are **adjacent** if $ \\{ x_i, x_j \\} \in E $.

### Incident
An edge $ e = \\{ x_i, x_j \\} $ is **incident** to $ x_i, x_j $.

### Degree of a Node
The \# of edges incident to a node.

### Simple Graph
{{< image-text image="/images/courses/6.042J/chapter-6/self-loop-multiedge-1.png" width="30%" align="left" >}}
* No self-loops or multiple edges (a.k.a multiedge).
* No directed edges.
{{< /image-text >}}

# Matching Problems
{{< toggle title="Sex Example" >}}

{{< image-text image="/images/courses/6.042J/chapter-6/sex-partner.png" width="20%" >}}
* US population $ | V | $
    + $ | M |, | F | $: male, female.

<br/>

Let alone exactly which couples are adjacent, only need to figure out the relationship bw the average number of partners per male and per female.

{{< /image-text >}}

Every edge is incident to exactly one M and one F $ \Rightarrow $ sum of the degrees of the M vertices = \# of edges ($ | E | $) = sum of the degrees of the F vertices
$$
\sum_{x \in M} \deg (x) = |E| = \sum_{y \in F} \deg (y)
$$
* Avg \# of opposite-gender partners for male $ A_m = \frac{\sum_{x \in M} \deg(x)}{|M|} = \frac{|E|}{|M|} $.
* Avg \# of opposite-gender partners for female $ A_m = \frac{\sum_{y \in F} \deg(x)}{|F|} = \frac{|E|}{|F|} $.

{{< /toggle >}}

### The Handshaking Lemma
The sum of degrees of the vertices in a graph equals twice the number of edges.

Proof: Every edge contributes two to the sum of the degrees, one for each of its endpoints.

# Coloring
{{< define >}}
Given a graph $ G $ and $ K $ colors, assign a color to each node st adjacent nodes get different colors (valid coloring).
{{< /define >}}

{{< toggle title="Exam Scheduling Example" >}}

{{< image-text image="/images/courses/6.042J/chapter-6/exam-scheduling.png" width="30%" >}}
Assign time slot for final exam
* some students are taking several classes with finals
* a student can take only one test during a particular time slot
* adjacent vertices: some student is taking both courses
  + 6.002 and 6.042 cannot have an exam at the same time since there're student in both courses.
{{< /image-text >}}

{{< image-text image="/images/courses/6.042J/chapter-6/exam-scheduling-color.png" width="30%" align="right" >}}
Slots
* blue: 6 - 8
* red: 9 - 11
* green: 13 - 15

{{< /image-text >}}
Can't do 2-coloring bc 6.002 - 6.170 - 6.041 forms a triangle and each one of these guys has to be different than the other two.

{{< /toggle >}}

### Chromatic number
$ \mathcal{X}(G) $: The minimum value of $ K $ for which $ G $ has a valid $ k $-coloring

### Basic Algorithm (Greedy Color Algorithm)

{{< define >}}

**Theorem 5.3.2**

If every node in an $ n \text{-node } G $ has degree $ \leq d $

Then the Basic Algorithm uses at most $ d + 1 $ colors for $ G $.

* $ d $: biggest degree in the graph.
* $ n $: \# of nodes.

{{< /define >}}

Proof: By induction

**Induction Hypothesis**: $ P (n) = n$-node graph with maximum degree $ d $ is $ (d + 1) $-colorable 

**Base case**: $ n = 1 \Rightarrow $ 0 edges, $ d $ = 0, 1 color = $ d $ + 1.

**Inductive step**: Assume $ P(n) $ is true for induction

Let 
* $ G = (V, E) $ be any $ (n + 1) $-node graph
* $ d = $ max degree in $ G $.

Want to show: We can color it using $ d + 1 $ colors

<br/>

Order the nodes $ V_1, V_2, \dots , V_n, V_{n + 1} $

Remove the $ V_{n + 1} $ from $ G $ to create $ G^{\prime} = (V^{\prime}, E^{\prime}) $

$ G^{\prime} $ has max degree $ \leq d $ and it has $ n $ nodes, so $ P(n) $

Says Basic Alg uses $ \leq d + 1 $ colors for $ V_1, V_2, \dots, V_n $
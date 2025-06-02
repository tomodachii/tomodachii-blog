+++
title = 'Lecture 6: Graph Theory and Coloring'
date = 2025-06-02T21:52:48+07:00
draft = false
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
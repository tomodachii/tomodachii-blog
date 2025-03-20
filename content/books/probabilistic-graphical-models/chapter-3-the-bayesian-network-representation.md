+++
title = 'Chapter 3: The Bayesian Network Representation'
date = 2025-03-19T16:14:14+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic graphical models"]
authors = ["Tomodachii"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 3
postColor = "#E03838"
+++

{{< callout type="info" >}}
**Goal:** represent a joint Distribution $P$ over some set of random variables $\mathcal{X} = \\{X_1, \dots, X_n\\}$.
{{< /callout >}}

{{< toggle title="But why Joint Distribution ?" >}}

Because If we have the **joint distribution**, we can calculate any probability using the **condition** and **marginal distribution**

[Motivation Example](https://www.youtube.com/watch?v=NWA-yYCJsMw&list=PL7xML77VWUYooSM6Rao8GZ5bHt4tmCp2e&ab_channel=easylearning)

{{< /toggle >}}

# Exploiting Independence Properties
## Parameterizing the Joint Distribution
Consider a simple setting:
* $X_i$ represents binary event (coin toss, yes/no COVID cause, etc) $\rightarrow$ Parameterizing the joint distribution $P(X_1, \dots, X_n)$ requires {{< marker >}} $2^n - 1$ params.{{< /marker >}} ([Recall](/books/probabilistic-graphical-models/chapter-1-and-2-introduction-and-foundations/#number-of-parameteres-of-a-distribution))
* Assume events are **marginally independent**: $(X_i \\perp\\!\\!\\!\\perp X_j)$ for every $i, j$. $\rightarrow$ $P(X_1, \dots, X_n) = P(X_1) \dots P(X_n)$.
    + Can use {{< marker >}}$n$ params{{< /marker >}} $\theta_1, \dots, \theta_n$ to parameterize $P(X_1) \dots P(X_n)$. $$ P(X_1, \dots, X_n) = \prod_i \theta_{xi} $$
        - $\theta_{xi} = \theta_i$ if $x_i = x_i^1$,
        - $\theta_{xi} = 1 - \theta_i$ if $x_i = x_i^0$,

From $2^n - 1$ to $n$ is a dramatic reduction in the number of parameters, and the key point is:
{{< callout type="danger" >}}Independencies can reduce the number of parameters.{{< /callout >}}

The same applies to conditional indepence. Consider the classic setting in the book: 
{{< toggle title="The Student Example" >}}
![Student](/images/books/probabilistic-graphical-models/chapter3/student-ex.png)
{{< /toggle >}}



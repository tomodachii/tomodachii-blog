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

The same applies to **Conditional Indepence**.

Consider a smaller picture: the joint distribution $ P(X_1, X_2, X_3, X_4) $. Using the chain rule,  

$$
P(X_1, X_2, X_3, X_4) = P(X_4 \mid X_3, X_2, X_1) P(X_3 \mid X_2, X_1) P(X_2 \mid X_1) P(X_1)
$$

{{< marker >}}If $ (X_4 \\perp\\!\\!\\!\\perp X_1, X_2 \mid X_3) \in \mathcal{I}(P) $, {{< /marker >}}

then $
P(X_4 \mid X_3, X_2, X_1) = P(X_4 \mid X_3)
$ $ \rightarrow $
{{< marker >}}\# of required parameters for this CPD reduces{{< /marker >}} from $ 2^3 = 8 $ to $ 2^1 = 2 $.  

The joint distribution becomes  

$$
P(X_1, X_2, X_3, X_4) = P(X_4 \mid X_3) P(X_3 \mid X_2, X_1) P(X_2 \mid X_1) P(X_1)
$$

The total number of parameters reduces from $ 2^4 - 1 = 15 $ to $2 + 2^2 + 2 + 1 = 9$.

{{< callout type="warning" >}}
So it's all about finding conditional independencies and factorize the joint distribution accordingly, but
1. How to find the conditional independencies (CIs) $\mathcal{I}(P)$ from the data?
2. Given the CIs, how to factorize the joint distribution? Can we somehow visualize the factorization? $\rightarrow\$ Bayesian networks!
{{< /callout >}}

## Bayesian Networks
{{< define icon="definition" label="Bayesian Network" >}}
* A directed **acyclic** graph (**DAG**) G whose nodes represent the random variables $X_1, \dots, X_n$.
* For each node $X_i$, a CPD $ P(X_i \mid \text{Par}_G(X_i)) $.
* The BN represents a joint distribution via the chain rule for Bayesian networks:

$$
P(X_1, \dots, X_n) = \prod_i P(X_i \mid \text{Pa}_G(X_i))
$$
{{< /define >}}

* $P$ is a legal distribution:
    + $P \leq 0$ ($P$ is a product of CPDs and CPDs are non-negative).
    + $\sum P = 1$.
    {{< toggle title="Proof" raw="true">}}
    <img src="/images/books/probabilistic-graphical-models/chapter3/sum-p-eq-1.png" alt="Proof">
    {{< /toggle >}}

Example
!["simple Bayesian network showing two potential diseases"](/images/books/probabilistic-graphical-models/chapter3/bn-ex-paper.png)
(a) A simple Bayesian network showing two potential diseases, **P**neumonia and **T**uberculosis,
*  either of which may cause a patient to have Lung **I**nfiltrates.
* The lung infiltrates may show up on an **X**Ray;
* there is also a separate **S**putum Smear test for tuberculosis.

All of the r.v are Boolean.

(b) The same Bayesian network, together with the conditional probability tables. 
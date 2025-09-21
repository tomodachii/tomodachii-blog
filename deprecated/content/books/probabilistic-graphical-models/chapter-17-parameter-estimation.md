+++
title = 'Chapter 17: Parameter Estimation'
date = 2025-04-15T14:20:15+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic-graphical-models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 18
postColor = "#E90808"
+++

### Scenarios
* **Completely observed** GMs
    + directed.
    + undirected.
* **Partially or Unobserved** GMs
    + directed.
    + undirected.

### Estimation principles
* MLE.
* Bayesian estimation.
* Maximum conditional likelihood.
* Maximum "Margin".
* Maximum entropy.

{{< callout type="info" >}}
Learning $=$ estimating the parameters + the topology of the network.
{{< /callout >}}

# Parameter Learning
* Assume $\mathcal{G}$ is known and fixed,
    + from expert design.
    + from an intermediate outcome of iterative structure learning.

* $D = \\{x_1, \dots ,x_N\\}$: $N$ {{< marker >}}independent, identically distributed (iid){{< /marker >}} training cases.
    + $x_n = (x_{n, 1}, \dots, x_{n, M})$ is a vector of $M$ values
        - the model is observed, every $x_n$ is known
        - or, paritially observed.
* Goal: Estimate from $D$.

Consider learning params for a BN given the structure and is completely observable. The likelihood of the data
$$
I(\theta | D) = \log p(D | \theta) = \log \left( \prod_{i} \prod_{j} p(x_{i,j} | \theta) \right) = \sum_{i} \sum_{j} \log p(x_{i,j} | \theta)
$$


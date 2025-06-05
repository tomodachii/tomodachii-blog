+++
title = 'Chapter 12: Particle-Based Approximate Inference'
date = 2025-06-04T18:33:28+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic-graphical-models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 16
postColor = "#FF5103"
+++

**General framework**

* $ P (\mathcal{X}) $
* $ Y \subseteq \mathcal{X} $
* $ y \in Val(Y) $
* $ D = \\{ \xi[1], \dots \xi[M] \\}: M $ samples from $ P, \xi [i] \sim P $

Goal: Estimate $ P(Y) = y $.

Generally: Estimate the expectation of some $ f(x) $ relative to $ P $.
* To compute $ P(Y = y) $, choose $ f(\xi) = I \\{ \xi (Y) = y \\} $,
$$
\begin{align*}
E_{\xi \sim P}[f(\xi)]
&\approx E_{\xi \sim D} [f(\xi)] \quad \text{(empirical approximation)}\\\
&= \frac{1}{M} \sum_{1}^{M} f(\xi) \\\
&= \frac{1}{M} \sum_{1}^{M} I\\{ \xi(Y) = y \\} = P(Y = y)
\end{align*}
$$

{{< toggle title="Indicator function example" >}}
$$
I\\{ \xi(Y) = y \\} =
\begin{cases} 
    1 \quad \text{if } \xi (Y) = y \\\
    0 \quad \text{otherwise}
\end{cases}
$$

* $ \mathcal{X} = \\{ X_1, X_2, X_3 \\} $
* one sample/particle: $ \xi = \\{ X_1 = 0, X_2 = 1, X_3 = 1 \\} $
* $ Y = \\{ X_1, X_3 \\} $

$$
\xi (Y) = \\{ X_2 = 1, X_3 = 1 \\}
$$
If
$$
y = \\{ X_2 = 1, X_3 = 1 \\}
$$

Then
$$
I\\{ \xi(Y) = y \\} = 1
$$

{{< /toggle >}}

# Forward Sample
{{< toggle title="Student Example" raw="true" width="40%" >}}

{{< image-text image="/images/books/probabilistic-graphical-models/chapter3/student-ex.png" raw="true" >}}
**Sampling $ D $**

toss a coin that land heads $ (d^1) $ 40% of the time and tails $ (d^0) $ 60%, assume tail landed $ \rightarrow \xi[D] = d^0 $

<br/>

**Sampling $ I $**

assume $ \xi[I] = i^1 $

<br/>

**Sampling $ G $**

Given $ d^0, i^1 \rightarrow $ Choose $ P(G \mid d^0, i^1) $ to sample.

...

{{< /image-text >}}

{{< /toggle >}}

![](/images/books/probabilistic-graphical-models/chapter12/fw-sampling-algo.png)

### Sampling from a Discrete Distribution
TODO: CS 109 or theprobabilitycourse sampling

### Analysis of Error
* $ D = \\{ \xi[1], \dots, \xi[M] \\} $ generated via Forward-sampling
* calculate $ P(Y = y) $
* $ X[i] \sim Bernoulli(P(y)) $, IID. 

$ \rightarrow $ can estimate the expectation of any $ f $

$$
\hat{E_D} (f) = \frac{1}{M} \sum_{m = 1}{M} f (\xi[m])
$$

In case of computing $ P(y) $, $ f $ counts \# of times we see $ y $:

$$
\hat{P_D} (y) = \frac{1}{M} \sum_{m = 1}{M} I \\{ y[m] = m \\}
$$

* $ y[m] $: denotes $ \xi [m] (Y) $ - the assignment to $ Y $ in the particle $ \xi [m] $

**Hoeffding bound**
$$
P_D (\hat{P_D} \notin [P(y)])
$$
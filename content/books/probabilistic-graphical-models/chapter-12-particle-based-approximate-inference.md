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
&= \frac{1}{M} \sum_{1}^{M} f(\xi) = \frac{1}{M} \sum_{1}^{M} I\\{ \xi(Y) = y \\} \\\
&= \boxed{ E_{\xi \sim D} [f(\xi)] = P(Y = y) }
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

# Forward Sampling
* Generate random samples $ \xi[1], \dots, \xi[M] $ from the distribution $ P(\mathcal{X}) $
* difficulties in generating samples from the posterior $ P(\mathcal{X} \mid e) $

## FW-Sampling from a BN
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

## Analysis of Error
* $ D = \\{ \xi[1], \dots, \xi[M] \\} $ generated via Forward-sampling
* Estimate $ P(Y = y) $
* $ I\\{ \xi [m] (Y) = y \\} \sim Bernoulli(P(y)) $, IID
    + because $ I = 1 $ with probability $ P (I = 1) = P (\xi [m] (Y) = y) = P(y) $ and $ 0 $ otherwise.

$ \rightarrow $ can estimate the expectation of any $ f $

$$
\hat{E_D} (f) = \frac{1}{M} \sum_{m = 1}^{M} f (\xi[m])
$$

In case of computing $ P(y) $, $ f $ counts \# of times we see $ y $, we get an estimator:

$$
\hat{P_D} (y) = \frac{1}{M} \sum_{m = 1}^{M} I \\{ y[m] = y \\}
$$

* $ y[m] $: denotes $ \xi [m] (Y) $ - the assignment to $ Y $ in the particle $ \xi [m] $

We can now apply the Hoeffding bound  to show that this estimate is close to the truth with high probability

btw, what's an estimator?

### Hoeffding bound
$$
\boxed{ P_D (\hat{P_D} \notin [P(y) - \epsilon, P(y) + \epsilon]) \leq 2 e^{-2M \epsilon^2} }
$$

We want:
$$
P_D (\hat{P_D} \notin [P(y) - \epsilon, P(y) + \epsilon]) \leq \delta 
$$

* $ \delta $: failure tolarence, a small value.

Thus, we set:
$$
\begin{align*}
&\phantom{\leftrightarrow} 2 e^{-2M \epsilon^2} \leq \delta \\\
&\Leftrightarrow -2M \epsilon^2 \leq \ln (\delta / 2)\\\
&\Leftrightarrow \boxed{ M \geq \frac{\ln (2/s)}{2 \epsilon^2} }
\end{align*}
$$

This is the *required sample size* to get an estimator that only relies on $ (\epsilon, \delta) $
* Does not rely on $ P(y) $

## Conditional Probability Queries
Conditional probabilities of the form $ P(y \mid E = e) $

# Likelihood Weighting and Importance Sampling

+++
title = 'Lecture 5 + 6 + 7: Discrete Random Variables'
date = 2025-03-31T00:15:29+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probability"]
authors = ["John N. Tsitsiklis"]
avatar = "/images/avatar.png"
math = true
section = "6.041SC Probabilistic Systems Analysis and Applied Probability"
weight = 5
postColor = "#B10053"
+++

# Cumulative Distribution Function
* Another method to describe the distribution of random variables. 
* Advantage: Can be defined for any kind of random variable (discrete, continuous, and mixed).

{{< define icon="definition" >}}
The CDF of discrete random variable $X$:
$$
F_X(x) = P(X \leq x) = \sum_{k \leq x}p_X(k), \quad \text{for all } x \in \mathbb{R}
$$
{{< /define >}}

{{< image-text align="left" image="/images/courses/6.041SC/lecture-3-4-5-discrete-random-variables/CDF-explaination.png" alt="CDF explaination" width="40%">}}
* CDF $F_X$ "accumulate" probability "up to" x.

* Think of CDF as running a sliding window across PMF and adding up the probabilities associated with each outcome as that window passes by.
{{< /image-text >}}


## Properties of CDF
piecewise constant and staircase-like form.
{{< image-text align="left" image="/images/courses/6.041SC/lecture-3-4-5-discrete-random-variables/CDF-ex.png" alt="Example" width="50%">}}
1. $F_X$ is **monotonically nondecreasing**:
$$
\text{if } x \leq y \text{, then } F_X(x) \leq F_X(y).
$$
2. $F_X$ tends to 0 as $x \to -\infty$, and to 1 as $x \to \infty$.

3. for all $x_k \in R_x = \\{x_1, x_2, \dots\\}$
$$
\boxed{F_X(x_k) = \sum_{x_k = -\infty}^{x}p_X(x_k)}
$$

$$
\boxed{p_X(x_k) = P(X \leq x_k) - P(X \leq x_k - 1) = F_X(x_k) - F_X(x_k - 1)}
$$

{{< /image-text >}}

{{< toggle title="proof for (2)" >}}
By the axiom of probability,
$$
\lim_{x\to+\infty}F_X(x) = 1.
$$
Using complement rule,
$$
P(X > x) = 1 - P(X \leq x) =  1 - F_X(x).
$$
Recall
$$
P(X \in \mathbb{R}) = 1.
$$
Thus,
$$
\lim_{x \to -\infty} 1 - F_X(x) = P(X > -\infty) = 1 \text{ (Because X is always in some real-valued range)}
$$

$$
\Leftrightarrow \lim_{x \to -\infty} F_X(x) = 0.
$$

{{< /toggle >}}

CDF jumps at each point in the range $\rightarrow$ stays flat between $x_k$ and $x_{k + 1}$.
$$
F_X(x) = F_X(x_k), \text{ for } x_k \leq x < x_k + 1.
$$

{{< callout type="warning" >}}
Jumps in the CDF correspond to points $x$ for which $P(X = x) > 0$.
{{< /callout >}}

## Useful formulas
### $P(a < X \leq b)$
For all $a \leq b$,
$$
\boxed{P(a < X \leq b) = P(X \leq b) - P(X \leq a) = F_X(b) - F_X(a)}
$$

### $P(X \leq x)$
CDF gives us $P(X \leq x)$. To find $P(X < x)$, for a discrete random variable
$$
\boxed{P(X < x) = P(X \leq x) - P(X = x) = F_X(x) - P_X(x)}
$$

{{< callout type="danger" >}}
$<$ and $\leq$ could make a difference in the case of discrete random variables.
{{< /callout >}}

## Quantiles
CDF $F$ is strictly monotonically increasing + $F$ is **bijective**
* **Injective** (one-to-one): $f(x_1) = f(x_2) \Rightarrow x_1 = x_2$.
* **Surjective** (onto): The range of $f$ covers the entire domain.

$\Rightarrow$ it has an inverse, called **inverse cdf**, or **percent point function (ppf)**, or **quantile function**.
+++
title = 'Lecture 5 + 6 + 7: Discrete Random Variables'
date = 2025-03-31T00:15:29+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probability"]
authors = ["Tomodachii"]
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

{{< image-text align="left" image="/images/courses/6.041SC/lecture-3-4-5-discrete-random-variables/CDF-ex.png" alt="Example" width="50%">}}
1. $F_X$ is monotonically nondecreasing:
$$
\text{if } x \leq y \text{, then } F_X(x) \leq F_X(y).
$$
2. $F_X$ tends to 0 as $x \to -\infty$, and to 1 as $x \to \infty$.

3. for all $k \in \mathbb{Z}$
$$
F_X(k) = \sum_{i = -\infty}^{k}p_X(i),
$$

$$
p_X(k) = P(X \leq k) - P(X \leq k - 1) = F_X(k) - F_X(k - 1),
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

## Useful formulas
For all $a \leq b$,
$$
P(a < X \leq b) = P(X \leq b) - P(X \leq a) = F_X(b) - F_X(a).
$$

CDF gives us $P(X \leq x)$. To find $P(X < x)$, for a discrete random variable
$$
P(X < x) = P(X \leq x) - P(X = x) = F_X(x) - P_X(x).
$$
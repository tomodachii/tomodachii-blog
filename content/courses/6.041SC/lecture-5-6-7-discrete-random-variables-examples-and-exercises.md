+++
title = 'Lecture 5 + 6 + 7: Discrete Random Variables - Examples and Exercises'
date = 2025-03-31T09:22:14+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probability"]
authors = ["John N. Tsitsiklis"]
avatar = "/images/avatar.png"
math = true
section = "6.041SC Probabilistic Systems Analysis and Applied Probability"
weight = 6
postColor = "#10987F"
+++


# Cumulative Distribution Function
### Example 3.9
I toss a coin twice. Let X be the number of observed heads. Find the CDF of X.

**Answer**

$X =$ {the number of observed heads}

$X \sim Binomial(2, \frac{1}{2})$, $R_X = \\{0, 1, 2\\}$.

$$
p_X(k) = \binom{n}{k} p^k (1 - p)^{n - k}, \quad \text{for } k = 0, 1, 2.
$$

$$
F_X(x) = P(X \leq x) = \sum_{k \leq x}p_X(k).
$$

* $F_X(0) = p_X(0 \leq x < 1) = p_X(0) = 1 \times \frac{1}{2}^0 \times \frac{1}{2}^{2 - 0} = \frac{1}{4}$
* $F_X(1) = p_X(1 \leq x < 2) = p_X(0) = p_X(0) + p_X(1) = \frac{1}{4} + 2 \times \frac{1}{2}^1 \times \frac{1}{2}^{2 - 1} = \frac{3}{4}$
* $F_X(2) = p_X(x \geq 2) = p_X(0) = p_X(0) + p_X(1) + p_X(2) = \frac{3}{4} + 1 \times \frac{1}{2}^2 + \frac{1}{2}^{2 - 2} = 1$

$$
F_X(x) =
\begin{cases} 
0, & \text{for } x < 0 \\\
\frac{1}{4}, & \text{for } 0 \leq x < 1 \\\
\frac{3}{4}, & \text{for } 1 \leq x < 2 \\\
1, & \text{for } x \geq 2
\end{cases}
$$

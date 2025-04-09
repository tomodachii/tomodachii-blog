+++
title = 'Chapter 3: The kernel method for univariate data'
date = 2025-04-03T21:18:46+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["kde"]
authors = ["B.W. Silverman"]
avatar = "/images/avatar.png"
math = true
section = "Density Estimation for Statistics and Data Analysis"
weight = 3
postColor = "#FF5103"
+++

# Introduction
## Notation and conventions
$X_1, \dots X_n$: a sample of indepdent, identically distributed observations from a continuous univariate distribution.

$f$: the PDF, which we're trying to estimate.

$\hat{f}$: the kernel estimator with
* kernel K,
* window width h.

## Measures of discrepancy
When considering estimation at a single point, a natural measure is the **mean square error (MES)**.
### Mean Square Error
$$
\text{MSE}_x (\hat{f}) = \mathbb{E}\\{ \hat{f}(x) - f(x) \\}^2. \quad (3.1)
$$
By standard elementary properties of mean and variance,
$$
\text{MSE}_x (\hat{f}) = (\mathbb{E}[\hat{f}(x)] - f(x))^2 + \text{Var}(\hat{f}(x)).
$$
{{< toggle title="verification">}}
Let $\mu = E[\hat{f}(x)]$,

$$
\hat{f}(x) - f(x) = (\hat{f}(x) - \mu) + (\mu - f(x)).
$$
* $(\hat{f}(x) - \mu)$: deviation of $\hat{f}(x)$ from its mean.
* $(\mu - f(x))$: bias.

$$
\mathbb{E}[(\hat{f}(x) - f(x))^2] = \mathbb{E}[(\hat{f}(x) - \mu)^2] + \mathbb{E}[2(\hat{f}(x) - \mu)(\mu - f(x))] + \mathbb{E}[(\mu - f(x))^2]
$$
* $(\mu - f(x))$ is constant.
* $\mathbb{E}[(\hat{f}(x) - \mu)] = \mathbb{E}[\hat{f}(x)] - \mu = 0$ (by above definition).

Thus,

$$
\begin{align*}
\mathbb{E}[(\hat{f}(x) - f(x))^2] &= \mathbb{E}[(\hat{f}(x) - \mu)^2] + (\mu - f(x))^2 \\\
&= \text{Var}(\hat{f}(x)) + (\mathbb{E}[\hat{f}(x)] - f(x))^2.
\end{align*}
$$

The sum of the squared bias and the variance at x. There's a trade-off between the bias and variance terms.
{{< /toggle >}}

### Integrated Mean Square Error
$$
\text{MISE}(\hat{f}) = \mathbb{E}\int \\{\hat{f}(x) - f(x)\\}^2 \\\, dx.
$$

Alternative,
$$
\begin{align*}
\text{MISE}(f) &= \int \mathbb{E} \\\{ \hat{f}(x) - f(x) \\\}^2 \\,dx \\\
&= \int \text{MSE}_x(\hat{f}) \\,dx \\\
&= \int ( E \hat{f}(x) - f(x) )^2 \\,dx + \int \text{Var} \\, (\hat{f}(x)) \\,dx.
\end{align*}
$$

# Elementary finite sample properties
Suppose $\hat{f}$ is the general weight function estimate
$$
\hat{f}(t) = \frac{1}{n} \sum_{i = 1}^{n} w(X_i, t).
$$

where $w(x, y)$ is a function of two arguments which satisfies:
$$
\int_{-\infty}^{\infty} w(x, y) \\\, dy = 1
$$

and

$$
w(x, y) \geq 0 \quad \text{for all } x \text{ and } y.
$$

Then for $X_i \sim f(x)$ (true PDF),
$$
\begin{align*}
\mathbb{E}[\hat{f}(t)] &= \frac{1}{n} \sum E[w(X_i, t)] \quad \text{(linearity)} \\\
&= \int w(x, t) \\\, f(x) \\\, dx \quad \text{(LOTUS)}
\end{align*}
$$

$$
\begin{align*}
\text{Var}(\hat{f}(t)) &= \text{Var}(\frac{1}{n} \sum_{i = 1}^{n} \text{Var}(w(X_i, t))) \\\
&= \frac{1}{n^2} \sum_{i = 1}^{n} \text{Var}(w(X_i, t))
\end{align*}
$$

Since all $w(X_i, t)$ are identically distributed, this simplified to:
$$
\begin{align*}
\text{Var}(\hat{f}(t)) &= \frac{1}{n^2} n \text{Var}(w(X_i, t)) \\\
&= \frac{1}{n} \text{Var}(w(X_i, t)) \\\
&= \frac{1}{n} [\int w(x, t)^2 f(x) dx - \\\{\int w(x, t) f(x) dx\\\}^2].
\end{align*}
$$

## Kernel estimate
{{< define >}}
$$
w(x, y) = \frac{1}{h} K (\frac{y - x}{h}).
$$
{{< /define >}}
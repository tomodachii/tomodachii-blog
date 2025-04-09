+++
title = 'Lecture 8: Continuous Random Variables'
date = 2025-03-17T12:11:38+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probability"]
authors = ["John N. Tsitsiklis"]
avatar = "/images/avatar.png"
math = true
section = "6.041SC Probabilistic Systems Analysis and Applied Probability"
weight = 8
postColor = "#5D8B0D"
+++

# Continuous Random Variables and PDFs
{{< define icon="definition" >}}
{{< /define >}}

# Gaussian (normal) PDF
[Important in the theory of probability: Centrail limit theorem](http://example.com).

If you have a phenomenon in which you measure a certain quantity, but that quantity is made up of lots and lots of random contributions.

Then your random variable is actually the sum of lots and lots of independent little random variable. And no matter what kind of distribution the little random variables have, {{< marker >}}their sum will turn out to have approximately a normal distribution.{{< /marker >}}

$\rightarrow$ This makes the normal distribution to arise very nartually in lots and lots of context. Whenever you have noise that's comprise of lots of different independent pieces of noise, then the end result will be a random normal variable.

## Standard normal (Gaussian) random variables
* So what is standard normal? {{< define icon="definition" label="STANDARD NORMAL">}}$$X \sim \mathcal{N}(0, 1): f_X(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}$$ {{< /define >}} {{< toggle title="why $\frac{1}{\sqrt{2\pi}}$ ?" >}} 
$\int_{-\infty}^{\infty}e^{-x^2/2} \, dx = \sqrt{2\pi}$ 
{{< /toggle >}}

!["Standard Normal Explanation"](/images/courses/6.041SC/lecture-8-continuous-random-variables/standard-normal-explain.png "Standard Normal Explanation")


* $\mathbb{E}[X] = 0$
* $\text{Var}(X) = \mathbb{E}[X^2] - 0 = 1$ {{< toggle title="Integrate by parts" raw="true">}}

$
u = x
$

$
dv = xe^{-x^2/2} \, dx \rightarrow v = -e^{-x^2/2}
$

$$
\int udv = uv - \int vdu = \frac{1}{\sqrt{2\pi}}(-xe^{-x^2/2}\Big|_{-\infty}^{\infty} + \int_{-\infty}^{\infty} e^{-x^2/2} \, dx) = 0 + 1 = 1
$$
{{< /toggle >}}


### Example 3.10: Memorylessness of the exponential PDF
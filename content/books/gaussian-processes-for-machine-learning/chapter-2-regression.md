+++
title = 'Chapter 2: Regression'
date = 2025-03-17T23:02:53+07:00
draft = true
description = ""
image = ""
imageBig = ""
categories = ["machine-learning", "gaussian-process"]
authors = ["Carl Edward Rasmussen", "Christopher K. I. Williams"]
avatar = "/images/avatar.png"
math = true
section = "Gaussian Processes for Machine Learning"
weight = 2
postColor = "#10987F"
+++

Supervised learning
- regression $\rightarrow$ the prediction of continuous quantities.
- classification $\rightarrow$ discrete class labels.

This chapter focuses on regression problems.

# 2.1 Weight-Space View
We have a training set $\mathcal{D}$ of $n$ observations.

### Dataset structure
$$\mathcal{D} = \\{(x_i, y_i) \mid i = 1, \dots, n\\}$$
* $x_i$: column input vector (covariates) of dimension $D$,
    + $x_i \in X \subset \mathbb{R}^D$.
* $X$: $D \times n$ design matrix.
    + $n$ observations (data points), 
    + each input $x_i$ has $D$ features (dimensions).
$$
X = \begin{bmatrix}
x_{1,1} & x_{1,2} & \cdots & x_{1,n} \\\
x_{2,1} & x_{2,2} & \cdots & x_{2,n} \\\
\vdots & \vdots & \ddots & \vdots \\\
x_{D,1} & x_{D,2} & \cdots & x_{D,n}
\end{bmatrix}
$$

* $y_i$: a scalar output (its value depends on the covariates $\rightarrow$ dependent variable).
$$
y = \begin{bmatrix}
y_1\\\
y_2\\\
\vdots\\\
y_n
\end{bmatrix}
$$

### Dataset Organization
Input vectors are arranged into a $D \times n$ design matrix $X$.
Outputs are collected into a vector $y$. Thus the dataset is represented as $\mathcal{D} = (X, y)$.

### Dataset Organization
The goal is to infer the conditional distribution $p(y \mid x)$ $\rightarrow$ captures the relationship between the inputs and outputs.

## 2.1.1 The Standard Linear Model

### Standard linear regression model with Gaussian noise
$$
f(x) = x^\top w, \quad y = f(x) + \varepsilon,
$$
* $x$: the input vector.
* $w$: the weight (parameter) vector.
* $f(x)$: the linear function (the predicted output before noise).
* $y$: actual observed value, which includes the predicted value plus noise.
* $\varepsilon$: additive Gaussian noise.
    + Noise assumption: $\varepsilon \sim \mathcal{N}(0, \sigma_n^2)$

{{< toggle title="Often a bias weight or offset is included!" >}}
<ul>
    <li>Allows the model to shift up or down rather than always passing through the origin. 
    <li>But this can be implemented by augmenting the input vector $x$ with an additional element $x_0 = 1$:
    $$
    \tilde{\mathbf{x}} =
    \begin{bmatrix}
    1 \\\
    x_1 \\\
    x_2 \\\
    \vdots \\\
    x_D
    \end{bmatrix}
    $$
    Here, $\tilde{\mathbf{x}}$ now has $D + 1$ dimensions.
    <li>Similarly,
    $$
    \tilde{\mathbf{w}} =
    \begin{bmatrix}
    b \\\
    w_1 \\\
    w_2 \\\
    \vdots \\\
    w_D
    \end{bmatrix}
    $$

    Now, the first weight \(b\) acts as the bias.

    Thus,
    $$
    y = \tilde{\mathbf{x}}^\top \tilde{\mathbf{w}} + \varepsilon
    $$
</ul>
{{< /toggle >}}

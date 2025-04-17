+++
title = 'Chapter 1 + 2: Introduction and Foundations'
date = 2025-03-19T20:33:47+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic-graphical-models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 1
postColor = "#B10053"
+++

# Independence and Conditional Independence

## Independence

* Random variables $X$ and $Y$ are **not independent**, i.e., $X \\not\\perp\\!\\!\\!\\perp Y$, if there exists two values of $Y$, say $y_1$ and $y_2$, such that
$$
P(X \mid Y = y_1) \neq P(X \mid Y = y_2).
$$

# Number of parameteres of a distribution
Given discrete random variables $X_1, \dots, X_n$ that take $\alpha_1, \dots, \alpha_n$ values, respectively, number of parameters to represent:
* $P(X_1, X_2, \dots, X_n) \rightarrow \alpha_1 \alpha_2 \dots \alpha_n$.
* $P(X_1 \mid X_2, \dots, X_n) \rightarrow (\alpha_1 - 1) \alpha_2 \dots \alpha_n$.
{{< toggle title="explain" >}}
!["Number of params"](/images/books/probabilistic-graphical-models/chapter1+2/number-of-params.png "Number of params")
{{< /toggle >}}
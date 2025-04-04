+++
title = 'Chapter 1 + 2: Introduction and Survey of existing methods'
date = 2025-04-03T20:56:10+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["kde"]
authors = ["Tomodachii"]
avatar = "/images/avatar.png"
math = true
section = "Density Estimation for Statistics and Data Analysis"
weight = 1
postColor = "#FF5103"
+++

# Density Estimation
Consider random variable $X$ that has PDF $f$
$$
P(a < X < b) = \int_{a}^{b} f(x) dx, \quad \text{for all } a < b.
$$

Known: A set of observed data points sample from an unknow PDF.
{{< define >}}
Density estimation is the construction of an estimate of the density function from the observed data.
{{< /define >}}

This book focuses on **nonparametric** approach.

# Histograms
Given
* origin $x_0$
* bin width $h$

The bins of the histogram is the intervals $[x_0 + mh, x_0 + (m + 1)h]$ for $m \in \mathbb{Z}$.

The histogram
{{< define >}}
{{< /define >}}
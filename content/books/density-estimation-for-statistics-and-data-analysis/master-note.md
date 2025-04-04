+++
title = 'Master Note'
date = 2025-04-04T15:18:40+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["kde"]
authors = ["Tomodachii"]
avatar = "/images/avatar.png"
math = true
section = "Density Estimation for Statistics and Data Analysis"
weight = 0
postColor = "#10987F"
+++

# Histograms
**a priori bining**: the bin boundaries are determined before observing the data.
* choose the number of bins and their widths based on some theoretical considerations or prior knowledge about the data.

**Data-Dependent Binning**: This method involves determining the bin boundaries based on the observations
* analyze the data first and then decide how to bin it. For example, you could use techniques that adapt the bin widths based on the density of the data (e.g., variable-width bins where denser areas have narrower bins).
* clustering or data-driven approaches.

# The naive estimator
If the random variable $X$ has density $f$, then
$$
f(x) = \lim_{h \to 0} \frac{1}{2h} P(x - h < X < x + h).
$$

We have an x and we're looking for its neighbours in a $2h$ bin.

For any given $h$, we can estimate $P(x - h < X < x + h)$ by the proportion of the sample falling in the interval $(x - h, x + h)$. Thus a natural estimator $\hat{f}$ of the density is given by choosing a small number $h$

$$
\hat{f}(x) = \frac{\\#\\{X_1, \dots, X_n \text{ falling in } (x - h, x + h)\\}}{2hn}.
$$

Define the weight function
$$
w(x) =
\begin{cases}
\frac{1}{2}, & \text{if } |x| < 1 \\\
0, & \text{otherwise}
\end{cases}
$$

This weight function serves as a simple indicator function that determines whether a given point $x$ should contribute to the density estimate. 

Then
$$
\hat{f}(x) = \frac{1}{n} \sum_{i=1}^{n} \frac{1}{h} w\left( \frac{x - X_i}{h} \right).
$$

* The weight function $w$ defines a box of width $2h$ centered at $x$. If $|x - X_i| < h$ (falls within this box), it contributes equally to the density estimate, else it got ignored.
* The function assigns an equal weight to all points within the interval $(x - h, x + h)$. 
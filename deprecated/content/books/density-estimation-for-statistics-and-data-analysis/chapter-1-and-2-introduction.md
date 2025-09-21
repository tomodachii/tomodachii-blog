+++
title = 'Chapter 1 + 2: Introduction and Survey of existing methods'
date = 2025-04-03T20:56:10+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["kde"]
authors = ["B.W. Silverman"]
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
$$
\hat{f}(x) = \frac{1}{nh}
$$
{{< /define >}}

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

{{< define >}}
$$
\hat{f}(x) = \frac{\\#\\{X_1, \dots, X_n \text{ falling in } (x - h, x + h)\\}}{2hn}.
$$
{{< /define >}}

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
{{< define >}}
$$
\hat{f}(x) = \frac{1}{n} \sum_{i=1}^{n} \frac{1}{h} w\left( \frac{x - X_i}{h} \right).
$$
{{< /define >}}

* The weight function $w$ defines a box of width $2h$ centered at $x$. 
* If $|x - X_i| < h$ (falls within this box) $\rightarrow$ contributes equally to the density estimate, else it got ignored.
* The function assigns an equal weight to all points within the interval $(x - h, x + h)$.

{{< callout type="danger" >}}
Instead of fixed bin, naive estimator "centers" the estimate around x.
{{< /callout >}}

{{< callout type="warning" >}}
* $\hat{f}(x)$ is not continuos
    + has jump at $X_i \pm h$
* "zero deviation everywhere"
    + within $(X_i - h, X_i + h)$, $\hat{f}(x)$ is flat (constant).
{{< /callout >}}

# The kernel estimator
Replace the weight function $w$ by a kernel function $K$ such that
$$
\int_{-\infty}^{\infty} K(x) \\\, dx = 1.
$$

Usually but not always, $K$ will be a symmetric PDF (normal, for instance).

The kernel estimator with kernel $K$
{{< define >}}
$$
\hat{f}(x) = \frac{1}{nh} \sum_{i = 1}^{n} K(\frac{x - X_i}{h}).
$$
{{< /define >}}
where $h$ is the window width (or smoothing parameter or bandwidth).

{{< image-text image="/images/books/density-estimation-for-statistics-and-data-analysis/chapter-1-and-2/kernel-estimator-ex.png" align="left" width="30%" >}}
The kernel estimator is a sum of "bumps" placed at the observations.
* The kernel function $K$ determines the shape of the bumps.
* The window width $h$ determines their width.
{{< /image-text >}}

In KDE, the bandwidth (or window width) is fixed across the entire data sample. This causes issues when the data has a long tail, as smaller densities in the tails may create spurious noise in the estimated density function.
* If the bandwidth is too small, the estimate is very noisy, particularly in the tails.
* If the bandwidth is too large, the KDE smooths out important details in the central part of the distribution.

# The nearest neighbour method
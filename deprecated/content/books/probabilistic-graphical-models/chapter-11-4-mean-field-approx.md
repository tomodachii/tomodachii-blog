+++
title = 'Chapter 11 (Pt. 3): Mean Field Approximation'
date = 2025-05-28T10:57:03+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic-graphical-models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 14
postColor = "#0085C8"
+++

### Structured Variational
Optimize the energy function over a family $ \mathcal{Q} $, which is
* chosen to be computationally tractable
* hence, not sufficiently expressive to capture all of the info in $ P_\Phi $.

{{< define >}}
**Find** $ Q \in \mathcal{Q} $

**maximizing** $ F[\tilde{P_\Phi}, Q] $
{{< /define >}}

# Mean Field Approximation

### Mean Field Assumption
$$
Q(\mathcal{X}) = \prod_i Q(X_i)
$$
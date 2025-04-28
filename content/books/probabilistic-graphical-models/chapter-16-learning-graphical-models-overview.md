+++
title = 'Chapter 16: Learning Graphical Models - Overview'
date = 2025-04-15T14:18:01+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic-graphical-models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 16
postColor = "#E90808"
+++

* $P^*$: true distribution 
    + (in many cases but not always) corresponding to a PGM $\mathcal{M}^*$.
* $D = \\\{d[1], \dots , d[m]\\\}$ sampled from $P^*$.

# Goals
A model $ \tilde{M} $ precisely captures the distribution $ P^* $.

## Density Estimation
{{< define icon="definition" >}}
Constructing a model $ \tilde{M} $ such that $ \tilde{P} $ is "close" to $ P^* $.
{{< /define >}}
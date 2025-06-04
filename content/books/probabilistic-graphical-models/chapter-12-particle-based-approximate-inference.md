+++
title = 'Chapter 12: Particle-Based Approximate Inference'
date = 2025-06-04T18:33:28+07:00
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
postColor = "#FF5103"
+++

**General framework**

* $ P (\mathcal{X}) $
* $ Y \subseteq \mathcal{X} $
* $ y \in Val(Y) $

# Forward Sample
{{< toggle title="Student Example" raw="true" width="40%" >}}

{{< image-text image="/images/books/probabilistic-graphical-models/chapter3/student-ex.png" raw="true" >}}
**Sampling $ D $**

toss a coin that land heads $ (d^1) $ 40% of the time and tails $ (d^0) $ 60%, assume tail landed $ \rightarrow \xi[D] = d^0 $

<br/>

**Sampling $ I $**

assume $ \xi[I] = i^1 $

<br/>

**Sampling $ G $**

Given $ d^0, i^1 \rightarrow $ Choose $ P(G \mid d^0, i^1) $ to sample.

...

{{< /image-text >}}

{{< /toggle >}}

![](/images/books/probabilistic-graphical-models/chapter12/fw-sampling-algo.png)

### Sampling from a Discrete Distribution
TODO: CS 109 or theprobabilitycourse sampling


+++
title = 'Chapter 8 the Exponential Family'
date = 2025-04-26T22:11:05+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic-graphical-models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 8
postColor = "#0085C8"
+++

# Exponential Families
**parametric family:** Representation of a single distribution using BN or Markov network.

<br/>

**family of distributions:** A set of distributions
* all share the same parametric form
* differ in choice of particular parameters
    + for ex: the entries in table-CPDs.

### Exponential family
{{< define >}}
Exponential family $ \mathcal{P} $ over $ \mathcal{X} $ is specified by four components:
* **Sufficient statistic function $ \tau $** 
    + maps an assignment $ \xi \to $ a vector in $ \mathbb{R}^K $.
    + extract key features from a sample $ \xi $.
* **Parameter space**, a convex subset $ \Theta \subseteq \mathbb{R}^M $ of legal parameters.
* **Natural parameter function $ t: \mathbb{R}^M \to \mathbb{R}^K $** 
    + transforms parameters $ \theta $ into "natural" parameter space.
    + "weight" the features extract by $ \tau $.
* **Auxiliary measure $ A $** over $ \mathcal{X} $.

Each vector of parameters $ \theta \in \Theta $ specifies a distribution $ P_{\theta} $ in the family
$$
\boxed{ P_\theta(\xi) = \frac{1}{Z(\theta)} A(\xi) \exp\left( \langle t(\theta), \tau(\xi) \rangle \right) }
$$

* $ \left( \langle t(\theta), \tau(\xi) \rangle \right) $: dot product.
* $ Z(\theta) $: **partition function** of $ \mathcal{P} $, must be finite, ensuring that the probabilities sum (or integrate) to 1.
$$
\boxed{ Z(\theta) = \sum_{\xi} A(\xi) \exp\\{ \langle t(\theta), \tau(\xi) \rangle \\} }
$$

* The **parametric family** $ \mathcal{P} $
$$
\boxed{ \mathcal{P} = \\{ P_{\theta} : \theta \in \Theta \\} }
$$
{{< /define >}}

{{< toggle title="Exampe 8.2: Bernoulli distribution" >}}

Bernoulli
$$
P(X) = p^X (1 - p)^{1 - X}
$$

Extract key features: the information $ X = 0 $ or $ X = 1 $ from sample.

$$
\tau(X) = \langle \mathbb{I}\\{ X = x^1 \\}, \mathbb{I}\\{ X = x^0 \\} \rangle
$$
* Input: outcome $ X (X = 0, X = 1) $
* Output: a vector that summarizes important information about $ X $.

{{< /toggle >}}
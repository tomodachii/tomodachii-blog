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

## Exponential family
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

### Bernoulli distribution
{{< toggle title="Expand">}}

$ X \sim Bernoulli(\theta) $
* $ X = x^1 (1)$ happens with probability $ \theta $,
* $ X = x^0 (0)$ happens with probability $ 1 - \theta $.

That is:
$$
P(X = x^1) = \theta, \quad P(X = x^0) = 1 - \theta
$$

<br/>

**1. The sufficient statistic $ \tau(X) $**

$$
\boxed{ \tau(X) = \langle \mathbb{I}\\{ X = x^1 \\}, \mathbb{I}\\{ X = x^0 \\} \rangle }
$$
* If $ X = x^1 $, then $ \tau(X) = (1, 0) $.
* If $ X = x^0 $, then $ \tau(X) = (0, 1) $.

**2. The natural parameters $ t(\theta) $**
$$
\boxed{ t(\theta) = (\ln\theta, \ln(1 - \theta)) }
$$
* $ \ln\theta \times \tau(X) $ ((1, 0) or (0, 1)), then later **exponentiate** $ \rightarrow $ recover exactly $ \theta $.

<br/>

For $ X = x^1 $, $ \tau(X) = \langle 1, 0 \rangle $
$$
\exp\\{ \langle t(\theta), \tau(X) \rangle \\} = e^{1 \times \ln{\theta} + 0 \times \ln{(1 - \theta)}} = \theta
$$

For $ X = x^0 $, $ \tau(X) = \langle 0, 1 \rangle $
$$
\exp\\{ \langle t(\theta), \tau(X) \rangle \\} = e^{0 \times \ln{\theta} + 1 \times \ln{(1 - \theta)}} = 1 - \theta
$$

Set $ Z(\theta) = 1 $, this representation is identical to the Bernoulli distribution.

{{< /toggle >}}

### Gaussian distribution
{{< toggle title="Expand" >}}

$$
P(x) = \frac{1}{\sqrt{2\pi} \sigma} \exp \left\\{ - \frac{(x - \mu)^2}{2 \sigma^2} \right\\}.
$$

Expand the squared term

$$
\begin{align*}
-\frac{(x - \mu)^2}{2 \sigma^2} &= - \frac{x^2 - 2\mu x + \mu^2}{2 \sigma^2} \\\
&= -\frac{x^2}{2 \sigma^2} + \frac{\mu x}{\sigma^2} - \frac{\mu^2}{2 \sigma^2}.
\end{align*}
$$

Full expression
$$
P(x) = \frac{1}{\sqrt{2\pi} \sigma} \exp \left\\{ - \frac{x^2}{2 \sigma^2} + \frac{\mu x}{\sigma^2} - \frac{\mu^2}{2 \sigma^2} \right\\}.
$$

Goal: Match with exponential family form
$$
P_\theta(\xi) = \frac{1}{Z(\theta)} A(\xi) \exp\left( \langle t(\theta), \tau(\xi) \rangle \right).
$$

**1. Sufficient statistic $ \tau(x) $**
$$
\boxed{ \tau(x) = \langle x, x^2 \rangle }
$$

**2. Natural parameter $ t(\mu, \sigma^2) $**
$$
\boxed{ t(\mu, \sigma^2) = \langle \frac{\mu}{\sigma}, -\frac{1}{2 \sigma^2} \rangle }
$$

Then
$$
\langle \tau(x), t(\mu, \sigma^2) \rangle = - \frac{x^2}{2 \sigma^2} + \frac{\mu x}{\sigma^2}.
$$

This almost matches the full expression above except for the constant: $ -\frac{\mu^2}{2 \sigma^2} $

$ \rightarrow $ push that constant into the normalizer (partition function).

**3. Partition function $ Z $**
$$
\boxed {Z(\mu, \sigma^2) = \sqrt{2\pi} \sigma \exp \left\\{ \frac{\mu^2}{2\sigma^2} \right\\} }
$$

{{< /toggle >}}

{{< callout type="warning" >}}
**Desiderata**
* Parameter space $ \Theta $
    + "well-behaved": {{< marker >}}convex{{< /marker >}}, {{< marker >}}open{{< /marker >}} subset of $ \mathbb{R}^M $.
        - open: does not include its boudary.
        - convex
* Parametric family $ \mathcal{P} $
    + *nonredundant*: each choice of parameters represent a unique distribution
        - $ \theta \not= \theta^{\prime} \implies P_{\theta} \not= P_{\theta^{\prime}} $.
        - check that a family is nonredundant iff $ t $ is invertible over the set $ \Theta $.
{{< /callout >}}

# Linear Exponential Family

### Natural Parameter
* $ t $ is identity function: $ t(\theta) = \theta $.
* The parameters $ \theta $ are the same dimension $ K $ as the representation of the data.
    + called *natural parameters* for the given sufficient statistic function. {{< toggle title="natural">}} It's "natural" because it appears in the formula without needing to transform it. {{< /toggle >}}

### Natural parameter space
Set of allowable natural parameters for a sufficient statistics function $ \tau $
$$
\boxed{ \Theta = \left\\{ \theta \in \mathbb{R}^K: \int \exp \\{ \langle \theta, \tau(\xi) \rangle \\} \\, d\xi < \infty \right\\} }
$$

{{< callout type="info" >}}
In case of distributions over finite discrete spaces, all parameter choices lead to normalizable distributions, therefore
$$
\Theta = \mathbb{R}^K
$$
{{< /callout >}}

### Linear Exponential Family
{{< define >}}
An exponential family over the **natural parameter space**, and for which the natural parameter space is **open and convex**
$$
\boxed{ P_{\theta} = \frac{1}{Z(\theta)} \exp \\{ \langle \theta, \tau(\xi) \rangle \\} }
$$
* $ \theta $: natural parameter.
{{< /define >}}

* Simplifies the definition of a family.
    + Only need to define $ \tau $.

{{< callout type="danger" >}}
Not every natural parameter $ \theta $ makes a legal distribution.
{{< /callout >}}

{{< toggle title="Gaussian Example: Parameterization of a nonlinear exponential family as a linear exponential family">}}

Convert sufficient statistic function into natural parameter
$$
\eta = t(\mu, \sigma^2) = \langle \frac{\mu}{\sigma}, -\frac{1}{2 \sigma^2} \rangle
$$

Then the probability looks like:
$$
P_{\eta}(x) \propto \exp \\{ \langle \eta, \tau(x) \rangle \\}
$$

Is every $ \eta $ valid? For the distribution to be normalized, we need to be able to compute $ Z(\eta) $, in other word
$$
\begin{align*}
Z(\eta) &= \int \exp \\{ \langle \eta, \tau(x) \rangle \\} \\, dx \\\
&= \int_{-\infty}^{\infty} \exp \\{ \eta_1 x + \eta_2 x^2 \\} \\, dx
\end{align*}
$$
must be finite.

* If $ \eta_2 \geq 0 $, the exp can blow up $ \rightarrow $ the integral does not exist. Thus its not a valid distribution.
* If $ \eta_2 < 0 $ (always for Gaussian, since $ -\frac{1}{2 \sigma^2} < 0 $), the integral does converge.
{{< /toggle >}}

# Factored Exponential Families

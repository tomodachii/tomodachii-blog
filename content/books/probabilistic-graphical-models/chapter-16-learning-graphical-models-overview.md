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

Evaluate the quality of an approximation $ \tilde{M} $ using one commonly option: relative entropy distance measure
$$
\boxed{ \mathbb{D} (P^\* || \tilde{P}) = \mathbb{E}_{\xi \sim P^*} \left[ \log{\frac{ P^{\*} (\xi) }{\tilde{P} (\xi)}} \right] }
$$
* $ \mathbb{D} (P^\* || \tilde{P}) = 0 $ when $ P^\* = \tilde{P} $.
* measures the extent of the compression loss (in bits) of using $ \tilde{P} $ rather than $ P^\* $.

{{< callout type="danger" >}}
Problem is, to use this metric, we need to know $ P^\* $ (which we don't in many cases).
{{< /callout >}}

### Expected log-likelihood
$$
\begin{align*}
\mathbb{D} (P^\* || \tilde{P})
&= E_{\xi \sim P^\*} \left[ \log \frac{P^\* (\xi)}{\tilde{P} (\xi)} \right] \\\
&= E_{\xi \sim P^\*} [\log P^\* (\xi) - \log \tilde{P}(\xi)] \\\
&= E_{\xi \sim P^\*} [\log P^\* (\xi)] - E_{\xi \sim P^\*} [\log \tilde{P}(\xi)] \\\
&\boxed{ = -H_{P^\*} (\mathcal{X}) - E_{\xi \sim P^\*} [\log \tilde{P}(\xi)] }
\end{align*}
$$

* $ -H_{P^\*} (\mathcal{X}) $ does not depend on $ \tilde{P} \rightarrow $ does not affect the comparison.
* focus on $ E_{\xi \sim P^\*} [\log \tilde{P}(\xi)] $
    + This term is called **expected log-likelihood** of candidate model $ \tilde{P} $.
    + The higher this quantity, the more probability mass $ \tilde{P} $ assigns to likely outcomes from the true data $ \rightarrow $ prefer models that maximizing this terms.

{{< callout type="danger" >}}
This tells us which model is likely closer to $ P^\* $. We can't compute this since we don't know $ P^\* $.
{{< /callout >}}

### Likelihood
Likelihood of the data given a model $ \mathcal{M} $
$$
P(\mathcal{D} : \mathcal{M})
$$

### Log-likelihood
$$
l(\mathcal{D} : \mathcal{M}) = \log P(\mathcal{D} : \mathcal{M})
$$

### Loss Function 
$$ 
loss(\xi : \mathcal{M}) 
$$ 
* measures the loss that a model $ \mathcal{M} $ makes on a particular instance $ \xi $ sampled from $ P^\* $.
* (ONLY) reflects cost (in bits) per instance of using the model $ \tilde{P} $ 

{{< callout type="danger" >}}
Loss function tells us how bad a prediction is for **one specific instance**. But good model $ \mathcal{M} $ should perform well **on average**, across all possible inputs drawn from $ P^\* $.
{{< /callout >}}

### Expected loss (aka Risk)

Expected loss of model $ \mathcal{M} $ reflects how much loss we expect the model to incur **on average**, if we drew data from the true distribution $ P^\* $.

$$
E_{\xi \sim P^\*} [loss (\xi : \mathcal{M})].
$$

{{< callout type="info" >}}
Goal: Find a model that minimizes the **Expected loss** or **risk**
{{< /callout >}}

* True average loss model $ \mathcal{M} $ would incur on all possible data drawn from true distribution $ P^\* $.
* Problem is $ P^\* $ is unkwown $ \rightarrow $ can't compute this.
    + However, we can approximate the expectation using an empirical risk averaged over a data set $ \mathcal{D} $ sampled from $ P^\* $.

### Empirical Risk
$$
E_{\mathcal{D}} [loss(\xi : \mathcal{M})] = \frac{1} {| \mathcal{D} |} \sum_{\xi \in \mathcal{D}} loss(\xi : \mathcal{M})
$$

Consider data set $ \mathcal{D} = \\{ \xi[1], \dots, \xi[M] \\}$, assume IID instances, likelihood
$$
P(\mathcal{D} : \mathcal{M}) = \prod_{m = 1}^M P(\xi[m] : \mathcal{M}).
$$

Log-likelihood
$$
\log P(\mathcal{D} : \mathcal{M}) = \sum_{m = 1}^M \log P(\xi[m] : \mathcal{M})
$$


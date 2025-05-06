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

## Learning Task I: Density Estimation
{{< define icon="definition" >}}
Goal: Constructing a model $ \tilde{M} $ such that $ \tilde{P} $ is "close" to $ P^* $.
{{< /define >}}

Evaluate the quality of an approximation $ \tilde{M} $ using one commonly option: relative entropy distance measure
$$
\boxed{ \mathbb{D} (P^\* || \tilde{P}) = \mathbb{E}_{\xi \sim P^*} \left[ \log{\frac{ P^{\*} (\xi) }{\tilde{P} (\xi)}} \right] }
$$
* $ \mathbb{D} (P^\* || \tilde{P}) = 0 $ when $ P^\* = \tilde{P} $.
* measures the extent of the compression loss (in bits) of using $ \tilde{P} $ rather than $ P^\* $.

$$
\begin{align*}
\mathbb{D} (P^\* || \tilde{P})
&= E_{\xi \sim P^\*} \left[ \log \frac{P^\* (\xi)}{\tilde{P} (\xi)} \right] \\\
&= E_{\xi \sim P^\*} [\log P^\* (\xi) - \log \tilde{P}(\xi)] \\\
&= E_{\xi \sim P^\*} [\log P^\* (\xi)] - E_{\xi \sim P^\*} [\log \tilde{P}(\xi)] \\\
&\boxed{ = -H_{P^\*} (\mathcal{X}) - E_{\xi \sim P^\*} [\log \tilde{P}(\xi)] }
\end{align*}
$$

* $ -H_{P^\*} (\mathcal{X}) $ does not depend on $ \tilde{P} \rightarrow $ minimizing KL divergence is equivalent to maximizing the **expected log-likelihood** $ E_{\xi \sim P^\*} [\log \tilde{P}(\xi)] $ of candidate model $ \tilde{P} $.
    + The higher this quantity, the more probability mass $ \tilde{P} $ assigns to likely outcomes from the true data $ \rightarrow $ prefer models that maximizing this terms.

### Expected log-likelihood
Measures how well model $ \mathcal{M} $ would perform on **unseen data** drawn from true distribution $ P^\* $.
$$ 
\boxed{ E_{\xi \sim P^\*} [\log \tilde{P}(\xi \mid \mathcal{M})] }
$$
* This is a theoretical quantity
    + since $ P^\* $ is unknown, this can't be compute exactly.

{{< callout type="info" >}}
This is what we really care about (how model predicts new data), not training set likelihood.
{{< /callout >}}

{{< callout type="danger" >}}
Problem is, to use this metric, we need to know $ P^\* $ (which we don't in many cases) $ \rightarrow $ Approximate the expected log-likelihood with the empirical log-likelihood (a Monte Carlo estimate).
{{< /callout >}}

### (Training Set) Likelihood
A simple metric is **Training set likelihood**.

Consider data set $ \mathcal{D} = \\{ \xi[1], \dots, \xi[M] \\}$, assume IID instances, likelihood of the data given model $ \mathcal{M} $
$$
\boxed{ P(\mathcal{D} : \mathcal{M}) = \prod_{m = 1}^M P(\xi[m] : \mathcal{M}) }
$$

### Log-likelihood
$$
\boxed{ l(\mathcal{D} : \mathcal{M}) = \log P(\mathcal{D} : \mathcal{M}) = \sum_{m = 1}^M \log P(\xi[m] : \mathcal{M}) }
$$

{{< toggle title="why log?" >}}
+ Turns products into sums
+ Penalizes overconfident wrong predictions more harshly.
+ Ensures convexity, which helps in optimization.
{{< /toggle >}}

### Loss Function
Penalize unlikely predictions

$$ 
\boxed{ loss(\xi : \mathcal{M}) }
$$

* measures the loss that a model $ \mathcal{M} $ makes on a particular instance $ \xi $ sampled from $ P^\* $.
* (ONLY) reflects cost (in bits) per instance of using the model $ \tilde{P} $.

<br/>

Example: $ \text{log-loss} = -\log P(\xi: \mathcal{M}) $

{{< callout type="danger" >}}
Loss function tells us how bad a prediction is for **one specific instance**. But good model $ \mathcal{M} $ should perform well **on average**, across all possible inputs drawn from $ P^\* $.
{{< /callout >}}

### Expected loss (aka Risk)

Expected loss of model $ \mathcal{M} $ reflects how much loss we expect the model to incur **on average**, if we drew data from the true distribution $ P^\* $.

$$
\boxed{ E_{\xi \sim P^\*} [loss (\xi : \mathcal{M})] }
$$

{{< callout type="info" >}}
Goal: Find a model that minimizes the **Expected loss** or **risk**
{{< /callout >}}

* True average loss model $ \mathcal{M} $ would incur on all possible data drawn from true distribution $ P^\* $.
* Problem is $ P^\* $ is unkwown $ \rightarrow $ can't compute this.
    + However, we can approximate the expectation using an empirical risk averaged over a data set $ \mathcal{D} $ sampled from $ P^\* $.

### Empirical Risk
$$
\boxed{ E_{\mathcal{D}} [loss(\xi : \mathcal{M})] = \frac{1} {| \mathcal{D} |} \sum_{\xi \in \mathcal{D}} loss(\xi : \mathcal{M}) }
$$

Say, plug in the log-loss
$$
loss(\xi : \mathcal{M}) = - \log P(\xi : \mathcal{M}).
$$

The Empirical risk (Empirical log-loss)
$$
E_{\mathcal{D}} [loss(\xi : \mathcal{M})] = -\frac{1} {| M |} \sum_{m = 1}^M \log P(\xi[m] : \mathcal{M})
$$

## Learning Task II: Prediction Tasks
{{< define icon="definition" >}}
Goal: Fit $ P^\* $ as well as possible to perform infer $ P(Y \mid X) $.
{{< /define >}}
### Clasification Task
Examples
* given a set $ X $ of words, variable $ Y $ labels the document topic.
* given the image features $ X $, predict class labels for all of the pixels in the image $ Y $.

Queries
* conditional: $ h_{\tilde{P}} = \tilde{P}( Y \mid x ) $.
* MAP assignment: $ h_{\tilde{P}} = \argmax_y \tilde{P} (y \mid x) $.

### Classification Error (0/1 loss)
Probability that our classifier selects the wrong labels over all $ (x, y) $ sampled from $ \tilde{P} $
$$
\boxed{ E_{(x, y) \sim \tilde{P}} [\mathbb{I} \\{ h_{\tilde{P}} (x) \not= y \\}] }
$$
* Suitable for single-label classification
    + each input $ x $ has one correctly label $ y $.
* Not suitable for multi-label tasks (e.g, Img Segmentation)
    + Input $ x $ is an image with $ d $ pixels, each pixel has a label (e.g, road, car, sky ...)
    + Labels $ y = [y_1, y_2, \dots, y_d] $.
    + If $ h_{\tilde{P}} $ differs from $ y $ even in one pixel, the entire prediction is counted as wrong.
        - This is too harsh, we don't want it.

### Hamming Loss
A performance metric, counts the number of variables $ Y $ in which $ h_{\tilde{P}} $ differs from the ground truth $ y $
$$
\boxed{ E_{(x, y) \sim \tilde{P}} \left[ \frac{1}{d} \sum_{i = 1}^d \mathbb{I} \\{ h_{\tilde{P}} (x) \not= y \\} \right] }
$$
* $ h_{\tilde{P}} (\text{or } \hat{y} ) $ and $ y $ are vectors of $ d $ dimensions.

### Conditional log-likelihood
The confidence of the prediction. Measures how well a model predicts the output $ y $ given input $ x $.
$$
\boxed{ E_{(x, y) \sim P^\*} [\log \tilde{P}(y \mid x)] }
$$
* Rather than simply checking whether the model got the label right or wrong (like in 0/1 loss), conditional log-likelihood looks at "How much probability did the model assign to the correct label?"

## Learning Task III: Knowledge Discovery
We do not care about using model or any particular inference task, but rather about discovering the knowledge about $ P^\* $ itself.

{{< define icon="definition" >}}
Goal: Knowledge discovery or structure discovery of correct model $ \mathcal{M}^\* $.
* Distinguish direct vs indirect dependencies.
* Possibly directionality of edges.
* Presence and location of hidden variables.
{{< /define >}}

{{< callout type="danger" >}}
Even with large amounts of data, the true model may not be identifiable.
{{< /callout >}}

## A slightly different POV
Learning a Bayesian network can be split into two main components: structure learning and parameter learning
* **Structure learning:** Given a set of data samples, estimate a Directed Acyclic Graph (DAG) that captures the dependencies between variables.
* **Parameter learning:** Given a set of data samples and a DAG that captures the dependencies between variables, estimate the (conditional) probability distributions of the individual variables.

# Learning as Optimization
Optimize Problem.
* a hypothesis space
* a set of candidate models
* an objective function.

## Empirical Distribution
Task: Select a model $ \mathcal{M} $ that optimizes expected of a loss function $ E_{\xi \sim P^\*} [loss(\xi : \mathcal{M})] $.

$ P^\* $ is unknown $ \rightarrow $ use data set $ \mathcal{D} $ sampled from $ P^\* $ to define an epirical distribution
$$
\boxed{ \hat{P}_{\mathcal{D}} (A) = \frac{1}{M} \sum_m \mathbb{I} \\{ \xi[m] \in A \\} }
$$

### Overfitting
Selecting $ \mathcal{M} $ to optimize training set likelihood overfits to statistical noise.
* Parameter overfitting
    + Parameters fit random noise in training data $ \rightarrow $ avoid by using regularization/ parameter priors.
* Structure overfitting
    + Training likelihood always increases for more complex structures.
        - When optimizing training set likelihood, we always prefer the most complicated structure that our model allows.
    + It's important to bound or penalize model complexity.

{{< callout type="info" >}}
Selecting **Hypeparameters** make a big difference to performance
* Parameter priors (regularization).
* Complexity penalty.
{{< /callout >}}

{{< toggle title="Pick the hyperparameters on the training set?">}}
Its a terrible idea because of the fact that on the training set, the optimal thing to do is to have maximum complexity.
{{< /toggle >}}

{{< toggle title="Pick the hyperparameters on the test site?">}}
Another terrible idea because if we picked these hyperparameteres so as to optimize performance on our test set, the performance will be overly optimistic.
{{< /toggle >}}

$ \Rightarrow $ The correct strategy is: Validation set
* Seperated from both training set and test set.
* Cross-validation.

# Why PGM Learning?
* Prediction of structured objects (sequences, graphs, trees)
    + Exploit correlations between several predicted variables.
+++
title = 'Chapter 11 (Pt. 1): Inference as Optimization'
date = 2025-05-28T22:46:25+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic-graphical-models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 12
postColor = "#5D8B0D"
+++

# Approximate Inference: The Big Picture
* Variational Inference
    + Mean field (innter approximation)
    + Loopy BP (outer approximation)
    + Kikuchi and variants (tighter outer approximation)
    + Expectation Propagation (reverse KL)
* Sampling
    + Monte Carlo
    + Sequential Monte Carlo
    + Markove Chain Monte Carlo
    + Hybrid Monte Carlo

# Variational Methods
"Variational": optimization-based formulations.
* quantity of interest as the solution to an optimization problem.
* *approximate* the desired solution by **relaxing/approximating** the intractable optimization problem.

{{< toggle title="Examples" >}}
* Courant-Fischer for eigenvalues
$$
\lambda_{\max} (A) = \max_{\lVert x \rVert_2 = 1} x^T A x
$$
{{< /toggle >}}

## Variational Inference: High-level Idea
* Inference: answer queries of $ P $
    + Direct inference on $ P $ is often intractable.
* Indirect approach:
    + Project $ P $ to a tractable family of distribution $ Q $.
    + Perform inference on $ Q $.

$ \Rightarrow $ requires a measure of distance!
* A convenient choice: $ KL(Q || P) $

# Exact Inference Revisited
Casting exact inference as an optimization problem.

Given factorized distribution
$$
P_{\Phi} (\mathcal{X}) = \frac{1}{Z} \prod_{\phi \in \Phi} \phi(U_\phi)
$$

* $ U_\phi = Scope[\phi] \subseteq \mathcal{X} $: the scope of each factor.

<br/>

Goal: Answering queries about $ P_{\Phi} $
* Marginal probabilities of variables,
* partition function $ Z $.

<br/>

Recall: 
* Clique tree BP results in a calibrated cluster tree $ \Rightarrow $ all pairs of adjacent cliques are calibrated (by definition).
* Calibrated set of beliefs $ Q $ for the cluster tree represents a distribution $ P_\Phi (\mathcal{X}) $.

{{< callout type="info" >}}
Can view Exact Inference as searching for a {{< marker >}}calibrated{{< /marker >}} distribution $ Q $ that matches $ P_\Phi \rightarrow $ minimizes relative entropy $ \mathbb{D}(Q || P_\Phi) $
{{< /callout >}}

### CTree-Optimize-KL

Given a set of beliefs
$$
Q = \\{ \beta_i : i \in V_{\mathcal{T}} \\} \cup \\{ \mu_{i,j} : (i-j) \in E_{\mathcal{T}} \\}
$$
* $ \mathcal{T} $: clique tree structure for $ P_\Phi $.
* $ \beta_i $: beliefs over cluster $ C_i $.
* $ \mu_{i, j} $: beliefs over sepset $ S_{i, j} $.

The set of beliefs in $ T $ defines a distribution $ Q $ due to the calibration requirement:
$$
\boxed{ Q(\mathcal{X}) = \frac{\prod_{i \in V_{\mathcal{T}}} \beta_i}{\prod_{(i - j) \in E_{\mathcal{T}}} \mu_{i, j}} }
$$

*Calibration requirement* ensures $ Q $ statisfies the **marginal consistency constrants**: For each $ (i - j) \in E_{\mathcal{T}} $, the beliefs on $ S_{i, j} $ are the marginal of $ B_i $ (and $ B_j $).
$$
\mu_{i, j} (S_{i, j}) = \sum_{C_i - S_{i, j}} \beta_i (C_i) = \sum_{C_j - S_{i, j}} \beta_j (C_j)
$$

From [Theorem 10.4](/books/probabilistic-graphical-models/chapter-10-exact-inference-clique-trees/#theorem-104)
$$
\beta_i[c_i] = Q(c_i)
$$

$$
\mu_{i, j}[s_{i, j}] = Q(s_{i, j})
$$

{{< define >}}
CTree-Optimize-KL

**Find** $ Q = \\{ \beta_i : i \in V_{\mathcal{T}} \\} \cup \\{ \mu_{i,j} : (i-j) \in E_{\mathcal{T}} \\} $

**Maximizing** $ - \mathbb{D} (Q || P_\Phi) $

**subject to**
$$
\mu_{i, j} (s_{i, j}) = \sum_{C_i - S_{i, j}} \beta_i (c_i) \quad \forall (i - j) \in E_T, \forall s_{i, j} \in Val(S_{i, j})
$$

$$
\sum_{c_i} \beta_i (c_i) = 1 \quad \forall i \in V_T
$$
{{< /define >}}

* if $ \mathcal{T} $ is a proper cluster tree for $ \Phi $, there is a set $ Q $ that induces a distribution $ Q = P_\Phi $.
* Because this solution achieves a relative entropy of 0, which is the highest value possible, it is the unique global optimum of this optimization.

### Theorem 11.1
If $ \mathcal{T} $ is an I-map of $ P_\Phi $, then there is a unique solution to CTree-Optimize-KL.

# Exact Inference as Optimization
* In Chapter 10, Belief Propagation results in a calibrated clique tree $ \rightarrow Q = P $.
* In this chapter, we are no longer in a clique tree but rather in a general cluster graph, which can have loops.
    + Can't use the clique tree message passing algorithm $ \rightarrow $ can't guarantee calibrated tree: $ Q \not= P $

Goal:
* Introduce a set of approximate beliefs $ Q = \\{ \beta_i(C_i), \mu_{ij} (S_{ij}) \\} $.
    + try to make $ Q $ as close as possible to $ P $.
    + by optimizing the energy function.

## The Energy Functional
{{< toggle title="functional?" >}}
**Functions**

* Input: variables
* Output: a value
* Full and partial derivatives $ \frac{df}{dx} $
* E.g. Maximize likelihood $ p(x \mid \theta) $ w.r.t. parameters $ \theta $

**Functional**

* Input: functions
* Output: a value
* Functional derivatives $ \frac{\delta F}{\delta f} $
* E.g., Maximize the entropy $ H[p(x)] $ w.r.t. p(x)

{{< /toggle >}}

### Theorem 11.2
$$
\boxed{ \mathbb{D} (Q || P_\Phi) = \ln Z - F[\tilde{P}_\Phi, Q] }
$$

{{< define >}}
where $ F[\tilde{P}_\Phi, Q] $ is the energy functional

$$
\begin{align*}
F[\tilde{P}_\Phi, Q] &= E_Q[\ln \tilde{P}(\mathcal{X})] + H_Q(\mathcal{X})
\end{align*}
$$

$$
= \sum_{\phi \in \Phi} E_Q [\ln \phi] + H_Q(\mathcal{X})
$$
{{< /define >}}
* $ \sum_{\phi \in \Phi} E_Q [\ln \phi] $: energy term
    + Each $ \phi $ appears as a seperate term.
    + If factors $ \phi $ that comprise $ \Phi $ are small, each expectation deals with relatively few variables.
    + Depends on $ Q $.
        - Inference is "easy" in $ Q \rightarrow $ evaluate such expectations easy.
* $ H_Q(\mathcal{X}) $: entropy term
    + Depends on $ Q $.
    + involving the entropy of an entire joint distribution; thus, it cannot be tractably optimized.

{{< toggle title="Proof" >}}
$$
\mathbb{D} (Q || P_\Phi) = E_Q[\ln Q (\mathcal{X})] - E_Q[\ln P_\Phi (\mathcal{X})]
$$

* $ H_Q (\mathcal{X}) = - E_Q[\ln Q (\mathcal{X})] $.
* $ P_\Phi (\mathcal{X}) = \frac{1}{Z} \sum_{\phi \in \Phi} \phi \Rightarrow \ln P_\Phi = \sum_{\phi \in \Phi} \ln \phi - \ln Z $.

Thus,
$$
\mathbb{D} (Q || P_\Phi) = - H_Q (\mathcal{X}) - E_Q \left[ \sum_{\phi \in \Phi} \ln \phi \right] + E_Q[\ln Z]
$$

$$
= -F[\tilde{P}_\Phi, Q] + \ln Z
$$
{{< /toggle >}}

{{< callout type="info" >}}
Minimizing the relative entropy $ \mathbb{D} (Q || P_\Phi) $ is equivalent to maximizing the energy functional $ F[\tilde{P}_\Phi, Q] $.
{{< /callout >}}

Since $ \mathbb{D} (Q || P_\Phi) \geq 0 $,

$$
\ln Z \geq F[\tilde{P}_\Phi, Q]
$$

* $ F $ is a lower bound on $ \ln Z $.
* Recall: in directed models, $ Z = P(E) \rightarrow $ the hardest part of inference,
* if $ \mathbb{D} (Q || P_\Phi) $ is small $ \rightarrow $ get a good lower-bound approximation to $ Z $.
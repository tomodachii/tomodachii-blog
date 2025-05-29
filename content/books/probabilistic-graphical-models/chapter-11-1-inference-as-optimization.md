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
{{< /toggle >}}

**Functional**

* Input: functions
* Output: a value
* Functional derivatives $ \frac{\delta F}{\delta f} $
* E.g., Maximize the entropy $ H[p(x)] $ w.r.t. p(x)

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

## Optimizing the Energy Functional
Since $ \mathbb{D} (Q || P_\Phi) $,

$$
\ln Z \geq F[\tilde{P}_\Phi, Q]
$$

* $ F $ is a lower bound on $ \ln Z $.
* Recall: in directed models, $ Z = P(E) \rightarrow $ the hardest part of inference,
* if $ \mathbb{D} (Q || P_\Phi) $ is small $ \rightarrow $ get a good lower-bound approximation to $ Z $.

### Factored energy functional
{{< define icon="definition" >}}
$$
\tilde{F}[\tilde{P}_{\Phi}, Q]
$$

$$
= \boxed{ \sum_{i \in V_{\mathcal{T}}} E_{C_i \sim \beta_i}[\ln \psi_i] + 
\sum_{i \in V_{\mathcal{T}}} H_{\beta_i}(C_i) - 
\sum_{(i-j) \in E_{\mathcal{T}}} H_{\mu_{i,j}}(S_{i,j}) }
$$
{{< /define >}}

* $ \alpha $: maps $ \phi \in \Phi \mapsto $ cluster $ C_i \in \mathcal{T} $.
* $ E_{C_i \sim \beta_i}[\ln \psi_i] $: Expectation on the value $ C_i $ given the beliefs $ \beta_i $.
* $ \psi_i: Val(C_i) \mapsto \mathbb{R} $: initial potential of $ C_i $
$$
\psi_i = \prod_{\phi, \alpha (\phi) = i} \phi
$$

{{< callout type="warning" >}}
In this reformulation, all the terms are local (refer to a specific belief factor).
{{< /callout >}}

{{< toggle title="Proof" >}}
* $ \ln \psi_i = \sum_{\phi, \alpha (\phi) = i} \ln \phi $.
* $ \beta_i(c_i) = Q(c_i) $.

Thus, 
$$
\sum_{\phi \in \Phi} E_Q [\ln \phi] = \sum_{i \in V_{\mathcal{T}}} E_{C_i \sim \beta_i}[\ln \psi_i]
$$

Recall
$$
H_Q (\mathcal{X}) = E_Q \left[ \ln \frac{1} {Q(\mathcal{X})} \right]
$$

$$
Q(\mathcal{X}) = \frac{\prod_{i \in V_{\mathcal{T}}} \beta_i}{\prod_{(i - j) \in E_{\mathcal{T}}} \mu_{i, j}}
$$

Take the logarithm

$$
\ln Q(\mathcal{X}) = \sum_{i \in V_T} \ln \beta_i(c_i) - \sum_{(i-j) \in E_T} \ln \mu_{i,j}(s_{i,j})
$$

Compute entropy
$$
H_Q(\mathcal{X}) = - E_Q \left[ \sum_{i \in V_T} \ln \beta_i(c_i) - \sum_{(i-j) \in E_T} \ln \mu_{i,j}(s_{i,j}) \right]
$$

Thus,
$$
H_Q (\mathcal{X}) = \sum_{i \in V_{\mathcal{T}}} H_{\beta_i}(C_i) - 
\sum_{(i-j) \in E_{\mathcal{T}}} H_{\mu_{i,j}}(S_{i,j})
$$
{{< /toggle >}}

### CTree-Optimize
In calibrated clique tree, we get **marginal consistency** for free, however in a loopy graph, running message passing does not necessarily give calibrated beliefs.
* Trick: even though consistency doesn't happen naturall $ \rightarrow $ force it by adding it as a **constraint** in the optimization problem.

{{< define >}}
**Find** $ Q = \\{ \beta_i : i \in V_{\mathcal{T}} \\} \cup \\{ \mu_{i,j} : (i-j) \in E_{\mathcal{T}} \\} $

**Maximizing** $ \tilde{F}[\tilde{P}_{\Phi}, Q] $

**subject to**
$$
\mu_{i, j} [s_{i, j}] = \sum_{C_i - S_{i, j}} \beta_i(c_i) \quad \forall (i - j) \in E_T, \forall s_{i, j} \in Val(S_{i, j}) \quad \text{(Marginal consistency)}
$$

$$
\sum_{c_i} \beta_i (c_i) = 1 \quad \forall i \in V_T \quad \text{(Normalization)}
$$

$$
\beta_i (c_i) \geq 0 \quad \forall i \in V_T, c_i \in Val(C_i) \quad \text{(Non-negativity)}
$$
{{< /define >}}

## Fixed point Characterization
* Stationary point: either a local maximum, a local minimum or a saddle point.
* CTree-Optimize has a single global maximum (theorem 11.1).
    + Can show that it is also the only stationary point $ \rightarrow $ once we find a stationary point, we know that its the maximum.

<br/>

Goal: **Maximizing** $ \tilde{F}[\tilde{P}_{\Phi}, Q] $ under consistency constraints.

Abt the Non-negativity constraint: Do not need to enforce this explicitly because the assumption that factors are strictly positive implies the beliefs will be nonnegative.

$ \Rightarrow $ Lagrange multiplier

$$
J = \tilde{F}[\tilde{P}_{\Phi}, Q]
$$

$$
-\sum_i \lambda_i \left( \sum_{c_i} \beta_i (c_i) - 1 \right)
$$

$$
-\sum_i \sum_{j \in Nb_i} \sum_{s_{i, j}} \lambda_{i \to j} [s_{i, j}] \left( \sum_{c_i \sim s_{i, j}} \beta_i (c_i) - \mu_{i, j} [s_{i, j}] \right).
$$

Taking derivatives of $ J $ w.r.t
* $ \beta_i (c_i) $
* $ \mu_{i, j}[s_{i, j}] $

$$
\frac{\partial J}{\partial \beta_i (c_i)} = \ln \psi_i [c_i] - \ln \beta_i (c_i) - 1 - \sum_{j \in Nb_i} \lambda_{i \to j} [s_{i, j}]
$$

$$
\frac{\partial J}{\partial \mu_{i, j} [s_{i, j}]} = \ln \mu_{i, j} [s_{i, j}] + 1 + \lambda_{i \to j} [s_{i, j}] + \lambda_{j \to i} [s_{i, j}]
$$

{{< toggle title="explain" >}}

$$
\tilde{F}[\tilde{P}_{\Phi}, Q]
$$

$$
= \sum_{i \in V_{\mathcal{T}}} E_{C_i \sim \beta_i}[\ln \psi_i] + 
\sum_{i \in V_{\mathcal{T}}} H_{\beta_i}(C_i) - 
\sum_{(i-j) \in E_{\mathcal{T}}} H_{\mu_{i,j}}(S_{i,j})
$$

Recall: $ X \sim P \rightarrow E_{X \sim P} [g(X)] = \sum_x P(x) \cdot g(x) $

* $ E_{C_i \sim \beta_i} [\ln \psi_i] = \sum_{c_i} \beta_i (c_i) \ln \psi_i (c_i) $
* $ H_{\beta_i} (C_i) = -\sum_{c_i} \beta_i (c_i) \ln \beta_i(c_i) $
* $ H_{\mu_{i, j}} (S_{i, j}) = -\sum_{s_{i, j}} \mu_{i, j} (s_{i, j}) \ln \mu_{i, j} (s_{i, j}) $

the factored energy function becomes
$$
\tilde{F} = \sum_{i \in V_T} \sum_{c_i} \beta_i (c_i) \ln \psi_i (c_i) - \sum_{i \in V_T} \sum_{c_i} \beta_i (c_i) \ln \beta_i(c_i) + \sum_{(i, j) \in E_T} \sum_{s_{i, j}} \mu_{i, j} (s_{i, j}) \ln \mu_{i, j} (s_{i, j})
$$

{{< /toggle >}}


$$
\begin{align*}
\delta_{i \rightarrow j}[s_{i,j}]
&= \frac{\mu_{i,j}[s_{i,j}]}{\delta_{j \rightarrow i}[s_{i,j}]} \\\
&= \frac{\sum_{c_i \sim s_{i,j}} \beta_i(c_i)}{\delta_{j \rightarrow i}[s_{i,j}]} \\\
&= \exp \left\\{ -\lambda_i - 1 + \frac{1}{2} |Nb_i| \right\\}
\sum_{c_i \sim s_{i,j}} \psi_i(c_i)
\prod_{k \in Nb_i - \{j\}} \delta_{k \rightarrow i}[s_{i,k}].
\end{align*}
$$

### Theorem 11.3
A set of beliefs $ Q $ is a stationary point of CTree-Optimize iff there exists a set of factors $ \\{ \delta_{i \to j}[S_{i, j}] : (i - j) \in E_T \\} $ st

$$
\boxed {\delta_{i \to j} \propto \sum_{C_i - S_{i, j}} \psi_i \left( \prod_{k \in Nb_i - \\{ j \\} } \delta_{k \to i} \right)} \tag{{11.10}}
$$

and moreover,
$$
\boxed{ \beta_i \propto \psi_i \left( \prod_{j \in Nb_i} \delta_{j \to i} \right) }
$$

$$
\boxed{ \mu_{i, j} = \delta_{j \to i} \cdot \delta_{i \to j} }
$$

{{< callout type="danger" >}}
This theorem characterizes the solution of the optimization problem
* in terms of these fixed points equattions
* they are update rules that, when repeated, converge (hopefully) to a stationary point $ \rightarrow $ where the optimization does not improve anymore.
    + In tree structure graph, these are exact BP equations.
    + In loopy graph, applying these rules give Loopy BP.
{{< /callout >}}
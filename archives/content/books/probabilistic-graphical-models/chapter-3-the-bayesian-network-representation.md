+++
title = 'Chapter 3: The Bayesian Network Representation'
date = 2025-03-19T16:14:14+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic-graphical-models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 3
postColor = "#E03838"
+++

{{< callout type="info" >}}
**Goal:** represent a joint Distribution $P$ over some set of random variables $\mathcal{X} = \\{X_1, \dots, X_n\\}$.
{{< /callout >}}

{{< toggle title="But why Joint Distribution ?" >}}

Because If we have the **joint distribution**, we can calculate any probability using the **condition** and **marginal distribution**

[Motivation Example](https://www.youtube.com/watch?v=NWA-yYCJsMw&list=PL7xML77VWUYooSM6Rao8GZ5bHt4tmCp2e&ab_channel=easylearning)

{{< /toggle >}}

# Exploiting Independence Properties
## Parameterizing the Joint Distribution
Consider a simple setting:
* $X_i$ represents binary event (coin toss, yes/no COVID cause, etc) $\rightarrow$ Parameterizing the joint distribution $P(X_1, \dots, X_n)$ requires {{< marker >}} $2^n - 1$ params.{{< /marker >}} ([Recall](/books/probabilistic-graphical-models/chapter-1-and-2-introduction-and-foundations/#number-of-parameteres-of-a-distribution))
* Assume events are **marginally independent**: $(X_i \\perp\\!\\!\\!\\perp X_j)$ for every $i, j$. $\rightarrow$ $P(X_1, \dots, X_n) = P(X_1) \dots P(X_n)$.
    + Can use {{< marker >}}$n$ params{{< /marker >}} $\theta_1, \dots, \theta_n$ to parameterize $P(X_1) \dots P(X_n)$. $$ P(X_1, \dots, X_n) = \prod_i \theta_{xi} $$
        - $\theta_{xi} = \theta_i$ if $x_i = x_i^1$,
        - $\theta_{xi} = 1 - \theta_i$ if $x_i = x_i^0$,

From $2^n - 1$ to $n$ is a dramatic reduction in the number of parameters, and the key point is:
{{< callout type="danger" >}}Independencies can reduce the number of parameters.{{< /callout >}}

The same applies to **Conditional Indepence**.

Consider a smaller picture: the joint distribution $ P(X_1, X_2, X_3, X_4) $. Using the chain rule,  

$$
P(X_1, X_2, X_3, X_4) = P(X_4 \mid X_3, X_2, X_1) P(X_3 \mid X_2, X_1) P(X_2 \mid X_1) P(X_1)
$$

{{< marker >}}If $ (X_4 \\perp\\!\\!\\!\\perp X_1, X_2 \mid X_3) \in \mathcal{I}(P) $, {{< /marker >}}

then $
P(X_4 \mid X_3, X_2, X_1) = P(X_4 \mid X_3)
$ $ \rightarrow $
{{< marker >}}\# of required parameters for this CPD reduces{{< /marker >}} from $ 2^3 = 8 $ to $ 2^1 = 2 $.  

The joint distribution becomes  

$$
P(X_1, X_2, X_3, X_4) = P(X_4 \mid X_3) P(X_3 \mid X_2, X_1) P(X_2 \mid X_1) P(X_1)
$$

The total number of parameters reduces from $ 2^4 - 1 = 15 $ to $2 + 2^2 + 2 + 1 = 9$.

{{< callout type="warning" >}}
So it's all about finding conditional independencies and factorize the joint distribution accordingly, but
1. How to find the conditional independencies (CIs) $\mathcal{I}(P)$ from the data?
2. Given the CIs, how to factorize the joint distribution? Can we somehow visualize the factorization? $\rightarrow\$ Bayesian networks!
{{< /callout >}}

# Bayesian Networks
{{< define icon="definition" label="Bayesian Network" >}}
* A directed **acyclic** graph (**DAG**) G whose nodes represent the random variables $X_1, \dots, X_n$.
* For each node $X_i$, a CPD $ P(X_i \mid \text{Par}_G(X_i)) $.
* The BN represents a joint distribution via the chain rule for Bayesian networks:

$$
P(X_1, \dots, X_n) = \prod_i P(X_i \mid \text{Pa}_G(X_i))
$$
{{< /define >}}

* $P$ is a legal distribution:
    + $P \leq 0$ ($P$ is a product of CPDs and CPDs are non-negative).
    + $\sum P = 1$.
    {{< toggle title="Proof" raw="true">}}
    <img src="/images/books/probabilistic-graphical-models/chapter3/sum-p-eq-1.png" alt="Proof">
    {{< /toggle >}}

Example
!["simple Bayesian network showing two potential diseases"](/images/books/probabilistic-graphical-models/chapter3/bn-ex-paper.png)
(a) A simple Bayesian network showing two potential diseases, **P**neumonia and **T**uberculosis,
*  either of which may cause a patient to have Lung **I**nfiltrates.
* The lung infiltrates may show up on an **X**Ray;
* there is also a separate **S**putum Smear test for tuberculosis.

All of the r.v are Boolean.

(b) The same Bayesian network, together with the conditional probability tables.

# Reasoning Patterns
[Check this out](https://leimao.github.io/blog/Intercausal-Reasoning/)

{{< image-text image="/images/books/probabilistic-graphical-models/chapter3/reasoning-patterns.png" alt="Student Example" align="left" width="30%" >}}
$X_1, X_2$: Causes,

$Y$: Effect.
{{< /image-text >}}

## Causal Reasoning
{{< define icon="definition" >}}
{{< marker >}}From various causes predict the "downstream" efects{{< /marker >}}, is **predictive** or **causal reasoning**.

Given $X_1$ and/or $X_2$, computing $P(Y \mid X_1), P(Y \mid X_2)$ and $P(Y \mid X_1, X_2)$.
{{< /define >}}
**Student Example**

* $P(l^1) \approx 0.5$, the probability of a student getting the reference letter given that we know nothing about him.

We can condition on some variables (causes) and ask how that would change our probability $P(l^1)$.

* $P(l^1 \mid i^0) \approx 0.39$, if we know that the student is not so smart, the probability of him getting reference letter goes down.

* $P(l^1 \mid i^0, d^0) \approx 0.51$, if we now know that the class is easy, then the probability of the student getting high grade increases, thus he is more likely to get that refer letter.

## Evidential Reasoning
{{< define icon="definition" >}}
{{< marker >}}From effect to cause{{< /marker >}}, is called **diagnostic** or **evidential reasoning**.

Given $Y$, computing $P(X_1 \mid Y), P(X_2 \mid Y)$ and $P(X_1, X_2 \mid Y)$.
{{< /define >}}

**Student Example**

We can condition on the Grade and ask what happens to the probability of its parents or its ancestors.

* Initially, 
    + $P(d^1) \approx 0.4$, the probability that the class is difficult, and
    + $P(i^1) \approx 0.3$, the probability that the student is intelligent.

But now, with the additional evidence that the student has terrible grade $g^3$,
* Evidentially,
    + $P(i^1 \mid g^3) \approx 0.08$, the probability that the student is intelligent goes down, but
    + $P(g^1 \mid g^3) \approx 0.08$, the probability that the class is difficult goes up as well.

## Intercausal Reasoning
{{< define icon="definition" >}}
Explaining away is  an instance of a general reasoning pattern called **intercausal reasoning**, that is {{< marker >}}reasoning between the causes with a common effect.{{< /marker >}}
* Given $X_1$ and $Y$, compute $P(X_2 \mid X_1, Y)$
* Given $X_2$ and $Y$, compute $P(X_1 \mid X_2, Y)$
{{< /define >}}


**Student Example**

Say, if a student gets low grade, he might not be so smart
* $P(i^1 \mid g^3) \approx 0.079$.

On the other hand, if we now discover that the class is hard,
* $P(i^1 \mid g^3, d^1) \approx 0.11$, the probability that the student is smart slightly increases.

$\rightarrow$ we have **explained away** the poor grade via the dificulty of the class.

**Example 2:**

We have fever and a sore throat, and are concerned about mononucleosis.

Doctor then tells us that we have flu.

Having the flu does not prohibit us from having mononucleosis. Yet, having the flu provides an alternative explanation of our symptoms, thereby reducing substantially the probability of mononucleosis.

{{< callout type="warning" >}}
Even if $X_1$ and $X_2$ are marginally indepedent ($X_1 \\perp\\!\\!\\!\\perp X_2$); given $Y$, then $X_1 \\not\\perp\\!\\!\\!\\perp X_2 \mid Y$ (Collider).
[Proof](https://www.coursera.org/learn/probabilistic-graphical-models/lecture/KMjHs/reasoning-patterns)
{{< /callout >}}
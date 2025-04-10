+++
title = 'Chapter 9: Exact Inference Variable Elimination'
date = 2025-04-03T14:02:26+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic graphical models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 9
postColor = "#10987F"
+++

PGMs represent joint probability distributions over a set of variables $\mathcal{X}$. Let's use this representation to answer actual queries.
{{< callout type="info" >}}
Graphical models are descriptions of decomposable multivariate {{< marker >}}functions.{{< /marker >}}
{{< /callout >}}
# Queries
A query over a graphical model asks to compute simple statistics over the function such as its minimum or average value.
## Conditional Probability Queries
{{< define >}}
Given: Variables $\mathcal{X}$, Evidence $E = e$, Query $Y$.

Task: Compute $P(Y \mid E = e)$.
{{< /define >}}

$$
P(Y \mid E = e) = \frac{P(Y, e)}{P(e)}.
$$

Let $W = \mathcal{X} - Y - E$ be variables that are neither query nor evidence (hidden variables).

$$
P(Y, E = e) = \sum_{W} P(Y, E = e, W),
$$

$$
P(e) = \sum_{Y, W} P(Y, E = e, W) = \sum_Y P(Y, E = e).
$$

{{< toggle title="The sum can grow exponentially in the number of hidden variable." >}}

**Example**

* $\mathcal{X} = \\{X_1, \dots, X_5\\}$, $X_i$ is binary variable.
* Evidence $E = {X_1 = 1}$.
* Query $Y = X_2$.
* $W = \mathcal{X} - Y - E = \\{X_3, X_4, X_5\\}$.

$$
P(Y = y, E = e) = \sum_{x_3, x_4, x_5} P(Y = y, X_1 = 1, \underbrace{X_3 = x_3, X_4 = x_4, X_5 = x_5}_{W})
$$

$\rightarrow$ Compute the joint probability for all 8 possible assignments of $x_3, x_4, x_5$.

In case of 20 variables? $2^{20}$.
{{< /toggle >}}

{{< toggle title="Examples" raw="true" >}}
Conditional probability inferences are often called <b>Sum-Product</b>: Sum over a product of factors.

<br/>

<b>Student Example</b>
{{< image-text image="/images/books/probabilistic-graphical-models/chapter9/student-ex.png" width="30%" >}}

$$
P(J) = \sum_{C,D,I,G,S,L,H} \phi_C(C) \phi_D(C,D) \phi_I(I) \phi_G(G,I,D) \phi_S(S,I) \phi_L(L,G) \phi_J(J,L,S) \phi_H(H,G,J)
$$

<br/>

Observe $I = i$ and $H = h$
$$
P(J \mid I = i, H = h) = \sum_{C,D,G,S,L} \phi_C(C) \phi_D(C,D) \phi_I(i) \phi_G(G,i,D) \phi_S(S,i) \phi_L(L,G) \phi_J(J,L,S) \phi_H(h,G,J)
$$

{{< /image-text >}}

<b>Study Group Example (Markov Network)</b>
{{< image-text image="/images/books/probabilistic-graphical-models/chapter9/study-group-ex.png" align="right" width="30%" >}}

$$
\tilde{P}(D) = \sum_{ABC} \phi_1(A, B) \times \phi_2(B, C) \times \phi_3(C, D) \times \phi_4(A, D)
$$

<br/>

Observe $I = i$ and $H = h$
$$
P(J \mid I = i, H = h) = \sum_{C,D,G,S,L} \phi_C(C) \phi_D(C,D) \phi_I(i) \phi_G(G,i,D) \phi_S(S,i) \phi_L(L,G) \phi_J(J,L,S) \phi_H(h,G,J)
$$

{{< /image-text >}}

{{< /toggle >}}

## Maximum a Posteriori (MAP)
{{< define >}}
Given: Variables $\mathcal{X}$, Evidence $E = e$, Query $Y = \mathcal{X} - E$.

Task: Compute $\text{MAP}(Y \mid E = e) = \text{argmax}_yP(Y = y \mid E = e)$.
* There might be more than one possible solution.
{{< /define >}}

$$
P(Y \mid E = e) = \frac{P(Y, e)}{\underbrace{P(e)}_{\text{constant w.r.t Y}}} \propto P(Y, E = e)
$$

# Analysis of Complexity

# Variable Elimination
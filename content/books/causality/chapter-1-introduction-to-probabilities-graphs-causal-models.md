+++
title = 'Chapter 1: Introduction to Probabilities, Graphs and Causal Models'
date = 2025-05-22T09:23:31+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["causality"]
authors = ["Judea Pearl"]
avatar = "/images/avatar.png"
math = true
section = "Causality"
weight = 0
postColor = "#FF5103"
+++

# Probability Theory
## Basic Concepts

### Axioms
1. $ 0 \leq P(A) \leq 1 $,
2. $ P (S) = 1 $
3. $ P (A \text{ or } B) = P(A) + P(B) $ if $ A $ and $ B $ are mutually exclusive.

<br/>

$ (A \cap B) $ and $ (A \cap \lnot B) $ are disjoint events, thus

$ A = (A \cap B) \cup (A \cap \lnot B) \rightarrow P(A) = P(A, B) + P(A, \lnot B) $

Thus,

$ P(S) = P(S, A) + P(S, \lnot A) = 1 \Leftrightarrow \boxed{ P(A) + P(\lnot A) = 1 } $

### Law of Total Probability
If $ B_i, \quad i = 1, 2, \dots, n $, is a set of
* collectively exhaustive, and
* mutually exclusive variables.

then

$$
\boxed{ P(A) = \sum_i P(A, B_i) = \sum_i P(A \mid B_i) P(B_i) }
$$

### Conditional Probabilities
$$
\boxed{ P(A \mid B) = \frac{P(A, B)}{P(B)} }
$$

$$
\boxed{ P(A \mid K) = \sum_i P(A \mid B_i, K) P(B_i \mid K) }
$$

### Independent
$ A \perp B $ if

$$
P(A \mid B) = P(A)
$$

### Conditional Independent
$ A \perp B \mid C $ if

$$
P(A \mid B, C) = P(A \mid C)
$$

### Chain Rule
$$
\boxed{ P(E_1, E_2, \dots, E_n) = P(E_n \mid E_{n - 1}, \dots, E_2, E_1) \dots P(E_2 \mid E_1) P(E_1) }
$$

### Bayes's Rule
$$
\boxed{ P(H \mid e) = \frac{P(e \mid H) P(H)}{P(e)} }
$$
* $ P(H \mid e) $: posterior
* $ P(e \mid H) $: likelihood
* $ P(H) $: prior
* $ P(e) $: evidence - normalizing constant 
    + $ P(e) = P(e \mid H) P(H) + P(e \mid \lnot H) P(\lnot H) $
    + $ P(H \mid e) + P(\lnot H \mid e) = 1 $

{{< toggle title="Example" >}}
a person at the next gambling table declares the outcome "twelve"

Goal: Know whether he was rolling a pair of dice or spinning a roulette wheel.
* $ P(\text{twelve} \mid \text{dice}) : 1/36 $
* $ P(\text{twelve} \mid \text{roulette}) : 1/38 $
* $ P(\text{dice}) \text{ and } P(\text{roulette}) $: estimating the number of roulette wheels and dice tables at the casino.
* $ P(e) = P(\text{twelve}) = P(\text{twelve} \mid \text{dice}) P(\text{dice}) + P(\text{twelve} \mid \text{roulette}) P(\text{roulette}) $.
{{< /toggle >}}

## Combining Predictive and Diagnostic Supports

## Conditional Independence and Graphoids

### Conditional Independence
* $ V = \\{ V_1, V_2, \dots \\} $: finite set of variables
* $ P $: joint probability over $ V $
* $ X, Y, Z $: subsets of variables in $ V $

$$ 
(X \perp Y \mid Z) \\, \text{ iff } \\, P(x \mid y, z) = P(x \mid z) \\, \text{ whenever } \\, P(y, z) > 0 
$$

Learning the value of $ Y $ does not provide additional information about $ X $, once we know $ Z $.

### Marginal Independence
$$ 
(X \perp Y \mid \empty) \\, \text{ iff } \\, P(x \mid y) = P(x) \\, \text{ whenever } \\, P(y) > 0 
$$

{{< callout type="warning" >}}
* $ (X \perp Y \mid Z ) $ implies the independence of all pairs of variables $ V_i \in X $ and $ V_j \in Y $ 
* but pairwise independence does not imply independence.
{{< /callout >}}

{{< toggle title="example" >}}
Consider 2 independence fair coin tosses

$$
H_1 = \\{ \text{ 1st toss is H } \\} = \\{ (H, H), (H, T) \\}
$$

$$
H_2 = \\{ \text{ 2nd toss is H } \\} = \\{ (H, H), (T, H) \\}
$$

$$
D = \\{ \text{ 2 tosses have different result } \\} = \\{ (H, T), (T, H) \\}
$$

* $ H_1 \perp H_2 $ by definition
* $ H_1 \perp D $ are independent because
$$
P(D \mid H_1) = \frac{P(D, H_1)}{H_1} = \frac{1/4}{1/2} = \frac{1}{2} = P(D)
$$
* Similarly, $ H_2 \perp D $

On the other hand,
$$
P(D, H_1, H_2) = 0 \not= \frac{1}{2} \cdot \frac{1}{2} \cdot \frac{1}{2} = P(H_1) P(D) P(H_2)
$$

{{< /toggle >}}

# Causal Bayesian Networks

| Aspect                         | **Bayesian Network (BN)**                         | **Causal Bayesian Network (CBN)**                            |
|--------------------------------|-----------------------------------------------------------|--------------------------------------------------------------|
| **Edges**                      | Statistical dependencies (conditional independence)       | Causal relationships (interventions)                         |
| **Purpose**                    | Encode joint probability distribution                     | Predict effects of interventions                             |
| **Use of DAG**                 | Represents factorization of joint distribution            | Also encodes causal mechanisms                               |
| **Can answer "What if X happens?"** | Not directly                                         | Yes (via intervention calculus) ?                             |
| **Ordering of Nodes**          | Any order of variables, as long as the conditional independencies hold | Must respect causal (temporal or mechanistic) ordering       |


# Functional Causal Models

# Causal vs Statistical
**probabilistic parameter:** any quantity that is defined in terms of a joint probability function.

**statistical parameter:** any quantity that is defined in terms of a joint probability distribution of observed variables, making no assumption whatsoever regarding the existence or nonexistence of unobserved variables.


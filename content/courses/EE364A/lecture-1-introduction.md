+++
title = 'Lecture 1 Introduction'
date = 2025-05-23T14:28:21+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["optimization"]
authors = ["Stephen P. Boyd"]
avatar = "/images/avatar.png"
math = true
section = "EE364a: Convex Optimization I"
weight = 0
postColor = "#5D8B0D"
+++

# Mathematical Optimization
{{< define icon="definition" >}}
Optimization problem

**minimize** $ f_0(x) $

**subject to** $ f_i(x) \leq b_i, \quad i = 1, \dots, m. $
{{< /define >}}

* $ x = (x_1, \dots, x_n) $: (vector) optimization variables.
* $ f_0: R^n \to R $: objective function.
* $ f_i: R^n \to R, \quad i = 1, \dots, m $: (inequality) constraint functions.

<br/>

**optimal solution** $ x^\* $
* has the smallest value of $ f_0 $
* satisfies the constraints.

for any $ z $ with $ f_1(z) \leq b_1, \dots, f_m(z) \leq b_m $, we have $ f_0 (z) \geq f_0(x^\*) $.


{{< toggle title="Example" >}}
**data fitting**
* variable: model parameters.
* constraints: prior info, parameter limits.
* objective: measure of misfit or prediction error.
{{< /toggle >}}

## Classes of Optimization Problem
**linear program**

the objective and constraint function $ f_0, \dots, f_m $ are linear,
$$
f_i (\alpha x + \beta y) = \alpha f_i (x) + \beta f_i (y)
$$
for all $ x, y \in R^n $ and all $ \alpha, \beta \in R $.

<br/>

**nonlinear program**

the optimization problem is not linear.

<br/>

**convex optimization problems**

the objective and constraint functions are convex
$$
f_i (\alpha x + \beta y) \leq \alpha f_i (x) + \beta f_i (y)
$$

## Solving optimization problems
**generalize optimization problems**

* very difficult to solve
* methods involve some comprimise, e.g
    + very long computation time,
    + not always finding the solution

<br/>

**exceptions**

* least-squares problems.
* linear programming problems.
* convex optimization problems.

### Least-squares problems
* no constraints
* objective is a sum of squares of terms of the form $ a_i^T x - b_i $:

{{< define >}}
**minimize** 
$$ 
f_0 (x) = \lVert Ax - b \rVert_2^2 = \sum_{i = 1}^k (a_i^T x - b_i)^2
$$
{{< /define >}}

* $ A \in R^{k \times n} $ with $ k \geq n $
* $ a_i^T \in R^{1 \times n} $: rows of $ A \quad (a_i \in R^n) $
* $ x \in R^n $: (vector) optimization variable
* $ b \in R^{k \times 1} $

<br/>

**sovling least-square problems**
* analytical solution: $ x^\* = (A^T A)^{-1} A^T b $
{{< toggle title="explain" >}}
$$
\begin{align*}
f(x) &= \lVert Ax - b \rVert_2^2 = (Ax - b)^T (Ax - b)\\\ 
&= (Ax)^T Ax - b^T Ax - (Ax)^T b + b^T b\\\
&= x^T A^T Ax - b^T Ax - x^T A^T b + b^T b
\end{align*}
$$

Since $ b^T A x $ is a scalar $ (1 \times k \cdot k \times n \cdot n \times 1 ) $, we can take transpose
$$
b^T A x = (b^T A x)^T = x^T A^T b
$$
Thus,
$$
f(x) = x^T A^T Ax - 2 b^T Ax + b^T b
$$

Take the gradient of $ f(x) $ w.r.t $ x $

* Recall: Rules
    + $ \nabla_x (x^T Q x) = 2 Q x $
    + $ \nabla_x (c^T x) = c $

$$
\nabla f(x) = 2 A^T A x - 2 A^T b
$$

To find the minimum, set the gradient to zero:
$$
2 A^T A x - 2 A^T b = 0 \Rightarrow \boxed{ A^T A x = A^T b }
$$
{{< /toggle >}}

* reliable and efficient algorithms and software $ \rightarrow $ widely used.
* computational time $ \propto n^2 k \quad (A \in R^{k \times n}) $.
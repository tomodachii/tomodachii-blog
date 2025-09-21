+++
title = 'Lecture 2: Potential Outcomes'
date = 2025-05-21T21:07:02+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["causality"]
authors = ["Brady Neal"]
avatar = "/images/avatar.png"
math = true
section = "Introduction to Causal Inference from a Machine Learning Perspective"
weight = 2
postColor = "#B10053"
+++

# Potential Outcomes

Potential outcome $ Y(t) $ denotes what your outcome would be, if you were to take treatment $ t $.
* $ \not= $ observed outcome $ Y $: Not all potential outcomes are observed $ \rightarrow $ potentially observed.


### Individual Treatment Effect (ITE)

individual $ i $
* treatment $ T_i $
* covariates $ X_i $
* potential outcome $ Y_i $
    + $ Y_i (1) $: potential outcome if you were to take treatment $ T = 1 $.

$$
\boxed{ \tau_i \triangleq = Y_i(1) - Y_i(0) } \tag{2.1}
$$

{{< toggle title="Example" >}}
Take the pill: $ T = 1 $; happy $ Y(t) = 1 $ 
* pill, happy ($ Y(1) = 1 $); no pill, headache ($ Y(0) = 0 $): $ Y(1) - Y(0) = 1 - 0 = 1 $
* the pill does not have any effect, happy anyways: $ Y(1) - Y(0) = 1 - 1 = 0 $
{{< /toggle >}}

# The Fundamental Problem of Causal Inference
It's  impossible to observe all the potential outcomes for a given individual.
* cannot observe both $ Y_i(1) $ and $ Y_i(0) \rightarrow $ cannot observe the causal effect $ Y_i(1) - Y_i(0) $.

# Getting Around the Fundamental Problem
Can't access ITE, but what abt *average* treatment effect?

### Average Treatment Effect (ATE)

$$
\boxed{ \tau \triangleq E[Y_i(1) - Y_i(0)] = E[Y(1) - Y(0)] } \tag{2.2}
$$

How would we actually calculate the ATE? *associational difference* $ E[Y \mid T = 1] - E[Y \mid T = 0] $ ?

$$
\begin{align*}
E[Y(1) - Y(0)] &= E[Y(1)] - E[Y(0)] \quad \text{(linearity)} \\\
&=? E[Y \mid Y = 1] - E[Y \mid Y = 0] 
\end{align*}
$$

Unfortunately, this is not true in general
* $ E[Y(1)] - E[Y(0)] $: causational quantity
* $ E[Y \mid Y = 1] - E[Y \mid Y = 0] $: associational quantity

If the equality holds, that would mean that causation is simply association.

{{< image-text image="/images/courses/introduction-to-causal-inference/lecture-2/getting-around-the-fundamental-prob.jpg" >}}
When $ Y = 0 $, can't observe $ Y(1) $, thus 
* the potential outcome $ Y(1) $ contains "?" (Outcome if treated),
* $ (Y \mid T = 1) $ contains outcomes when $ T = 1 $ actually happens (Outcome among treated individuals).
{{< /image-text >}}

### Ignorability and Exchangeability
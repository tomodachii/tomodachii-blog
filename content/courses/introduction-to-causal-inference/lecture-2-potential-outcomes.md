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

### Average Treatment Effect (ATE)
$$
\boxed{ \tau \triangleq E[Y_i(1) - Y_i(0)] = E[Y(1) - Y(0)] } \tag{2.2}
$$
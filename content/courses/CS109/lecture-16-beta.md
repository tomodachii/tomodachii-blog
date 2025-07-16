+++
title = 'Lecture 16: Beta'
date = 2025-06-18T19:57:37+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probability"]
authors = ["Chris Piech"]
avatar = "/images/avatar.png"
math = true
section = "CS109: Probability for Computer Scientists"
weight = 16
postColor = "#10987F"
+++

Example: Probability of rain tmr

**A**: My leg itches when it rains and its kinda itchy $ \rightarrow p = .8 $

**A**: Done complex calculations and have seens 10,451 days like tmr $ \rightarrow p = .8 $

Which estimate is better? We don't have a measure for confidence?

# Belief in $ p $ After 9 Heads in 10 Flips?
Flip a coin 10 times, observed 9 H and 1 T, $ p \approx \frac{9}{10} $?
* A very rough estimate based off 10 coin flips
* the 'point value' $ \frac{9}{10} $ does not have the abilityy to articulate how uncertain it is.

$ \Rightarrow $ Allows probability of heads to be a r.v itself.

<br/>

Let $ X $ be the probability of heads

$$
\begin{align*}
f(X &= x \mid H = 9, T = 1), \quad \quad 0 < x < 1 \\\ 
&= \frac{P(H = 9, T = 1 \mid X = x) f(X = x)}{\int_0^1 f(H = 9, T = 1 \mid X = x) f(X = x)dx}
\end{align*}
$$
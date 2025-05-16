+++
title = 'Lecture 1 Counting'
date = 2025-04-14T21:51:42+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probability"]
authors = ["Chris Piech"]
avatar = "/images/avatar.png"
math = true
section = "CS109: Probability for Computer Scientists"
weight = 0
postColor = "#5D8B0D"
+++

## Yappin bout neuron networks
**Where do AI networks** get their intelligence from?

$\rightarrow$ well set weights: perfect weights $=$ high intel.

**Do we hire grad students to go and fiddle around with those weights?**

$\rightarrow$ learn with examples.

# Counting
How many possible outcomes are there?

## Step Rule of Counting (aka Product Rule of Counting)

If the experiment has two steps $ \to A \to B $
* 1st step's outcomes are from Set $ A $, where $ |A| = m $,
* 2nd step's outcomes are from Set $ B $, where $ |B| = n $.
* and $ |B| $ is unaffected by output of first step.

Then the number of outcomes of the experiment is
$$
\boxed{ |A| \cdot |B| = m \cdot n }
$$

Example: a pixel could be one of $ 256^3 \approx 17000000 $ different colors (RGB).

{{< callout >}}
There's finite resources in the world but there's almost infinite unique combinations of them.
{{< /callout >}}

## Sum Rule of Counting

If the outcome of an experiment is either from set $ A $ OR set $ B $
* where $ A \cap B = \empty $ (they are multually exclusive).

Then the total number of outcomes of the experiment is
$$
\boxed{ |A| + |B| = m + n }
$$
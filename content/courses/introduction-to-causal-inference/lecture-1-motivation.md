+++
title = 'Lecture 1: Motivation'
date = 2025-04-16T07:51:04+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["causality"]
authors = ["Brady Neal"]
avatar = "/images/avatar.png"
math = true
section = "Introduction to Causal Inference from a Machine Learning Perspective"
weight = 1
postColor = "#B10053"
+++

# Simpson's Paradox
New disease: COVID-27

* Treatment $T = \\{A, B\\}$.
* Condition $C = \\{\text{mild}, \text{severe}\\}$.
* Outcome $Y = \\{\text{alive}, \text{dead}\\}$

Currently receiving treatment $A$ vs. $B$: 73% / 27%

Goal: Choosing which treatment to use.

{{< image-text image="/images/courses/introduction-to-causal-inference/lecture-1/count-table.png" width="40%">}}
The paradox is that
* treatment $B$ looks better in both of the subgroups,
* but treatment $A$ looks better when examining the total population ignoring the subgroups.
{{< /image-text >}}
A more interesting way of writting the calculation in terms of weights:
$$
\underbrace{\frac{1400}{1500}}_{\text{large weight}} (0.15) + \frac{100}{1500} (0.30) = 0.16
$$

$$
\frac{50}{550} (0.10) + \frac{500}{550} (0.20) = 0.19
$$

The non-uniformity of allocation of people to the groups:
* 1400 of the 1500 people received treatment $A$ had mild condition,
* whereas 500 of the 550 people who received treatment B had severe condition.

people with mild condition are less likely to die $\Rightarrow$ total mortality rate for those with treatment A is lower.

### Scenario 1
{{< image-text image="/images/courses/introduction-to-causal-inference/lecture-1/scenario-1.png" width="25%">}}
Doctors give treatment $A$ to most people with mild conditions, save the more expensive and limited treatment $B$ for ppl with severe conditions.
* $B$ assigned to dying people.
* $A$ assigned to health people.
{{< /image-text >}}

$C$ confounds $T$. To correct for this confounding, examine the relationship of $T$ and $Y$ among patients with the same conditions $\Rightarrow$ consider **subpopulations** ("Mild" and "Severe" columns).

### Scenario 2
{{< image-text image="/images/courses/introduction-to-causal-inference/lecture-1/scenario-2.png" width="25%">}}
Might have to wait a long time to take treatment $B$ (its scarce). In that time, the condition got worsen (mild $\to$ severe).
* 500/ 550 who wait for treament $B$ got worse condition.

$\Rightarrow$ Treatment $B$ is a cause of the Condition.
{{< /image-text >}}

Even if treatment B 
* is more effective than treatment A once administered (positive effect along $T \to Y$) 
* because precription of treatment $B$ causes worse conditions (negative effect along $T \to C \to Y$)

$\Rightarrow$ $B$ is less effective in **total**.

# Correlation Does Not Imply Causation
### Correlation vs. Association
* **correlation**: measures linear relationships.

* **association**: any kind of statistical dependence.

### Association $\neq$ Causation
Just because two things are associated doesn’t mean one causes the other. The relationship could be partly causal, fully causal, or not causal at all.

**Example - Shoes and Headaches**
Data might show that people who sleep with shoes on often wake up with headaches. Sleep with shoes on $\to$ wake up with headaches?
Actually, both events are often caused by a third factor: drinking alcohol the night before.
* Drinking $\to$ passing out with shoes on.
* Drinking $\to$ headache.

{{< callout type="danger" >}}
The main problem motivating causal inference is that association is not causation.
{{< /callout >}}

# What Does Imply Causation?
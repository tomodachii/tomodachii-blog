+++
title = 'Lecture 2: Algorithm Analysis'
date = 2025-05-11T21:13:25+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["dsa"]
authors = ["Steven Skiena"]
avatar = "/images/avatar.png"
math = true
section = "CSE 373 - Analysis of Algorithms"
weight = 2
postColor = "#5D8B0D"
+++

# The RAM Model
* Each "simple" operation (+, -, =, if, call) takes 1 step.
* Loops and subroutines calls
    + Depend upon the size of the data and the contents of a subroutine.
    + Are not simple operations

Measure the run time of an algorithm = counting the number of steps.

{{< callout type="info" >}}
**Flat-earth model:** 
* multiply costs more than plus in real world but we assume they both take 1 step.
* same energy as the earth is not flat but the people who make shoes assume that it is st the shoes does not have a sphere shape or something.

$ \rightarrow $ Flat-earth model is very useful!
{{< /callout >}}

# Best-Case, Worst-Case, and Average-Case Complexity

{{< image-text image="/images/courses/CSE373/lecture-2/worst-case-anal.png" >}}
* **Worst-case complexity:** maximum number of steps taken in any instance of size $ n $.
* **Best-case complexity:** minimum number of steps taken in any instance of size $ n $.
* **Average-case complexity:** Expected tim of the algorithm, the average number of steps over all instances of size $ n $.
{{< /image-text >}}

The worst-case complexity generally proves to be most useful

Average-case analysis for expected running time will prove very important with respect to randomized algorithms.

# Big-O Notation
{{< image-text image="/images/courses/CSE373/lecture-2/big-o.png" >}}
* Best, worst, and average cases are difficult to deal with because the precise function details are very complicated.
* It's easier to talk about upper and lower bounds of the time-complexity function using $ O, \Omega, \Theta $.
    + Simplifies our analysis by ignoring levels of detail that do not impact our comparison of algorithms.
    + Big Oh ignores the difference between multiplicative constants.
        - $ f(n) = 2n $ and $ g(n) = n $ are identical in Big Oh analysis.
{{< /image-text >}}

![](/images/courses/CSE373/lecture-2/big-oh-def.png)

* $ f(n) = O(g(n)) $ means $ c \cdot g(n) $ is an upper bound on $ f(n) $.
    + There exists some constant $ c $ st $ f(n) \leq c \cdot g(n) $ for every large enough $ n $.
        - $ n \geq n_0 $, for some constant $ n_0 $.

* $ f(n) = \Theta(g(n)) $ means $ c \cdot g(n) $ is a lower bound on $ f(n) $.
    + There exists some constant $ c $ st $ f(n) \geq c \cdot g(n) $ for every large enough $ n $.

* $ f(n) = \Omega(g(n)) $ means 
    + $ c_1 \cdot g(n) $ is an upper bound on $ f(n) $ and
    + $ c_2 \cdot g(n) $ is a lower bound on $ f(n) $.
    + There exists constants $ c_1 $ and $ c_2 $ st $ f(n) \leq c_1 \cdot g(n) $ and $ f(n) \geq c_2 \cdot g(n) $ for all $ n \geq n_0 $.
        - $ g(n) $ provides a nice, tight bound on $ f(n) $.

{{< callout type="warning" >}}
Multiply by constant does not change the asymptotics:
$$
O(c \cdot f(n)) \rightarrow O(f(n))
$$

Multiply two function, when both functions in a product are increasing, both are important:
$$
O(f(n)) \cdot O(g(n)) \rightarrow O(f(n) \cdot g(n))
$$
{{< /callout >}}

# Growth Rates and Dominance Relations


# Testing Dominance
$ f(n) $ dominated $ g(n) $ if $ \lim_{n\to\infty} g(n) / f(n) = 0 $,

which is the same as saying $ g(n) = o(f(n)) $
* little-oh means "grow stricly slower than".

# Dominance Rankings
$ n! \quad >> \quad c^n \quad >> \quad n^3 \quad >> \quad n^2 \quad >> \quad n^{1 + \epsilon} \quad >> \quad n \log n \quad >> \quad n \quad >> \quad \sqrt{n} \quad >> \quad \log^2 n \quad >> \quad \log n \quad >> \quad \log n / \log \log n \quad >> \quad \alpha(n) \quad >> \quad 1 \quad $
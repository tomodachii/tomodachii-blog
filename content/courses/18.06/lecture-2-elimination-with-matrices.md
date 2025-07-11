+++
title = 'Lecture 2: Elimination With Matrices'
date = 2025-07-11T14:21:34+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["linear-algebra"]
authors = ["Gilbert Strang"]
avatar = "/images/avatar.png"
math = true
section = "18.06 Linear Algebra"
weight = 2
postColor = "#FF5103"
+++

A matrix times a column vector is a combination of the column of the matrix [21:10]

The matrix x col = col

This can be understand as applying linear transformation to a vector $[\textcolor{red}{a}, \textcolor{blue}{b}, \textcolor{green}{c}]^T$ to transform this vector from a vector space to another

$$
\left[
    \begin{array}{c c c}
    . & . & . \\\
    . & . & . \\\
    . & . & .
    \end{array}
\right]
\left[
    \begin{array}{c}
    \textcolor{red}{a} \\\
    \textcolor{blue}{b} \\\
    \textcolor{green}{c}
    \end{array}
\right]
\quad
=\quad
\textcolor{red}{a}
\underset{\text{col 1}}{
    \left[
        \begin{array}{c}
        . \\\
        . \\\
        .
        \end{array}
    \right]
}
+
\textcolor{blue}{b}
\underset{\text{col 2}}{
    \left[
        \begin{array}{c}
        . \\\
        . \\\
        .
        \end{array}
    \right]
}
+
\textcolor{green}{c}
\underset{\text{col 3}}{
    \left[
        \begin{array}{c}
        . \\\
        . \\\
        .
        \end{array}
    \right]
}
$$

A row vector times a matrix is a linear combination of rows of the matrix [22:15]

$$
\left[
    \begin{array}{c c c}
    . & . & . \\\
    . & . & . \\\
    . & . & .
    \end{array}
\right]
\left[
    \begin{array}{c}
    \textcolor{red}{a} \\\
    \textcolor{blue}{b} \\\
    \textcolor{green}{c}
    \end{array}
\right]
\quad
=\quad
\textcolor{red}{a}
\underset{\text{col 1}}{
    \left[
        \begin{array}{c}
        . \\\
        . \\\
        .
        \end{array}
    \right]
}
+
\textcolor{blue}{b}
\underset{\text{col 2}}{
    \left[
        \begin{array}{c}
        . \\\
        . \\\
        .
        \end{array}
    \right]
}
+
\textcolor{green}{c}
\underset{\text{col 3}}{
    \left[
        \begin{array}{c}
        . \\\
        . \\\
        .
        \end{array}
    \right]
}
$$
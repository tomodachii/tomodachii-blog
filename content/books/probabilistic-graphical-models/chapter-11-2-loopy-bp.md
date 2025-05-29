+++
title = 'Chapter 11 (Pt. 2): Loopy BP'
date = 2025-05-04T18:58:34+07:00
draft = false
description = ""
image = ""
imageBig = ""
categories = ["probabilistic-graphical-models"]
authors = ["Daphne Koller", "Nir Friedman"]
avatar = "/images/avatar.png"
math = true
section = "Probabilistic Graphical Models"
weight = 13
postColor = "#5D8B0D"
+++

# Propagation-Based Approximation

### RIP
In chapter 10, we required that cluster graphs
* be trees, and
* [running intersection property](/books/probabilistic-graphical-models/chapter-10-exact-inference-clique-trees/#properties-of-clique-tree).

$ \rightarrow $ [clique trees](/books/probabilistic-graphical-models/chapter-10-exact-inference-clique-trees/#clique-trees).

This chapter, we remove first assumption, allowing inference to be performed on a loopy cluster graph. However, we still wish to require RIP. 

Since this is a cluster graph (loopy), we need to explicitly enforce the **uniqueness** of RIP.

{{< callout type="info" >}}
* **Existence:** *The fact that some path must exist* 
    + forces information about $ X $ to flow bw all clusters that contains it
    + so that, in a calibrated cluster graph, all cluster must agree about the marginal distribution of $ X $.
* **Uniqueness:** *The fact that there is at most one path* 
    + prevents information about $ X $ from cycling endlessly in a loop $ \rightarrow $ make beliefs more extreme due to "cyclic arguments."

$ \Rightarrow $ With RIP: BP is principled and gives calibrated beliefs.
{{< /callout >}}

{{< callout type="danger" >}}
In trees, RIP implies that $ S_{i, j} = C_i \cap C_j $.

In graphs, this is no longer true (now $ S_{i, j} \subseteq C_i \cap C_j $).
* Example: In 11.3a, $ C_1 $ and $ C_2 $ have $ B $ in common, but $ S_{1, 2} = \\{ C \\} $ 
{{< /callout >}}

![](/images/books/probabilistic-graphical-models/chapter11/rip.png)

### Calibrated
A cluster graph is calibrated if for each edge $ (i - j) $, connecting the cluster $ C_i $ and $ C_j $:
$$
\boxed{ \sum_{C_i - S_{i, j}} \beta_i = \sum_{C_j - S_{i, j}} \beta_j }
$$

{{< callout type="warning" >}}
That is, the two clusters agree on the marginal of variables in $ S_{i, j} $.
* clusters do not necessarily agree on the joint marginal of all variables they have in common, 
* but only on those variables in the sepset $ S_{i, j} $ 
    + as shown in the above example, some vars maybe in common but do not show up in sepset.
* Thus, this definition is weaker than cluster tree calibration.
{{< /callout >}}

{{< callout type="info" >}}
However, if a calibrated cluster graph satisfies the RIP, then the marginal of a variable $ X $ is identical in all the clusters that contain it.
* marginal of $ X = \sum_{C_i - \\{ X \\}} \beta_i (C_i) $.
{{< /callout >}}
This means:
$ C_1 --- C_2 --- C_3 $

* $ C_1 = \\{ X, Y \\} $
* $ C_2 = \\{ Y, Z \\} $
* $ C_3 = \\{ X, Z \\} $

So $ X \notin C_2 $, during BP, clusters send messages over their shared variables (sepsets), however, there's no way for information abt $ X $ to be passed bw $ C_1 $ and $ C_3 $

$ \Rightarrow C_1 $ and $ C_3 $ might converge to different marginals for $ X $.

<br/>

When RIP is satisfied (+ calibrated)
* $ C_1 = \\{ X, Y \\} $
* $ C_2 = \\{ X, Y, Z \\} $
* $ C_3 = \\{ X, Z \\} $

Now all clusters that contain $ X $ have the same marignal distribution for $ X $.
$$
\sum_{C_i - \\{ X \\}} \beta_i = \sum_{C_j - \\{ X \\}} \beta_j
$$

{{< callout type="danger" >}}
Calibration + RIP $ \Rightarrow $ Global consistency of marginals.
{{< /callout >}}

## Cluster-Graph Belief Propagation

{{< image-text image="/images/books/probabilistic-graphical-models/chapter11/bp.png" >}}
**1. Initialize Cluster Graph**
* Assign each factor $ \phi $ to a cluster.
* Construct initial potential 
$$ 
\psi_i (C_i) = \prod_{\phi : \alpha (\phi) = i} \phi 
$$
* Initialize all messages to be 1.

<br/>

**2. While graph is not calibrated, repeat**
* select edge $ (i - j) $ and pass message
$$
\delta_{i \to j} (S_{i, j}) = \sum_{C_i - S_{i, j}} \psi_i \cdot \prod_{k \in Nb_i - \\{ j \\}} \delta_{k \to i}
$$

<br/>

**3. Compute** 
$$ 
\beta_i (C_i) = \psi_i \cdot \prod_{k \in Nb_i} \delta_{k \to i}
$$
{{< /image-text >}}

* Repeat until when? When is the graph calibrated?
* How do I select the edge $ (i - j) $?

## Properties of Cluster-Graph BP

### Reparameterization
[Similar to bp in clique tree](/books/probabilistic-graphical-models/chapter-10-exact-inference-clique-trees/#a-calibrated-clique-tree-as-a-distribution), the convergence point represents a *reparameterization* of the original distribution.

<br/>

* $ U $: generalized cluster graph over a set of factors $ \Phi $.
* $ \\{ \beta_i \\} $, $ \\{ \mu_{i, j} \\} $: set of beliefs and sepsets.

**Theorem 11.4**
{{< define icon="theorem" >}}
$ \tilde{P}_\Phi (\mathcal{X}) $

$$
\boxed{ = \frac{\prod_{i \in V_U} \beta_i[C_i]}{\prod_{(i - j) \in E_U} \mu_{i, j}[S_{i, j}]} }
$$
{{< /define >}}

where $ \tilde{P}_\Phi (\mathcal{X}) = \prod \phi $ is the unnormalized distribution defined by $ \Phi $.

{{< toggle title="Proof" >}}

Recal:
$$
\beta_i = \psi_i \prod_{j \in Nb_i} \delta_{j \to i}.
$$

$$
\mu_{i, j} = \delta_{j \to i} \delta_{i \to j}.
$$

We now have
$$
\begin{align*}
\frac{\prod_{i \in V_U} \beta_i[C_i]}{\prod_{(i - j) \in E_U} \mu_{i, j}[S_{i, j}]} &= \frac{ \prod_{i \in V_U} \psi_i[C_i] \prod_{j \in Nb_i} \delta_{j \to i} [S_{i, j}] }{ \prod_{(i - j) \in E_U} \delta_{j \to i} [S_{i, j}] \delta_{i \to j} [S_{i, j}] }\\\
&= \prod_{i \in V_U} \psi_i [C_i]\\\
&= \prod_{\phi \in \Phi} \phi = \tilde{P}_\Phi (\mathcal{X})
\end{align*}
$$

{{< /toggle >}}

{{< callout >}}
This property shows that Cluster-Graph BP preserves all of the information about the original distribution.
{{< /callout >}}

### Tree Consistency

{{< toggle title="Beliefs in general cluster graphs may not be exact marginals" >}}

From [Theorem 10.4](/books/probabilistic-graphical-models/chapter-10-exact-inference-clique-trees/#theorem-104), if a set of calibrated beliefs match the marginals on a tree structure, then it also represents the joint distribution correctly.
$$
\beta_i (C_i) = P_\Phi (C_i)
$$

However,
* in loopy or general cluster graph, BP yields **approximations**, not guaranteed exact marginals of $ P_\Phi $.
* so can we say anything meaningful about these beliefs?

{{< /toggle >}}

The idea is to select subtree $ T $ of general cluster graph $ U $ to investigate belief properties.

<br/>

{{< toggle title="Subtree Marginals are consistent with subtree distributions" raw="true" >}}

{{< image-text image="/images/books/probabilistic-graphical-models/chapter11/tree-consistency.png" >}}
The selected subtree $ T $ is a subset of clusters and edges that
* together form a tree
* satisfies the RIP.

Example: In the figure, if we remove one of the clusters and its incident ediges, we are left with a proper cluster tree.

<br/>

**Note:** RIP is not ncessarily as easy to achieve in general since removing some edges from the cluster graph may result in a graph that violates RIP relative to a variable $ \rightarrow $ need to remove additional edges, and so on.
{{< /image-text >}}

{{< /toggle >}}

Once selected a tree $ T $, we can think of it as defining a distribution
$$
P_T (\mathcal{X}) = \frac{\prod_{i \in V_T} \beta_i (C_i)}{\prod_{(i-j) \in E_T} \mu_{i, j} [S_{i, j}]}
$$


**Tree consistency**
{{< define >}}
If the cluster graph is calibrated $ \rightarrow $ so is $ T $ + satisfies RIP, we can apply Theorem 10.4
$$
\beta_i (C_i) = P_T (C_i)
$$
{{< /define >}}

In English: the beliefs over $ C_i $ in the tree are the marginal of $ P_T $. 

## Analyzing Convergence
whether and when it converges?

Consider Standard sum-product message update rule
$$
\delta^\prime_{i \to j} \propto \sum_{C_i - S_{i, j}} \psi_i \cdot \prod_{k \in (Nb_i - \\{ j \\})} \delta_{k \to i}
$$

### BP Operator

* takes all of the message $ \delta^t $, 
* produces a new set of messages $ \delta^{t + 1} $ for the next step.
    + $ t $: a particular iteration
    + $ \Delta $: the space of all possible messages in the cluster graph.

{{< define icon="definition" >}}
BP update operator $ G_{BP}: \Delta \mapsto \Delta $

$$
\boxed{ G_{BP} (\\{ \delta_{i \to j} \\}) = \\{ \delta^\prime_{i \to j} \\} }
$$
{{< /define >}}

### Contraction
A condition that guarantees convergence

<br/>

* $ \alpha \in [0, 1) $: a number
* $ (\Delta, D) $: a metric space
    + $ \Delta $: set of points we're working with (in this case it is the space of all possible messages in the cluster graph).
    + $ D(\delta, \delta^\prime) $: distance function.

{{< define >}}
An Operator $ G $ over a metric space $ (\Delta, D) $ is an $ \alpha $-contraction relative to the distance function $ D $ if,

for any $ \delta, \delta^\prime \in \Delta $,
$$
\boxed{ D(G(\delta); G(\delta^\prime)) \leq \alpha D(\delta, \delta^\prime) }
$$
{{< /define >}}

An op is a contraction if its application to two points in the space is guaranteed to decrease the distance bw them by at least some constant $ \alpha < 1 $.

{{< callout type="info" >}}
A contraction guarantees convergence to a fixed point, regardless of where you start from.
{{< /callout >}}

### Fixed-point
Let $ G $ be an $ \alpha $-contraction of $ (\Delta, D) $. Then there is a unique fixed-point $ \delta^\* $ st
$$
\boxed{ \lim_{n \to \infty} G^n (\delta) = \delta^\* }
$$

TODO: Prove this

The contraction rate $ \alpha $ can be used to provide bounds on the rate of convergence of the algorithm to its unique fixed point: To reach a point that is guaranteed to be within $ \epsilon $ of $ \delta^\* $, it suffices to apply $ G $ the following number of times:
$$
\log_\alpha \frac{\epsilon}{diameter(\Delta)}
$$

* $ diameter(\Delta) = \max_{\delta, \delta^\prime \in \Delta} D(\delta; \delta^\prime) $

## Constructing Cluster Graphs
* Exact Inference: different clique trees $ \rightarrow $ different computational cost, same answer.
* Cluster Graph Approximation: different graphs $ \rightarrow $ different answers.

When selecting a cluster graph, we have to consider trade-offs bw cost and accuracy.

### Pairwise Markov Networks
{{< image-text image="/images/books/probabilistic-graphical-models/chapter11/pairwise-markov.jpg" >}}
* A univariate potential $ \phi_i[X_i] $ over each var $ X_i $.
* A pairwise potential $ \phi_{(i, j)}[X_i, X_j] $ over some pairs of vars $ \rightarrow $ edges in Markov Net.
{{< /image-text >}}

{{< callout type="info" >}}
If we are willing to transform our variables, any distribution can be reformulated as a pairwise Markov network.

TODO: Exercise 11.10
{{< /callout >}}

Transformation from Markov Network to Cluster Graph
* For each potential, introduce corresponding cluster,
* put edges bw the clusters that have overlapping scope
    + there's an edge bw
        - $ C_{(i, j)} $ that correspond to edge $ X_i - X_j $.
        - and $ C_i, C_j $ that correspond to the univeriate factors over $ X_i $ and $ X_j $.
* Example: $ \boxed{ A_{1, 1} } --- \boxed{ A_{1,1}, A_{1, 2} } --- \boxed{ A_{1, 2} } $

### Bethe Cluster Graph
![](/images/books/probabilistic-graphical-models/chapter11/bethe-cluster-graph.png)

* bipartite graph.
    + first layer: "large" clusters
        - one for each $ \phi \in \Phi $, scope is $ Scope[\phi] $.
        - ensure *family preservation property*.
    + second layer: "small" univeriate clusters
        - one for each random variable.
    + place an edge bw 
        - univariate cluster $ X $ on the second layer and
        - each cluster in the first layer that includes $ X $.

<br/>

Limitation the Bethe cluster graph: information between different clusters in the top level is passed through univariate marginal distributions $ \rightarrow $ interactions between variables are lost during propagations.

## Variational Analysis
The exact energy functional 
$$ 
F[\tilde{P}_\Phi, Q]
$$ 

has terms involving the entropy of an entire joint distribution; thus, it cannot be tractably optimized $ \rightarrow $ *factored energy functional* 

$$ 
\tilde{F}[\tilde{P}_\Phi, Q] 
$$

defined in terms of entropies of clusters and sepsets, which can be computed efficiently based purely on local information at the clusters.

### Marginal polytope
* $ U $: cluster graph
* $ P $: distribution

<br/>

The marginal polytope is the set of all cluster (and sepset) beliefs that can be obtained from marginalizing an actual distribution $ P $
* set of marginals obtained from the polytope of all probability distributions over $ \mathcal{X} $.

{{< define >}}
$$
Marg[U] = \\{ Q_P: P \text{ is a distribution over } \mathcal{X} \\}
$$

that is

$$
Q_P = \\{ P(C_i): i \in V_U \\} \cup \\{ P(S_{i, j}): (i-j) \in E_U \\}
$$
{{</ define >}}
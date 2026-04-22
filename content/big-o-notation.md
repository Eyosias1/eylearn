---
title: Big O Notation
subject: Computer Science
topic: Algorithms
tags: [algorithms, complexity, big-o, analysis]
status: reviewing
difficulty: medium
date: 2026-04-22
---

# Big O Notation

Big O notation describes the **worst-case growth rate** of an algorithm's time or space as input size $n$ increases.

## Common Complexities

| Complexity | Name | Example |
|---|---|---|
| $O(1)$ | Constant | Array index lookup |
| $O(\log n)$ | Logarithmic | [[cs-binary-search|Binary Search]] |
| $O(n)$ | Linear | Linear scan |
| $O(n \log n)$ | Linearithmic | [[Sorting Algorithms]] |
| $O(n^2)$ | Quadratic | Bubble Sort |
| $O(2^n)$ | Exponential | Recursive subsets |

## Simplification Rules

**Drop constants** — only the growth shape matters:

$$O(3n + 5) \rightarrow O(n)$$

**Keep dominant term** — lower-order terms vanish as $n \to \infty$:

$$O(n^2 + n \log n) \rightarrow O(n^2)$$

## Space Complexity

The same notation applies to memory. An algorithm can have:

- **Time:** $O(n \log n)$
- **Space:** $O(1)$ (in-place sorting)

## Related Notes

- [[cs-binary-search|Binary Search]] — a textbook $O(\log n)$ algorithm
- [[Sorting Algorithms]] — comparing $O(n \log n)$ vs $O(n^2)$ sorts

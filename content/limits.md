---
title: Limits
subject: Mathematics
topic: Calculus
tags: [calculus, limits, continuity, foundations]
status: new
difficulty: medium
date: 2026-04-22
---

# Limits

A limit describes the value a function **approaches** as the input approaches some value — even if the function never reaches it.

$$\lim_{x \to a} f(x) = L$$

## Evaluating Limits

**Direct substitution** (when $f$ is continuous at $a$):
$$\lim_{x \to 2} (x^2 + 1) = 5$$

**Factoring** (when substitution gives $\tfrac{0}{0}$):
$$\lim_{x \to 3} \frac{x^2 - 9}{x - 3} = \lim_{x \to 3} (x + 3) = 6$$

**L'Hôpital's Rule** (indeterminate forms $\tfrac{0}{0}$ or $\tfrac{\infty}{\infty}$):
$$\lim_{x \to 0} \frac{\sin x}{x} = \lim_{x \to 0} \frac{\cos x}{1} = 1$$

## One-Sided Limits

$$\lim_{x \to 0^-} \frac{1}{x} = -\infty \qquad \lim_{x \to 0^+} \frac{1}{x} = +\infty$$

A two-sided limit exists only when both one-sided limits agree.

## Limits at Infinity

$$\lim_{x \to \infty} \frac{1}{x} = 0 \qquad \lim_{x \to \infty} \frac{3x^2 + 1}{x^2} = 3$$

## Continuity

$f$ is continuous at $a$ if:

$$\lim_{x \to a} f(x) = f(a)$$

## Related Notes

- [[Derivatives]] — built on the limit definition $\lim_{h \to 0} \frac{f(x+h)-f(x)}{h}$
- [[Calculus Integration|Integration]] — Riemann sums are limits of partitions

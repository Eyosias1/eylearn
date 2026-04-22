---
title: Derivatives
subject: Mathematics
topic: Calculus
tags: [calculus, derivatives, differentiation, rates-of-change]
status: reviewing
difficulty: medium
date: 2026-04-22
---

# Derivatives

The derivative of a function measures its **instantaneous rate of change** — the slope of the tangent line at any point.

$$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$$

## Basic Rules

**Power rule:**
$$\frac{d}{dx} x^n = nx^{n-1}$$

**Product rule:**
$$\frac{d}{dx}[f \cdot g] = f'g + fg'$$

**Chain rule:**
$$\frac{d}{dx} f(g(x)) = f'(g(x)) \cdot g'(x)$$

**Quotient rule:**
$$\frac{d}{dx}\left[\frac{f}{g}\right] = \frac{f'g - fg'}{g^2}$$

## Common Derivatives

| Function | Derivative |
|---|---|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $\dfrac{1}{x}$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |

## Example

Find the derivative of $f(x) = 3x^4 - 2x^2 + 7$:

$$f'(x) = 12x^3 - 4x$$

## Relationship to Integration

The **Fundamental Theorem of Calculus** connects differentiation and [[Calculus Integration|Integration]]:

$$\frac{d}{dx} \int_a^x f(t)\, dt = f(x)$$

## Related Notes

- [[Calculus Integration|Integration]] — the reverse operation
- [[Limits]] — the foundation that defines the derivative

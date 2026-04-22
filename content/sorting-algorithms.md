---
title: Sorting Algorithms
subject: Computer Science
topic: Algorithms
tags: [algorithms, sorting, merge-sort, quicksort]
status: reviewing
difficulty: medium
date: 2026-04-22
---

# Sorting Algorithms

Sorting algorithms reorder a collection into a defined sequence. Their trade-offs are described using [[Big O Notation]].

## Comparison

| Algorithm | Best | Average | Worst | Space |
|---|---|---|---|---|
| Bubble Sort | $O(n)$ | $O(n^2)$ | $O(n^2)$ | $O(1)$ |
| Merge Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ |
| Quick Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ |
| Heap Sort | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ |

## Merge Sort

Divide and conquer — split, sort halves, merge.

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]
```

## Quick Sort

Partition around a pivot, recursively sort partitions.

```python
def quicksort(arr, lo, hi):
    if lo < hi:
        p = partition(arr, lo, hi)
        quicksort(arr, lo, p - 1)
        quicksort(arr, p + 1, hi)
```

Worst case $O(n^2)$ occurs on already-sorted input with a bad pivot choice.

## Choosing a Sort

Use **Merge Sort** when you need guaranteed $O(n \log n)$ and can afford $O(n)$ space.
Use **Quick Sort** for average-case performance in practice (better cache behaviour).

## Related Notes

- [[Big O Notation]] — complexity analysis
- [[cs-binary-search|Binary Search]] — requires a sorted array as prerequisite

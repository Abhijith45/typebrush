# TypeBrush Typing Gym — Accuracy & Intelligence Data Model

This document outlines the technical rules, attempt definitions, normalization formulas, and ranking logic governing **TypeBrush Accurate Typing Intelligence**.

---

## 1. What is an Attempt?

An **attempt** is defined as a user keystroke aimed at completing the **expected target character** at a specific position in the passage:

> If the expected character at position $i$ is `l` and the user presses `x`:
> - `l.attempts` increases by 1
> - `l.errors` increases by 1
> - `x` is **NOT** credited as a successful attempt for `x`.

The target character is the sole owner of the attempt statistic.

---

## 2. What is an Error?

An **error** occurs when the character entered by the user at position $i$ does not strictly equal the expected target character `passage.text[i]`.

---

## 3. How is Overall Accuracy Calculated?

$$\text{Accuracy (\%)} = \left(\frac{\text{correctCharacters}}{\text{totalTypedCharacters}}\right) \times 100$$

Rounded to 1 decimal place (e.g., $96.4\%$).

---

## 4. How are Key-Level Error Rates Calculated?

For any tracked character $c$:

$$\text{Key Error Rate}(c) = \frac{\text{errors}(c)}{\text{attempts}(c)}$$

$$\text{Key Accuracy Pct}(c) = \left(\frac{\text{attempts}(c) - \text{errors}(c)}{\text{attempts}(c)}\right) \times 100$$

---

## 5. Minimum Sample Threshold

To prevent low-sample noise (e.g. 1 error in 1 attempt = 100% error rate), a **minimum sample threshold of 5 attempts** ($\text{attempts} \ge 5$) is required before any character qualifies for weak-key ranking.

If total tracked attempts across history is $< 15$ or no character reaches 5 attempts, `hasSufficientData` is set to `false`, and the system displays a curated starter recommendation while guiding the user to complete more tests.

---

## 6. Character Normalization

- **Alphabetic Characters**: Case-normalized to lowercase (`'A'` and `'a'` map to `'a'`).
- **Numbers**: Preserved as digit strings (`'0'` – `'9'`).
- **Symbols**: Preserved as symbol literals (`'!'`, `'@'`, `'#'`, `'['`, `']'`, etc.).
- **Space**: Preserved as literal space `' '`.

---

## 7. Backspace Behavior

When a user backspaces and re-types an incorrect character, historical attempts and errors on the expected target key are preserved. Retyping the key constitutes another attempt at mastering that target character.

---

## 8. Numbers & Symbols Tracking

Numbers and special characters typed during Number Practice or Symbol Practice are tracked in `keyStats` using the same `recordKeystroke` pipeline.

---

## 9. Weak-Key Ranking Algorithm

1. Filter keys in `keyMap` with $\text{attempts} \ge 5$ and $\text{errors} > 0$.
2. Sort keys descending by:
   - Primary: `errorRate` ($\frac{\text{errors}}{\text{attempts}}$)
   - Secondary: `errors` (total error count)
3. Select the top 5 keys for user display and top 3 for targeted exercise generation.

---

## 10. Weak-Finger Ranking Algorithm

1. Aggregate attempts and errors for all keys assigned to a finger in `KEY_FINGER_MAP`.
2. Compute $\text{fingerErrorRate} = \frac{\sum \text{fingerErrors}}{\sum \text{fingerAttempts}}$.
3. Require $\sum \text{fingerAttempts} \ge 5$.
4. Sort fingers descending by `fingerErrorRate` (primary) and `fingerErrors` (secondary).

---

## 11. Backward Compatibility & History Migration

- Legacy records storing `keyStats: {}` (or missing `keyStats`) degrade gracefully.
- `typingHistoryStorage.js` sanitizes input objects, ensuring `attempts`, `errors`, and `correct` default safely to numeric `0`.
- Overall WPM, Accuracy, and duration trends compute seamlessly across both legacy and new records.

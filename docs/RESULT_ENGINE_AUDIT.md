# TypeBrush — Result Engine Audit

This audit evaluates the metric calculation logic, validation coordinates, and data transformations powering the TypeBrush results system.

---

## 1. Metric Calculations & Formulas (Phase 2 & 3)

### Words Per Minute (WPM)
TypeBrush follows the standard touch-typing definition where a "word" is exactly 5 keystrokes (including spacing).
- **Formula**:
  $$\text{WPM} = \frac{\text{Correct Characters} \div 5}{\text{Time Elapsed in Minutes}}$$
- **Validation**: This prevents inflating the score of users typing short words and penalizing those typing longer vocabularies.

### Net Accuracy (Primary Accuracy)
Evaluates the final state of the text after corrections.
- **Formula**:
  $$\text{Net Accuracy} = \frac{\text{Correct Characters}}{\text{Total Characters Typed}} \times 100$$

### Raw Accuracy (Precision)
Evaluates the precision of all physical keystrokes, including mistakes that were subsequently backspaced and corrected.
- **Formula**:
  $$\text{Raw Accuracy} = \frac{\text{Total Keystrokes} - \text{Mistakes Made}}{\text{Total Keystrokes}} \times 100$$
- **Comparison**: If a user makes errors but backspaces to fix them, Net Accuracy remains high (e.g. $98.5\%$) but Raw Accuracy drops (e.g. $91.2\%$), exposing correction overheads.

### Error Tracking
- **Keystroke Mistakes (`errors` / `mistakeCount`)**: Raw count of incorrect keys pressed, triggering warning flashes.
- **Corrected Errors**: Mistakes that the user backspaced and re-typed correctly.
- **Uncorrected Errors**: Mistakes left behind in the text field at completion.

---

## 2. Advanced Performance Intelligence Metrics (Phase 4)

We introduce five advanced calculations to give users diagnostic depth:

1. **Consistency Score**:
   Measures typing rhythm stability by penalizing correction rates and raw mistakes.
   $$\text{Consistency} = \max(0, \min(100, 100 - (\text{Error Rate} \times 1.5) - (\text{Correction Rate} \times 0.5)))$$
2. **Typing Efficiency**:
   The percentage of all keystrokes that directly contributed to the correct final text.
   $$\text{Efficiency} = \frac{\text{Correct Characters}}{\text{Total Keystrokes}} \times 100$$
3. **Correction Rate**:
   The percentage of keystrokes spent backspacing and fixing mistakes.
   $$\text{Correction Rate} = \frac{\text{Corrected Errors}}{\text{Total Keystrokes}} \times 100$$
4. **Error Rate**:
   $$\text{Error Rate} = \frac{\text{Total Mistakes}}{\text{Total Keystrokes}} \times 100$$
5. **Session Difficulty Rating**:
   Classified dynamically as `"Easy"`, `"Medium"`, or `"Hard"` based on WPM thresholds, number presence, and capital letter densities in the target passage.

---

## 3. Performance Classification Tiers (Phase 5)

Typing speeds are classified into five standard categories:
- **$0 - 20$ WPM**: Beginner Typist
- **$21 - 40$ WPM**: Intermediate Typist
- **$41 - 60$ WPM**: Advanced Typist
- **$61 - 80$ WPM**: Professional Typist
- **$80+$ WPM**: Expert Typist

---

## 4. Scorecard & Sharing payload (Phases 12 & 13)

- **PDF Scorecard**: Exports name, test type, time elapsed, correct/incorrect characters, net accuracy, raw accuracy, performance classification, identified weak keys, and target practice recommendations.
- **Social payload**: Formats a short summary optimized for WhatsApp and Twitter/X:
  `"I scored 62 WPM with 97% accuracy on TypeBrush. Can you beat my score? https://typebrush.in"`

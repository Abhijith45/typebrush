# Typing Gym Content Generation Audit

This document audits the current typing drills in TypeBrush, determines whether they are static or dynamic, and provides structured recommendations for introducing fully dynamic content generation in future updates.

---

## 1. Current Implementation Audit

### Guided Training Curriculum
* **Status**: **STATIC**
* **Findings**:
  - The exercises for all 5 training programs (Finger Placement, Weak Key Recovery, Accuracy Builder, Speed Builder, Numbers & Symbols) across Levels 1, 2, and 3 are defined as static string literals in `src/lib/gym/gymProgramsData.js`.
  - The default key-finger layouts and drills in `src/lib/gym/gymData.js` (like `FINGER_DRILLS`, `KEY_PAIRS_DRILLS`, `NUMBER_DRILLS`, and `SYMBOL_DRILLS`) are similarly static arrays or dictionary maps.
* **Limitations**:
  - Users typing the same level multiple times will repeat the exact same sentence sequences, reducing the training effect over time due to memorization.
  - The difficulty levels (Easy, Medium, Hard) on curriculum exercises are static word-count cuts rather than structural modifications of the sentences themselves.

### Personalized Training Mode
* **Status**: **PARTIALLY DYNAMIC**
* **Findings**:
  - When specific weak keys are detected (e.g., `W, R, H`), the training passage is dynamically generated in `GymWorkspace.js` by pulling corresponding words from the `WEAK_KEYS_WORDS` dictionary map in `gymData.js`.
  - It slices the collected words based on the selected difficulty (10 words for easy, 18 for medium, 28 for hard) and joins them with spaces to build a practice block.
* **Limitations**:
  - While the selection of keys is dynamic, the word dictionary for each key is static (10 predefined words per character).
  - The generated passage lacks grammatical cohesion (it is a sequence of isolated space-separated words rather than natural prose sentences), which can feel less engaging for users.

---

## 2. Recommendations for Dynamic Content Generation

To transition TypeBrush into a fully adaptive, infinite-content platform without backend dependencies, the following browser-bound dynamic content generation pipelines are recommended:

### A. Template-Based Contextual Sentence Generator (Pure JavaScript)
Instead of static sentences, use a client-side sentence constructor that injects words dynamically based on target keys.
* **How it works**:
  1. Define structural sentence templates containing placeholders for specific parts of speech or character rules (e.g., `[Subject] [Verb-WeakKey] [Object] [Punctuation]`).
  2. Maintain a local dictionary categorized by both grammatical role and character contents (e.g., verbs containing `Z` or `Q`).
  3. When an exercise is launched, compile the template by randomly drawing matching words from the dictionary.
* **Advantage**: Generates grammatically correct, cohesive sentences that are unique on every run.

### B. Markov Chain Text Generator
Build a client-side text generation engine using Markov chains trained on public domain classic novels or prose passages.
* **How it works**:
  1. Store a lightweight transition matrix or a list of highly frequent English n-grams.
  2. To target a specific weak key (e.g. `X`), filter the matrix to bias transitions towards words containing that character.
  3. Generate a prose passage of the requested length.
* **Advantage**: Creates highly realistic, natural-feeling reading text on the fly.

### C. Client-Side LLM Integration (WebLLM / ONNX Runtime Web)
For next-generation AI-driven personalization, leverage local browser-run language models.
* **How it works**:
  1. Utilize a lightweight model (e.g., Gemma-2B or Llama-3-8B-Instruct) via WebGPU-accelerated WebLLM or WebAssembly.
  2. Query the model locally: *"Generate a 50-word paragraph about science focusing heavily on words with the letters W, R, and H."*
* **Advantage**: Infinite, creative, and fully natural passages that align exactly with the user's weaknesses with zero server infrastructure costs.

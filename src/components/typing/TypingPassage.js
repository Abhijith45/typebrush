"use client";

export default function TypingPassage({ text = "", typedText = "", isFocused = false }) {
  const chars = text.split("");

  return (
    <div className="word-wrapper">
      {chars.map((char, index) => {
        let charClass = "";
        let isCurrent = index === typedText.length;

        if (index < typedText.length) {
          charClass = typedText[index] === char ? "correct" : "incorrect";
        } else if (isCurrent) {
          charClass = "active-char";
        }

        return (
          <span
            key={index}
            className={`char ${charClass}`}
            aria-current={isCurrent ? "true" : undefined}
            data-testid={isCurrent ? "active-char" : undefined}
          >
            {isCurrent && isFocused && <span className="caret" aria-hidden="true" />}
            {char}
          </span>
        );
      })}
    </div>
  );
}

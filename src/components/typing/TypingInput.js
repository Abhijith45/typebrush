"use client";

import { useRef, useEffect } from "react";

export default function TypingInput({
  value,
  onChange,
  onKeyDown,
  isFinished,
  inputRef,
  isFocused,
  onFocus,
  onBlur
}) {
  useEffect(() => {
    if (inputRef.current && !isFinished) {
      inputRef.current.focus();
    }
  }, [isFinished, inputRef]);

  return (
    <textarea
      ref={inputRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      className="hidden-textarea"
      disabled={isFinished}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
      aria-label="Type the passage here"
    />
  );
}

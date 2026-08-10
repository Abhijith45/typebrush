"use client";

import { useEffect } from "react";

export default function TypingInput({
  value,
  onChange,
  onKeyDown,
  isDisabled,
  inputRef,
  onFocus,
  onBlur
}) {
  useEffect(() => {
    if (inputRef.current && !isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled, inputRef]);

  return (
    <textarea
      ref={inputRef}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      className="hidden-textarea"
      disabled={isDisabled}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
      aria-label="Type the passage here"
    />
  );
}

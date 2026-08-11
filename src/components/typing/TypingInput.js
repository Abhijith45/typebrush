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
      style={{
        position: "absolute",
        opacity: 0,
        width: 0,
        height: 0,
        padding: 0,
        margin: 0,
        border: 0,
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden"
      }}
      disabled={isDisabled}
      autoComplete="off"
      autoCapitalize="off"
      autoCorrect="off"
      spellCheck="false"
      aria-label="Type the passage here"
    />
  );
}

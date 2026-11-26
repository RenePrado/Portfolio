import { useCallback, useRef, useState } from 'react';

export function useCopy(text, resetMs = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // Clipboard unavailable (permissions, non-secure context) —
      // leave the label unchanged rather than claiming success.
      setCopied(false);
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), resetMs);
  }, [text, resetMs]);

  return { copied, copy };
}

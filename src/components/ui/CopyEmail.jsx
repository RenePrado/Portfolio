import { useCopy } from '../../hooks/useCopy';
import { CopyIcon, CheckIcon } from './Icons';

// The huge email is a real mailto:; the Copy button sits beside it and
// announces the result through an aria-live region.
export default function CopyEmail({ email }) {
  const { copied, copy } = useCopy(email);

  return (
    <span className="copy-email">
      <button
        type="button"
        className="copy-email__btn mono"
        onClick={copy}
        aria-label={copied ? 'Email copied' : `Copy email address ${email}`}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
        <span>{copied ? 'Copied' : 'Copy'}</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {copied ? 'Email address copied to clipboard' : ''}
      </span>
    </span>
  );
}

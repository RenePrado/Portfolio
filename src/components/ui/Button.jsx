export default function Button({
  href,
  children,
  variant = 'primary',
  external = false,
  download,
  className = '',
  ...rest
}) {
  const cls = `btn btn--${variant} ${className}`;
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        download={download}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}

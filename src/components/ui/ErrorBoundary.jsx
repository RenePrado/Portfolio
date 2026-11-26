import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error, info) {
    console.error('Portfolio render error:', error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        <main className="page" style={{ paddingBlock: 'var(--space-8)' }}>
          <h1>Something went wrong</h1>
          <p>
            The page failed to render.{' '}
            <a href="/">Reload</a> or view the{' '}
            <a href="/Rene-Angelo-Prado-Resume.pdf">résumé PDF</a>.
          </p>
        </main>
      );
    }
    return this.props.children;
  }
}

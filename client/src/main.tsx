import './index.css'
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("React render error:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      const err = this.state.error;
      return React.createElement('div', {
        style: {
          padding: '2rem',
          fontFamily: 'monospace',
          color: '#c00',
          background: '#fff0f0',
          minHeight: '100vh',
          fontSize: '16px'
        }
      },
        React.createElement('h2', { style: { marginBottom: '1rem' } }, 'Application Error'),
        React.createElement('pre', {
          style: { whiteSpace: 'pre-wrap', fontSize: '13px', background: '#fff', padding: '1rem', borderRadius: '4px' }
        }, err ? (err.stack || err.message) : 'Unknown error')
      );
    }
    return this.props.children;
  }
}

const rootEl = document.getElementById("root")!;

createRoot(rootEl).render(
  React.createElement(ErrorBoundary, null, React.createElement(App))
);
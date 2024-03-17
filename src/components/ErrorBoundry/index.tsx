// @ts-nocheck
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // @ts-ignore
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  // @ts-ignore
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Something went wrong.</h1>
          <p>{this.state.error.toString()}</p>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

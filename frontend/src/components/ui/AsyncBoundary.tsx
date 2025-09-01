'use client';

import { Component, ReactNode, Suspense } from 'react';
import ErrorState from './ErrorState';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  error: Error | null;
}

class Boundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };
  static getDerivedStateFromError(error: Error): State {
    return { error };
  }
  handleRetry = () => {
    this.setState({ error: null });
  };
  render() {
    const { error } = this.state;
    if (error) {
      return <ErrorState message={error.message} onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}

export default function AsyncBoundary({ fallback, children }: Props) {
  return (
    <Boundary>
      <Suspense fallback={fallback}>{children}</Suspense>
    </Boundary>
  );
}

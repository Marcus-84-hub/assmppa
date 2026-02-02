import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 bg-red-50 text-red-900 h-screen flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-bold mb-4">Algo deu errado :(</h1>
                    <p className="mb-4">Ocorreu um erro inesperado na aplicação.</p>
                    <div className="bg-white p-4 rounded shadow border border-red-200 max-w-2xl w-full overflow-auto">
                        <h2 className="font-bold text-red-600 mb-2">Erro:</h2>
                        <pre className="text-sm whitespace-pre-wrap font-mono mb-4">{this.state.error?.toString()}</pre>
                        <h2 className="font-bold text-slate-600 mb-2">Detalhes Técnicos:</h2>
                        <pre className="text-xs text-slate-500 whitespace-pre-wrap font-mono">
                            {this.state.errorInfo?.componentStack}
                        </pre>
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                        Tentar Novamente
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

// ==================== src/components/Login.tsx ====================
import React from 'react';

interface LoginProps {
    password: string;
    setPassword: (password: string) => void;
    onLogin: () => void;
}

export default function Login({ password, setPassword, onLogin }: LoginProps) {
    return (
        <div className="login-container">
            <div className="login-card">
                <div style={{ textAlign: 'center' }}>
                    <div className="login-icon">
                        <svg className="icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                </div>
                <div className="login-header">
                    <h1>Texas Diabolo Competition 2026</h1>
                    <p>Scoring System Access</p>
                </div>
                <div>
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && onLogin()}
                        className="input-field"
                        placeholder="Enter password"
                    />
                </div>
                <button onClick={onLogin} className="login-button">
                    Sign In
                </button>
            </div>
        </div>
    );
}
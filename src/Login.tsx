import React, { useEffect } from 'react';

interface LoginProps {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    onLogin: () => void;
    lightMode: boolean;
}

export default function Login({
                                  username,
                                  setUsername,
                                  password,
                                  setPassword,
                                  onLogin,
                                  lightMode
                              }: LoginProps) {
    const validUsername = process.env.REACT_APP_USERNAME;
    const validPassword = process.env.REACT_APP_PASSWORD;

    // Load cached credentials on mount
    useEffect(() => {
        const cached = localStorage.getItem('loginCredentials');
        if (cached) {
            try {
                const { username: cachedUsername, password: cachedPassword } = JSON.parse(cached);
                setUsername(cachedUsername);
                setPassword(cachedPassword);
            } catch (e) {
                // Ignore parsing errors
            }
        }
    }, [setUsername, setPassword]);

    const handleLogin = () => {
        if (username === validUsername && password === validPassword) {
            // Cache credentials for next time
            localStorage.setItem('loginCredentials', JSON.stringify({ username, password }));
            onLogin();
        } else {
            alert('Incorrect username or password');
        }
    };

    return (
        <div className={`login-container ${lightMode ? 'light-mode' : ''}`}>
            <div className="login-card">
                <div style={{ textAlign: 'center' }}>
                    <div className="login-icon">
                        <svg className="icon-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="login-header">
                    <h1>Texas Diabolo Competition 2026</h1>
                    <p>Scoring System Access</p>
                </div>
                <div>
                    <label className="input-label">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
                                passwordInput?.focus();
                            }
                        }}
                        className="input-field"
                        placeholder="Enter username"
                        autoFocus
                    />
                </div>
                <div style={{ marginTop: '2rem' }}>
                    <label className="input-label">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                        className="input-field"
                        placeholder="Enter password"
                    />
                </div>
                <div style={{ marginTop: '2.5rem' }}>
                    <button onClick={handleLogin} className="login-button">
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}
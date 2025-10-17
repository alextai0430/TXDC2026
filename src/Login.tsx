import React, { useState } from 'react';

interface LoginProps {
    username: string;
    setUsername: (username: string) => void;
    password: string;
    setPassword: (password: string) => void;
    onLogin: () => void;
    lightMode: boolean;
    cachedUsers: Array<{ username: string; password: string }>;
}

export default function Login({
                                  username,
                                  setUsername,
                                  password,
                                  setPassword,
                                  onLogin,
                                  lightMode,
                                  cachedUsers
                              }: LoginProps) {
    const [showCached, setShowCached] = useState(false);

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
                        className="input-field"
                        placeholder="Enter username"
                    />
                </div>
                <div style={{ marginTop: '1rem' }}>
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
                {cachedUsers.length > 0 && (
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <button
                            onClick={() => setShowCached(!showCached)}
                            className="login-button"
                            style={{ background: '#6b7280' }}
                        >
                            {showCached ? 'Hide' : 'Show'} Cached Users
                        </button>
                        {showCached && (
                            <div style={{ marginTop: '1rem', textAlign: 'left' }}>
                                {cachedUsers.map(user => (
                                    <div
                                        key={user.username}
                                        style={{
                                            padding: '0.5rem',
                                            background: 'rgba(230,126,34,0.1)',
                                            borderRadius: '0.5rem',
                                            marginBottom: '0.5rem',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => {
                                            setUsername(user.username);
                                            setPassword(user.password);
                                        }}
                                    >
                                        <p style={{ margin: 0, fontWeight: 600 }}>{user.username}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
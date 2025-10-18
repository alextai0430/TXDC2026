import React, { useState } from 'react';

interface AdminTabProps {
    testMode: boolean;
    setTestMode: (mode: boolean) => void;
    isAdminAuthenticated: boolean;
    setIsAdminAuthenticated: (auth: boolean) => void;
}

export default function AdminTab({
                                     testMode,
                                     setTestMode,
                                     isAdminAuthenticated,
                                     setIsAdminAuthenticated
                                 }: AdminTabProps) {
    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const handleAdminLogin = () => {
        const validUsername = process.env.REACT_APP_ADMIN_USERNAME;
        const validPassword = process.env.REACT_APP_ADMIN_PASSWORD;

        if (adminUsername === validUsername && adminPassword === validPassword) {
            setIsAdminAuthenticated(true);
        } else {
            alert('Incorrect admin credentials');
            setAdminUsername('');
            setAdminPassword('');
        }
    };

    const handleLogout = () => {
        setIsAdminAuthenticated(false);
        setAdminUsername('');
        setAdminPassword('');
        setTestMode(false);
    };

    if (!isAdminAuthenticated) {
        return (
            <div className="card">
                <h2>Admin Access</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Enter admin credentials to access settings</p>

                <div style={{ marginBottom: '1rem' }}>
                    <label className="input-label">Admin Username</label>
                    <input
                        type="text"
                        value={adminUsername}
                        onChange={(e) => setAdminUsername(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement;
                                passwordInput?.focus();
                            }
                        }}
                        className="input-field"
                        placeholder="Enter admin username"
                    />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label className="input-label">Admin Password</label>
                    <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                        className="input-field"
                        placeholder="Enter admin password"
                    />
                </div>

                <button onClick={handleAdminLogin} className="save-button" style={{ width: '100%', justifyContent: 'center' }}>
                    Access Admin Settings
                </button>
            </div>
        );
    }

    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h2>Admin Settings</h2>
                <button onClick={handleLogout} className="delete-button">
                    Logout
                </button>
            </div>

            <div className="admin-toggle">
                <label>
                    <input
                        type="checkbox"
                        checked={testMode}
                        onChange={(e) => setTestMode(e.target.checked)}
                    />
                    <span>Test Mode Enabled</span>
                </label>
                <p>When enabled, you can adjust category weights in the scoring tabs</p>
            </div>
        </div>
    );
}
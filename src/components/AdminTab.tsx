// ==================== src/components/AdminTab.tsx ====================
import React from 'react';
import { CATEGORIES } from '../types';

interface AdminTabProps {
    testMode: boolean;
    setTestMode: (mode: boolean) => void;
    weights: Record<string, number>;
    setWeights: (weights: Record<string, number>) => void;
    onResetWeights: () => void;
}

export default function AdminTab({
                                     testMode,
                                     setTestMode,
                                     weights,
                                     setWeights,
                                     onResetWeights
                                 }: AdminTabProps) {
    return (
        <div className="card">
            <h2>Admin Settings</h2>

            <div className="admin-toggle">
                <label>
                    <input
                        type="checkbox"
                        checked={testMode}
                        onChange={(e) => setTestMode(e.target.checked)}
                    />
                    <span>Enable Test Mode</span>
                </label>
                <p>Allows modification of category weights for testing purposes</p>
            </div>

            {testMode && (
                <div>
                    <h3>Category Weights</h3>
                    <div className="weights-grid">
                        {CATEGORIES.map(category => (
                            <div key={category} className="weight-input">
                                <label>{category}</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={weights[category]}
                                    onChange={(e) => setWeights({
                                        ...weights,
                                        [category]: parseFloat(e.target.value) || 0
                                    })}
                                />
                            </div>
                        ))}
                    </div>
                    <button onClick={onResetWeights} className="reset-button">
                        Reset to Default Weights
                    </button>
                </div>
            )}
        </div>
    );
}
import React from 'react';
import { CATEGORIES, DIFFICULTY_OPTIONS, DEDUCTION_OPTIONS, Score } from './types';
import { calculateTechMax } from './utils';

interface TechnicalTabProps {
    competitorName: string;
    setCompetitorName: (name: string) => void;
    scores: Record<string, Score>;
    deductions: number;
    weights: Record<string, number>;
    testMode: boolean;
    total: string;
    onScoreChange: (category: string, value: number) => void;
    onDeductionChange: (value: number) => void;
    onSave: () => void;
    onWeightChange: (category: string, weight: number) => void;
}

export default function TechnicalTab({
                                         competitorName,
                                         setCompetitorName,
                                         scores,
                                         deductions,
                                         weights,
                                         testMode,
                                         total,
                                         onScoreChange,
                                         onDeductionChange,
                                         onSave,
                                         onWeightChange
                                     }: TechnicalTabProps) {
    const maxPoints = calculateTechMax(weights);

    const handleDeduction = (deductionValue: number) => {
        onDeductionChange(deductions + deductionValue);
    };

    const handleResetDeductions = () => {
        onDeductionChange(0);
    };

    return (
        <div>
            <div className="card">
                <h2>New Competitor - Technical Scoring</h2>
                <input
                    type="text"
                    value={competitorName}
                    onChange={(e) => setCompetitorName(e.target.value)}
                    placeholder="Competitor Name"
                    className="input-field"
                />
            </div>

            {/* Global Deductions Card */}
            <div className="card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(220, 38, 38, 0.1))', border: '2px solid #ef4444' }}>
                <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ color: '#ef4444', marginBottom: '0.5rem' }}>Deductions</h3>
                    <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>
                        Total: <span style={{ color: '#ef4444' }}>-{deductions.toFixed(2)}</span> points
                    </p>
                </div>

                <label className="score-label">Add Deduction (applies to overall score)</label>
                <div className="score-buttons">
                    {DEDUCTION_OPTIONS.map(option => (
                        <button
                            key={option.value}
                            onClick={() => handleDeduction(option.value)}
                            className="score-button"
                            style={{ background: '#fee2e2', color: '#991b1b', border: '2px solid #fca5a5' }}
                        >
                            {option.label}
                        </button>
                    ))}
                    <button
                        onClick={handleResetDeductions}
                        className="score-button"
                        style={{ background: '#ef4444', color: 'white', border: '2px solid #ef4444' }}
                    >
                        Reset Deductions
                    </button>
                </div>
            </div>

            <div className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>Category Scores</h3>
                    {testMode && <span className="test-mode-badge">Test Mode Active</span>}
                </div>

                {CATEGORIES.map(category => (
                    <div key={category} className="category-card">
                        <div className="category-header">
                            <h4 className="category-title">{category}</h4>
                            {testMode && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.875rem', color: '#6b7280' }}>Weight:</label>
                                    <input
                                        type="text"
                                        value={weights[category]}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            onWeightChange(category, val as any);
                                        }}
                                        onBlur={(e) => {
                                            const val = e.target.value;
                                            if (val === '' || isNaN(parseFloat(val))) {
                                                onWeightChange(category, 0);
                                            } else {
                                                onWeightChange(category, parseFloat(val));
                                            }
                                        }}
                                        style={{
                                            width: '60px',
                                            padding: '0.25rem 0.5rem',
                                            border: '2px solid var(--border-color)',
                                            borderRadius: '0.5rem',
                                            background: 'var(--bg-secondary)',
                                            color: 'var(--text-primary)',
                                            fontFamily: 'inherit',
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <label className="score-label">Difficulty (0-10)</label>
                        <div className="score-buttons">
                            {DIFFICULTY_OPTIONS.map(val => (
                                <button
                                    key={val}
                                    onClick={() => onScoreChange(category, val)}
                                    className={`score-button difficulty ${scores[category].difficulty === val ? 'active' : ''}`}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="total-card">
                <div className="total-display">
                    <div className="total-info">
                        <p>Total Score</p>
                        <p className="total-score">{total}</p>
                        <p>out of {maxPoints} points</p>
                    </div>
                    <button onClick={onSave} className="save-button">
                        <svg className="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span>Save Competitor</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
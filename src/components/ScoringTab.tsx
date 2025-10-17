// ==================== src/components/ScoringTab.tsx ====================
import React from 'react';
import { CATEGORIES, DIFFICULTY_OPTIONS, Competitor } from '../types';

interface ScoringTabProps {
    competitorName: string;
    setCompetitorName: (name: string) => void;
    scores: Record<string, { difficulty: number; execution: number }>;
    weights: Record<string, number>;
    testMode: boolean;
    total: string;
    competitors: Competitor[];
    onScoreChange: (category: string, type: 'difficulty' | 'execution', value: number) => void;
    onSave: () => void;
    onDelete: (id: number) => void;
}

export default function ScoringTab({
                                       competitorName,
                                       setCompetitorName,
                                       scores,
                                       weights,
                                       testMode,
                                       total,
                                       competitors,
                                       onScoreChange,
                                       onSave,
                                       onDelete
                                   }: ScoringTabProps) {
    return (
        <div>
            <div className="card">
                <h2>New Competitor</h2>
                <input
                    type="text"
                    value={competitorName}
                    onChange={(e) => setCompetitorName(e.target.value)}
                    placeholder="Competitor Name"
                    className="input-field"
                />
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
                            {testMode && <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Weight: {weights[category]}x</span>}
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label className="score-label">Difficulty (0-10)</label>
                            <div className="score-buttons">
                                {DIFFICULTY_OPTIONS.map(val => (
                                    <button
                                        key={val}
                                        onClick={() => onScoreChange(category, 'difficulty', val)}
                                        className={`score-button difficulty ${scores[category].difficulty === val ? 'active' : ''}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="score-label">Execution (0-10)</label>
                            <div className="score-buttons">
                                {DIFFICULTY_OPTIONS.map(val => (
                                    <button
                                        key={val}
                                        onClick={() => onScoreChange(category, 'execution', val)}
                                        className={`score-button execution ${scores[category].execution === val ? 'active' : ''}`}
                                    >
                                        {val}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="total-card">
                <div className="total-display">
                    <div className="total-info">
                        <p>Total Score</p>
                        <p className="total-score">{total}</p>
                        <p>out of 140 points</p>
                    </div>
                    <button onClick={onSave} className="save-button">
                        <svg className="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                        </svg>
                        <span>Save Competitor</span>
                    </button>
                </div>
            </div>

            {competitors.length > 0 && (
                <div className="card">
                    <h3>Saved Competitors</h3>
                    {competitors.map(comp => (
                        <div key={comp.id} className="competitor-item">
                            <div>
                                <p className="competitor-name">{comp.name}</p>
                                <p className="competitor-score">
                                    Total: <span>{comp.total}</span> points
                                </p>
                            </div>
                            <button onClick={() => onDelete(comp.id)} className="delete-button">
                                <svg className="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
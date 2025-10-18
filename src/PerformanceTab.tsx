import React from 'react';
import { PERF_CATEGORIES, PERF_OPTIONS } from './types';
import { calculatePerfMax } from './utils';

interface PerformanceTabProps {
    competitorName: string;
    setCompetitorName: (name: string) => void;
    scores: Record<string, number>;
    total: string;
    testMode: boolean;
    onScoreChange: (category: string, value: number) => void;
    onSave: () => void;
    perfWeights: Record<string, number>;
    onPerfWeightChange: (category: string, weight: number) => void;
}

const categoryDescriptions: Record<string, string> = {
    'Showmanship': 'Expressiveness and emotional projection',
    'Composition': "Highs & lows of performance, emotions etc - how your performance is put together, matching overall vibe of song/structure",
    'Music Interpretation': 'How well it goes with the music - do you hit the beats, not just background noise, thought put into trick placement',
    'Style/Entertainment': 'Acrobatics, different ways of moving your yoyo/yoyoing, uniqueness',
    'Control': 'Flow, ease of use, comfort'
};

export default function PerformanceTab({
                                           competitorName,
                                           setCompetitorName,
                                           scores,
                                           total,
                                           testMode,
                                           onScoreChange,
                                           onSave,
                                           perfWeights,
                                           onPerfWeightChange
                                       }: PerformanceTabProps) {
    const maxPoints = calculatePerfMax(perfWeights);

    return (
        <div>
            <div className="card">
                <h2>New Competitor - Performance Scoring</h2>
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
                    <h3>Performance Categories</h3>
                    {testMode && <span className="test-mode-badge">Test Mode Active</span>}
                </div>

                {PERF_CATEGORIES.map(category => (
                    <div key={category} className="category-card">
                        <div className="category-header">
                            <div>
                                <h4 className="category-title">{category}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                                    {categoryDescriptions[category]}
                                </p>
                            </div>
                            {testMode && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <label style={{ fontSize: '0.875rem', color: '#6b7280' }}>Weight:</label>
                                    <input
                                        type="text"
                                        value={perfWeights[category]}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            onPerfWeightChange(category, val as any);
                                        }}
                                        onBlur={(e) => {
                                            const val = e.target.value;
                                            if (val === '' || isNaN(parseFloat(val))) {
                                                onPerfWeightChange(category, 0);
                                            } else {
                                                onPerfWeightChange(category, parseFloat(val));
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

                        <label className="score-label">{category} (0-20)</label>
                        <div className="score-buttons">
                            {PERF_OPTIONS.map(val => (
                                <button
                                    key={val}
                                    onClick={() => onScoreChange(category, val)}
                                    className={`score-button execution ${scores[category] === val ? 'active' : ''}`}
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
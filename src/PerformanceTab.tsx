import React from 'react';
import { PERF_CATEGORIES, PERF_OPTIONS } from './types';

interface PerformanceTabProps {
    competitorName: string;
    setCompetitorName: (name: string) => void;
    scores: Record<string, number>;
    total: string;
    onScoreChange: (category: string, value: number) => void;
    onSave: () => void;
}

export default function PerformanceTab({
                                           competitorName,
                                           setCompetitorName,
                                           scores,
                                           total,
                                           onScoreChange,
                                           onSave
                                       }: PerformanceTabProps) {
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
                <h3>Performance Categories</h3>

                {PERF_CATEGORIES.map(category => (
                    <div key={category} className="category-card">
                        <div className="category-header">
                            <h4 className="category-title">{category}</h4>
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
                        <p>out of 60 points</p>
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
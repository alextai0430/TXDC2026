import React from 'react';
import { Competitor } from './types';

interface SavedCompetitorsTabProps {
    competitors: Competitor[];
    onDelete: (id: number) => void;
}

export default function SavedCompetitorsTab({
                                                competitors,
                                                onDelete
                                            }: SavedCompetitorsTabProps) {
    const techCompetitors = competitors.filter(c => c.judgeType === 'technical');
    const perfCompetitors = competitors.filter(c => c.judgeType === 'performance');

    return (
        <div>
            {techCompetitors.length > 0 && (
                <div className="card">
                    <h3>Technical Judge - Saved Competitors</h3>
                    {techCompetitors.map(comp => (
                        <div key={comp.id} className="competitor-item">
                            <div>
                                <p className="competitor-name">{comp.name}</p>
                                <p className="competitor-score">
                                    Total: <span>{comp.total}</span> / 140 points (Technical)
                                </p>
                            </div>
                            <button onClick={() => onDelete(comp.id)} className="delete-button">
                                <svg className="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {perfCompetitors.length > 0 && (
                <div className="card">
                    <h3>Performance Judge - Saved Competitors</h3>
                    {perfCompetitors.map(comp => (
                        <div key={comp.id} className="competitor-item">
                            <div>
                                <p className="competitor-name">{comp.name}</p>
                                <p className="competitor-score">
                                    Total: <span>{comp.total}</span> / 60 points (Performance)
                                </p>
                            </div>
                            <button onClick={() => onDelete(comp.id)} className="delete-button">
                                <svg className="icon-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {competitors.length === 0 && (
                <div className="card">
                    <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No competitors saved yet</p>
                </div>
            )}
        </div>
    );
}
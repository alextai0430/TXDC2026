import React from 'react';
import { Competitor, CATEGORIES, PERF_CATEGORIES } from './types';

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
                    {techCompetitors.map(comp => {
                        const techComp = comp as any;
                        return (
                            <div key={comp.id} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '2px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div style={{ flex: 1 }}>
                                        <p className="competitor-name">{comp.name}</p>
                                        <div style={{ marginTop: '0.75rem' }}>
                                            {CATEGORIES.map(cat => {
                                                const score = techComp.scores[cat];
                                                return (
                                                    <div key={cat} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                                        <strong>{cat}:</strong> Difficulty {score.difficulty}
                                                    </div>
                                                );
                                            })}
                                            <div style={{ fontSize: '0.875rem', color: '#ef4444', marginTop: '0.5rem', fontWeight: 'bold' }}>
                                                Deductions: -{techComp.deductions.toFixed(2)}
                                            </div>
                                        </div>
                                        <p className="competitor-score" style={{ marginTop: '0.75rem' }}>
                                            Total: <span>{comp.total}</span> / 70 points (Technical)
                                        </p>
                                    </div>
                                    <button onClick={() => onDelete(comp.id)} className="delete-button" style={{ marginLeft: '1rem' }}>
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
                            </div>
                        );
                    })}
                </div>
            )}

            {perfCompetitors.length > 0 && (
                <div className="card">
                    <h3>Performance Judge - Saved Competitors</h3>
                    {perfCompetitors.map(comp => {
                        const perfComp = comp as any;
                        return (
                            <div key={comp.id} style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '0.75rem', border: '2px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                                    <div style={{ flex: 1 }}>
                                        <p className="competitor-name">{comp.name}</p>
                                        <div style={{ marginTop: '0.75rem' }}>
                                            {PERF_CATEGORIES.map(cat => {
                                                const score = perfComp.scores[cat];
                                                return (
                                                    <div key={cat} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                                        <strong>{cat}:</strong> {score}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <p className="competitor-score" style={{ marginTop: '0.75rem' }}>
                                            Total: <span>{comp.total}</span> / 100 points (Performance)
                                        </p>
                                    </div>
                                    <button onClick={() => onDelete(comp.id)} className="delete-button" style={{ marginLeft: '1rem' }}>
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
                            </div>
                        );
                    })}
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
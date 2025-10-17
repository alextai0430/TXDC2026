
// ==================== src/App.tsx ====================
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import ScoringTab from './components/ScoringTab';
import AdminTab from './components/AdminTab';
import { CATEGORIES, DEFAULT_WEIGHTS, Competitor } from './types';
import { calculateTotal, saveToStorage, loadFromStorage } from './utils';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('scoring');
    const [testMode, setTestMode] = useState(false);
    const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
    const [competitors, setCompetitors] = useState<Competitor[]>([]);
    const [currentCompetitor, setCurrentCompetitor] = useState<{
        name: string;
        scores: Record<string, { difficulty: number; execution: number }>;
    }>({
        name: '',
        scores: CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: { difficulty: 0, execution: 0 } }), {} as Record<string, { difficulty: number; execution: number }>)
    });

    useEffect(() => {
        const data = loadFromStorage();
        if (data) {
            setCompetitors(data.competitors || []);
            setWeights(data.weights || DEFAULT_WEIGHTS);
            setTestMode(data.testMode || false);
        }
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            saveToStorage({ competitors, weights, testMode });
        }
    }, [competitors, weights, testMode, isAuthenticated]);

    const handleLogin = () => {
        if (password === 'diabolo2026') {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleScoreChange = (category: string, type: 'difficulty' | 'execution', value: number) => {
        setCurrentCompetitor(prev => ({
            ...prev,
            scores: {
                ...prev.scores,
                [category]: { ...prev.scores[category], [type]: value }
            }
        }));
    };

    const saveCompetitor = () => {
        if (!currentCompetitor.name.trim()) {
            alert('Please enter competitor name');
            return;
        }

        const newCompetitor: Competitor = {
            ...currentCompetitor,
            id: Date.now(),
            total: calculateTotal(currentCompetitor.scores, weights),
            timestamp: new Date().toISOString()
        };

        setCompetitors(prev => [...prev, newCompetitor]);
        setCurrentCompetitor({
            name: '',
            scores: CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: { difficulty: 0, execution: 0 } }), {} as Record<string, { difficulty: number; execution: number }>)
        });
    };

    if (!isAuthenticated) {
        return <Login password={password} setPassword={setPassword} onLogin={handleLogin} />;
    }

    return (
        <div className="app-container">
            <div className="header">
                <div className="header-container">
                    <h1>Texas Diabolo Competition 2026</h1>
                    <p>Technical Scoring System</p>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs">
                    <button
                        onClick={() => setActiveTab('scoring')}
                        className={`tab-button ${activeTab === 'scoring' ? 'active' : ''}`}
                    >
                        <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Technical Scoring
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}
                    >
                        <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Admin
                    </button>
                </div>
            </div>

            <div className="content">
                {activeTab === 'scoring' ? (
                    <ScoringTab
                        competitorName={currentCompetitor.name}
                        setCompetitorName={(name) => setCurrentCompetitor(prev => ({ ...prev, name }))}
                        scores={currentCompetitor.scores}
                        weights={weights}
                        testMode={testMode}
                        total={calculateTotal(currentCompetitor.scores, weights)}
                        competitors={competitors}
                        onScoreChange={handleScoreChange}
                        onSave={saveCompetitor}
                        onDelete={(id) => setCompetitors(prev => prev.filter(c => c.id !== id))}
                    />
                ) : (
                    <AdminTab
                        testMode={testMode}
                        setTestMode={setTestMode}
                        weights={weights}
                        setWeights={setWeights}
                        onResetWeights={() => setWeights(DEFAULT_WEIGHTS)}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
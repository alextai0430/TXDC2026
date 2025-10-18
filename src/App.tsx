import React, { useState, useEffect } from 'react';
import Login from './Login';
import TechnicalTab from './TechnicalTab';
import PerformanceTab from './PerformanceTab';
import SavedCompetitorsTab from './SavedCompetitorsTab';
import AdminTab from './AdminTab';
import { CATEGORIES, DEFAULT_WEIGHTS, Score, Competitor } from './types';
import { calculateTechTotal, calculatePerfTotal, saveToCache, loadFromCache } from './utils';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('tech-scoring');
    const [testMode, setTestMode] = useState(false);
    const [lightMode, setLightMode] = useState(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
    const [competitors, setCompetitors] = useState<Competitor[]>([]);

    // Technical scoring state
    const [techCompetitorName, setTechCompetitorName] = useState('');
    const [techScores, setTechScores] = useState<Record<string, Score>>(
        CATEGORIES.reduce(
            (acc, cat) => ({ ...acc, [cat]: { difficulty: 0, execution: 0 } }),
            {} as Record<string, Score>
        )
    );

    // Performance scoring state
    const [perfCompetitorName, setPerfCompetitorName] = useState('');
    const [perfScores, setPerfScores] = useState<Record<string, number>>({
        Choreography: 0,
        Performance: 0,
        Flow: 0
    });
    const [perfWeights, setPerfWeights] = useState<Record<string, number>>({
        Choreography: 1,
        Performance: 1,
        Flow: 1
    });

    // Load from cache on mount
    useEffect(() => {
        const data = loadFromCache();
        if (data) {
            setCompetitors(data.competitors || []);
            setWeights(data.weights || DEFAULT_WEIGHTS);
            setTestMode(data.testMode || false);
            setLightMode(data.lightMode || false);
        }
        document.title = 'TXDC2026';
    }, []);

    // Save to cache whenever state changes
    useEffect(() => {
        if (isAuthenticated) {
            saveToCache({ competitors, weights, testMode, lightMode });
        }
    }, [competitors, weights, testMode, lightMode, isAuthenticated]);

    const handleLogin = () => {
        const validUsername = process.env.REACT_APP_USERNAME;
        const validPassword = process.env.REACT_APP_PASSWORD;

        if (username === validUsername && password === validPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Incorrect username or password');
        }
    };

    const handleTechScoreChange = (category: string, type: 'difficulty' | 'execution', value: number) => {
        setTechScores(prev => ({
            ...prev,
            [category]: { ...prev[category], [type]: value }
        }));
    };

    const handlePerfScoreChange = (category: string, value: number) => {
        setPerfScores(prev => ({
            ...prev,
            [category]: value
        }));
    };

    const saveTechCompetitor = () => {
        if (!techCompetitorName.trim()) {
            alert('Please enter competitor name');
            return;
        }

        const newCompetitor: Competitor = {
            id: Date.now(),
            name: techCompetitorName,
            scores: techScores,
            total: calculateTechTotal(techScores, weights),
            timestamp: new Date().toISOString(),
            judgeType: 'technical'
        };

        setCompetitors(prev => [...prev, newCompetitor]);
        setTechCompetitorName('');
        setTechScores(
            CATEGORIES.reduce(
                (acc, cat) => ({ ...acc, [cat]: { difficulty: 0, execution: 0 } }),
                {} as Record<string, Score>
            )
        );
    };

    const savePerfCompetitor = () => {
        if (!perfCompetitorName.trim()) {
            alert('Please enter competitor name');
            return;
        }

        const newCompetitor: Competitor = {
            id: Date.now(),
            name: perfCompetitorName,
            scores: perfScores,
            total: calculatePerfTotal(perfScores),
            timestamp: new Date().toISOString(),
            judgeType: 'performance'
        };

        setCompetitors(prev => [...prev, newCompetitor]);
        setPerfCompetitorName('');
        setPerfScores({
            Choreography: 0,
            Performance: 0,
            Flow: 0
        });
    };

    if (!isAuthenticated) {
        return (
            <Login
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                onLogin={handleLogin}
                lightMode={lightMode}
            />
        );
    }

    return (
        <div className={`app-container ${lightMode ? 'light-mode' : ''}`}>
            <div className="header">
                <div className="header-container">
                    <h1 onClick={() => setLightMode(!lightMode)}>
                        Texas Diabolo Competition
                    </h1>
                </div>
            </div>

            <div className="tabs-container">
                <div className="tabs">
                    <button
                        onClick={() => setActiveTab('tech-scoring')}
                        className={`tab-button ${activeTab === 'tech-scoring' ? 'active' : ''}`}
                    >
                        <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                        Technical Scoring
                    </button>
                    <button
                        onClick={() => setActiveTab('perf-scoring')}
                        className={`tab-button ${activeTab === 'perf-scoring' ? 'active' : ''}`}
                    >
                        <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        Performance Scoring
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
                    >
                        <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            />
                        </svg>
                        Saved Competitors
                    </button>
                    <button
                        onClick={() => setActiveTab('admin')}
                        className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}
                    >
                        <svg className="icon-sm" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                        </svg>
                        Admin
                    </button>
                </div>
            </div>

            <div className="content">
                {activeTab === 'tech-scoring' && (
                    <TechnicalTab
                        competitorName={techCompetitorName}
                        setCompetitorName={setTechCompetitorName}
                        scores={techScores}
                        weights={weights}
                        testMode={testMode}
                        total={calculateTechTotal(techScores, weights)}
                        onScoreChange={handleTechScoreChange}
                        onSave={saveTechCompetitor}
                        onWeightChange={(category: string, weight: number) => setWeights({ ...weights, [category]: weight })}
                    />
                )}
                {activeTab === 'perf-scoring' && (
                    <PerformanceTab
                        competitorName={perfCompetitorName}
                        setCompetitorName={setPerfCompetitorName}
                        scores={perfScores}
                        total={calculatePerfTotal(perfScores, perfWeights)}
                        testMode={testMode}
                        onScoreChange={handlePerfScoreChange}
                        onSave={savePerfCompetitor}
                        perfWeights={perfWeights}
                        onPerfWeightChange={(category: string, weight: number) => setPerfWeights({ ...perfWeights, [category]: weight })}
                    />
                )}
                {activeTab === 'saved' && (
                    <SavedCompetitorsTab
                        competitors={competitors}
                        onDelete={(id: number) => setCompetitors(prev => prev.filter(c => c.id !== id))}
                    />
                )}
                {activeTab === 'admin' && (
                    <AdminTab
                        testMode={testMode}
                        setTestMode={setTestMode}
                        isAdminAuthenticated={isAdminAuthenticated}
                        setIsAdminAuthenticated={setIsAdminAuthenticated}
                    />
                )}
            </div>
        </div>
    );
}

export default App;
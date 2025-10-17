export interface Score {
    difficulty: number;
    execution: number;
}

export interface TechCompetitor {
    id: number;
    name: string;
    scores: Record<string, Score>;
    total: string;
    timestamp: string;
    judgeType: 'technical';
}

export interface PerfCompetitor {
    id: number;
    name: string;
    scores: Record<string, number>;
    total: string;
    timestamp: string;
    judgeType: 'performance';
}

export type Competitor = TechCompetitor | PerfCompetitor;

export const CATEGORIES = ['1D', '2D', '3D', '4D', 'VD', 'GX', '2DV'];
export const PERF_CATEGORIES = ['Choreography', 'Performance', 'Flow'];
export const DIFFICULTY_OPTIONS = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
export const PERF_OPTIONS = Array.from({ length: 41 }, (_, i) => i * 0.5);
export const DEFAULT_WEIGHTS: Record<string, number> = {
    '1D': 1,
    '2D': 1,
    '3D': 1,
    '4D': 1,
    'VD': 1,
    'GX': 1,
    '2DV': 1
};
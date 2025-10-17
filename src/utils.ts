export const calculateTechTotal = (
    scores: Record<string, { difficulty: number; execution: number }>,
    weights: Record<string, number>
): string => {
    let total = 0;
    Object.keys(scores).forEach(cat => {
        const weight = weights[cat] || 1;
        const { difficulty, execution } = scores[cat];
        total += (difficulty + execution) * weight;
    });
    return total.toFixed(2);
};

export const calculatePerfTotal = (scores: Record<string, number>): string => {
    return Object.values(scores).reduce((sum, val) => sum + val, 0).toFixed(2);
};

export const saveToCache = (data: any): void => {
    sessionStorage.setItem('diaboloData', JSON.stringify(data));
};

export const loadFromCache = (): any => {
    const saved = sessionStorage.getItem('diaboloData');
    return saved ? JSON.parse(saved) : null;
};
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

export const calculateTechMax = (weights: Record<string, number>): string => {
    let max = 0;
    Object.keys(weights).forEach(cat => {
        const weight = weights[cat] || 1;
        max += 20 * weight; // 20 = max difficulty (10) + max execution (10)
    });
    return max.toFixed(2);
};

export const calculatePerfTotal = (
    scores: Record<string, number>,
    perfWeights?: Record<string, number>
): string => {
    let total = 0;
    Object.keys(scores).forEach(cat => {
        const weight = perfWeights?.[cat] || 1;
        total += scores[cat] * weight;
    });
    return total.toFixed(2);
};

export const calculatePerfMax = (perfWeights?: Record<string, number>): string => {
    let max = 0;
    Object.keys(perfWeights || {}).forEach(cat => {
        const weight = perfWeights?.[cat] || 1;
        max += 20 * weight; // 20 = max score per category
    });
    return max.toFixed(2);
};

export const saveToCache = (data: any): void => {
    sessionStorage.setItem('diaboloData', JSON.stringify(data));
};

export const loadFromCache = (): any => {
    const saved = sessionStorage.getItem('diaboloData');
    return saved ? JSON.parse(saved) : null;
};
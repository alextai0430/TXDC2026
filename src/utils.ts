// ==================== src/utils.ts ====================
export const calculateTotal = (
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

export const saveToStorage = (data: any): void => {
    sessionStorage.setItem('diaboloData', JSON.stringify(data));
};

export const loadFromStorage = (): any => {
    const saved = sessionStorage.getItem('diaboloData');
    return saved ? JSON.parse(saved) : null;
};
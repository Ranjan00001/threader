/**
 * Common frontend helpers and formatters
 */

export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
};

export const generateId = () => Math.random().toString(36).substr(2, 9);

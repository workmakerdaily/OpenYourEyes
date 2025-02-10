export function debounce<T extends (...args: unknown[]) => void>(func: T, delay: number) {
    let timer: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

export function debounce<T extends (arg: string) => void>(func: T, delay: number) {
    let timer: NodeJS.Timeout;

    return (arg: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(arg);
        }, delay);
    };
}

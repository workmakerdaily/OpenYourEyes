// function: 입력값 변경 시 지정된 지연 시간 이후에 실행되는 디바운스 함수 //
export function debounce<T extends (arg: string) => void>(func: T, delay: number) {
    
    // variable: 지연 타이머 (NodeJS.Timeout 타입) //
    let timer: NodeJS.Timeout;

    return (arg: string) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func(arg);
        }, delay);
    };
}

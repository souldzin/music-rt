export function runAsync(fn) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(fn());
            } catch(e) {
                reject(e);
            }
        }, 0);
    });
}
export function runAsync(fn) {
    return Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(fn());
            } catch(e) {
                reject(e);
            }
        }, 0);
    });
}
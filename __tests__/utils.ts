export function randomBytes(n: number): number[] {
    return [...new Array(n)].map(() => Math.floor(Math.random() * 255));
}

export function randomBytes(n: number){
    return [...new Array(n)].map(() => Math.floor(Math.random() * 255));
}

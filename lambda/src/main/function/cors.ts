export const addCorsHeader = (header?: object): {[key:string]: string} => {
    return Object.assign({}, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
    }, header ? header : {});
}
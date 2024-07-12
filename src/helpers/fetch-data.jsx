export const fetchData = async () => {
    let result;
    await fetch('https://fakestoreapi.com/products', {mode: "cors"})
        .then(r => {
            if (r.status >= 400) {
                throw new Error ('server error');
            }
            return r.json();
        })
        .then(r => { result = r[0] })
        .catch(e => { result = `A network error has occurred: ${e}`})
    return result;
};

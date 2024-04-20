
export const register = async (values) => {
    console.log(values);
    console.log(JSON.stringify(values));
    const responseRegister = await fetch(import.meta.env.VITE_BACKEND_URL + '/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        credentials: 'include'
    })
}
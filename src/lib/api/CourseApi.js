import {PUBLIC_STUDENT_API} from "$env/static/public";

export const courseGetList = async () => {
    return await fetch(`${PUBLIC_STUDENT_API}/course`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const courseGet = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/course/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const coursePost = async ({name, code, credit}) => {
    return await fetch(`${PUBLIC_STUDENT_API}/course`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            code,
            credit
        })
    });
}

export const coursePatch = async (id, {name, code, credit}) => {
    return await fetch(`${PUBLIC_STUDENT_API}/course/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            code,
            credit
        })
    });
}

export const courseDelete = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/course/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
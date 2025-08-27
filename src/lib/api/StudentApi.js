import {PUBLIC_STUDENT_API} from "$env/static/public";

export const studentGetList = async () => {
    return await fetch(`${PUBLIC_STUDENT_API}/student`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const studentGet = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/student/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const studentPost = async ({name, email, departmentId}) => {
    return await fetch(`${PUBLIC_STUDENT_API}/student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            departmentId,
        })
    });
}

export const studentPatch = async (id, {name, email, departmentId}) => {
    return await fetch(`${PUBLIC_STUDENT_API}/student/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            departmentId,
        })
    });
}

export const studentDelete = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/student/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
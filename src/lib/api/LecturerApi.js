import {PUBLIC_STUDENT_API} from "$env/static/public";

export const lecturerGetList = async () => {
    return await fetch(`${PUBLIC_STUDENT_API}/lecturer`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const lecturerGet = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/lecturer/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export const lecturerPost = async ({name, email, title, departmentId}) => {
    return await fetch(`${PUBLIC_STUDENT_API}/lecturer`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            title,
            departmentId,
        })
    });
}

export const lecturerPatch = async (id, {name, email, title, departmentId}) => {
    return await fetch(`${PUBLIC_STUDENT_API}/lecturer/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
            email,
            title,
            departmentId,
        })
    });
}

export const lecturerDelete = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/lecturer/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
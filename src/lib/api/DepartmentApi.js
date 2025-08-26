import {PUBLIC_STUDENT_API} from "$env/static/public";

export const getDepartmentList = async () => {
    return await fetch(`${PUBLIC_STUDENT_API}/department`, {
        method: 'GET',
        headers: {
            'Accept': 'Application/json',
        }
    });
}

export const getDepartmentDetails = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/department/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'Application/json',
        }
    });
}

export const getDepartmentCreate = async ({name}) => {
    return await fetch(`${PUBLIC_STUDENT_API}/department`, {
        method: 'POST',
        headers: {
            'Accept': 'Application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
        })
    });
}

export const getDepartmentUpdate = async (id, {name}) => {
    return await fetch(`${PUBLIC_STUDENT_API}/department/${id}`, {
        method: 'PATCH',
        headers: {
            'Accept': 'Application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
        })
    });
}

export const getDepartmentDelete = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/department/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'Application/json',
        }
    });
}
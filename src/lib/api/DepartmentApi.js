import {PUBLIC_STUDENT_API} from "$env/static/public";

export const departmentGetList = async () => {
    return await fetch(`${PUBLIC_STUDENT_API}/department`, {
        method: 'GET',
        headers: {
            'Accept': 'Application/json',
        }
    });
}

export const departmentGet = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/department/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'Application/json',
        }
    });
}

export const departmentPost = async ({name}) => {
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

export const departmentPatch = async (id, {name}) => {
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

export const departmentDelete = async (id) => {
    return await fetch(`${PUBLIC_STUDENT_API}/department/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'Application/json',
        }
    });
}
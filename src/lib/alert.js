import Swal from "sweetalert2";

export const alertSuccess = async (message) => {
    if (message) {
        return await Swal.fire({
            icon: "success",
            title: "Success",
            text: message,
        });
    } else {
        return await Swal.fire({
            icon: "success",
            title: "Success",
            text: "successfully",
        });
    }
}

export const alertError = async (message) => {
    return await Swal.fire({
        icon: "error",
        title: "Ups",
        text: message,
    });
}

export const alertConfirm = async (message) => {
    if (message) {
        const response = await Swal.fire({
            icon: 'question',
            title: 'Confirm',
            text: message,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });

        return response.isConfirmed;
    } else {
        const response = await Swal.fire({
            icon: 'question',
            title: 'Confirm',
            text: 'are you sure?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        });

        return response.isConfirmed;
    }
}
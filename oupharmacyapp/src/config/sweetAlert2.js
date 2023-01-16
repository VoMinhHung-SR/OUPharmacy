import Swal from 'sweetalert2'

const SuccessfulAlert = (title, confirmButtonText, callback) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success'
        }, buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        position: 'center', icon: 'success', title: title, showConfirmButton: true, confirmButtonText: confirmButtonText
    }).then(callback);
};

export const ErrorAlert = (title, text, confirmButtonText) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-danger'
        }, buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        icon: 'error', title: title, text: text, showConfirmButton: true, confirmButtonText: confirmButtonText
    });
};

export const ConfirmAlert = (title, text, confirmButtonText, cancelButtonText, callback) => {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success ml-3', cancelButton: 'btn btn-danger  mr-5'
        }, buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        reverseButtons: true
    }).then(function (result){
        if(result.isConfirmed)
            callback();
    });
};

export default SuccessfulAlert
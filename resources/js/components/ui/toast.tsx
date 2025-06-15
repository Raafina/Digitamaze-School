import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePage } from '@inertiajs/react';

export default function FlashAlert() {
    const props = usePage().props as { flash?: { success?: string; error?: string } };
    const flash = props.flash || {};

    useEffect(() => {
        if (flash.success) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: flash.success,
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                background: '#22c55e',
                iconColor: '#ffffff',
                color: '#ffffff',
                customClass: {
                    popup: 'shadow-lg rounded-md',
                },
            });
        } else if (flash.error) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: flash.error,
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
                background: '#ef4444',
                iconColor: '#ffffff',
                color: '#ffffff',
                customClass: {
                    popup: 'shadow-lg rounded-md',
                },
            });
        }
    }, [flash.success, flash.error]);

    return null;
}

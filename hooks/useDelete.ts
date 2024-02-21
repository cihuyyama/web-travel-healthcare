import { BASE_URL } from '@/types/BaseURL';
import React from 'react'
import { toast } from 'sonner';

interface props {
    endpoint: string,
    param: number,
}

function useDelete({ endpoint, param }: props) {
    try {
        const cookieValue = document.cookie.split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
        toast.promise(
            fetch(`${BASE_URL}${endpoint}/${param}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${cookieValue}`,
                },
            }),
            {
                loading: 'Deleting...',
                success:  () => {
                    return 'Deleted Successfully';
                },
                error: 'Error deleting'
            }
        )
    } catch (error) {
        return error;
    }
}

export default useDelete
import { BASE_URL } from '@/types/BaseURL';
import React from 'react'
import { toast } from 'sonner';

interface props {
    endpoint: string,
}

interface endemicCreateProps {
    country_name: string,
    risk_level: string,
}


function useCreate({ endpoint }: props, { country_name, risk_level }: endemicCreateProps) {
    try {
        const cookieValue = document.cookie.split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
        toast.promise(
            fetch(`${BASE_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${cookieValue}`,
                },
                body: JSON.stringify({ "province": country_name, "risk_level": risk_level })
            }),
            {
                loading: 'Saving...',
                success: () => {
                    setTimeout(() => {
                        location.reload();
                    }, 500);
                    return 'Saved successfully';
                },
                error: 'Error Saving'
            }
        )
    } catch (error) {
        return error;
    }
}

export default useCreate
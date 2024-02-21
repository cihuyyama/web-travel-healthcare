
import { BASE_URL } from '@/types/BaseURL';
import { toast } from 'sonner';

interface props {
    endpoint: string
}

async function useGetALL({ endpoint }: props) {
    let status = 0
    try {
        const cookieValue = document.cookie.split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${cookieValue}`,
            }
        });
        status = response.status
        if (status === 401 || status === 400) {
            window.location.href = '/auth';
            toast.error('You are not authorized to view this page');
        }
        const data = await response.json();
        
        return data;
    } catch (error) {
        
        return error;
    }
}

export default useGetALL
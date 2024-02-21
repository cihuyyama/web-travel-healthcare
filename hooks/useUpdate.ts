
import { BASE_URL } from '@/types/BaseURL';
import { toast } from 'sonner';

interface props {
    endpoint: string,
    param: number,
    province: string,
    risk: string
}

async function useUpdate({ endpoint, param, province, risk }: props) {
    try {
        const cookieValue = document.cookie.split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];
        toast.promise(
            fetch(`${BASE_URL}${endpoint}/${param}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${cookieValue}`,
                },
                body: JSON.stringify({ "province": province, "risk_level": risk})
            }),
            {
                loading: 'Saving...',
                success:  () => {
                    return 'Updated successfully';
                },
                error: 'Error updating'
            }
        )
    } catch (error) {
        return error;
    }
}

export default useUpdate
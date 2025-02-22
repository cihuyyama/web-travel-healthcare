
import { BASE_URL } from '@/types/BaseURL';
import { toast } from 'sonner';

interface props {
    endpoint: string,
    param: number,
    province: string,
    risk: string
    score: number
}

async function useUpdate({ endpoint, param, province, risk, score }: props) {
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
                body: JSON.stringify({ "province": province, "risk_level": risk, "risk_score": score})
            }),
            {
                loading: 'Saving...',
                success:  () => {
                    setTimeout(() => {
                        location.reload();
                    }, 500);
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
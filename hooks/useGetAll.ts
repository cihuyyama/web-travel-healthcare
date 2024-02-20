import fetcher from '@/lib/fetcher'
import { BASE_URL } from '@/types/BaseURL';
import axios from 'axios'
import { cookies } from 'next/headers';
import useSWR from 'swr'

interface props {
    endpoint: string
}

async function useGetALL({ endpoint }: props) {
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
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export default useGetALL
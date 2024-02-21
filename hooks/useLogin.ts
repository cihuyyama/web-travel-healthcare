import { BASE_URL } from '@/types/BaseURL';
import { redirect, useRouter } from 'next/navigation';
import { useState, ChangeEvent, FormEvent, use } from 'react';
import { toast } from 'sonner';

interface LoginState {
  email: string;
  password: string;
  loading: boolean;
  error: string | null;
}

interface LoginHandlers {
  handleEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

const useLogin = (): LoginState & LoginHandlers => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      toast.promise(
        fetch(`${BASE_URL}/users/login`, {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json',
          }
        }),
        {
          loading: 'Logging in...',
          success: async (response) => {
            const data = await response.json();
            document.cookie = `token=${data.token}`;
            router.push('/dashboard');
            return 'Logged in successfully';
          },
          error: 'Error logging in'
        })
    } catch (error) {
      setError(String(error));
      console.error('outside ' + error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useLogin;

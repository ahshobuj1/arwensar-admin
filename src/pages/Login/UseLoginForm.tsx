// src/hooks/useLoginForm.ts
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router';
import toast from 'react-hot-toast';
import {loginFormSchema, type LoginFormData} from './type';
import {useLoginMutation} from '@/features/auth/authApi';

export const useLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, {isLoading, isSuccess, isError, error}] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
    trigger,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onTouched', // better UX: validate on blur/touch
    defaultValues: {
      email: '',
      password: '',
      terms: true, // pre-checked
    },
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Optional: watch terms value if needed elsewhere
  const termsValue = watch('terms');

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const result = await login({email, password}).unwrap();
  //     console.log('Login success:', result);
  //     navigate('/dashboard');
  //     // You can redirect or store user info here
  //   } catch (err: unknown) {
  //     toast.error(getErrorMessage(err));
  //   }
  // };

  const onSubmit = async (data: LoginFormData) => {
    try {
      // const res = await loginVendor({
      //   email: data.email,
      //   password: data.password,
      //   terms: false,
      // }).unwrap();

      const res = await login({
        email: data.email,
        password: data.password,
        terms: false,
      }).unwrap();
      console.log('Login success:', res);
      toast.success('Login successful! Redirecting...');
      // navigate('/dashboard');

      console.log(res);

      if (res.success) {
        toast.success('Login successful! Redirecting...', {
          position: 'top-center',
          duration: 3000,
        });

        setTimeout(() => {
          navigate('/dashboard', {replace: true});
        }, 500);
      }
    } catch (err: any) {
      const message = err?.data?.message || 'Login failed. Please try again.';
      toast.error(message, {
        position: 'top-center',
      });
    }
  };

  // Helper to safely update terms + trigger validation
  const handleTermsChange = (checked: boolean) => {
    setValue('terms', checked, {shouldValidate: true});
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isLoading,
    isSuccess,
    isError,
    error: error as any,
    showPassword,
    togglePasswordVisibility,
    setValue, // Now available!
    trigger, // For manual validation
    terms: termsValue, // Current value of checkbox
    handleTermsChange, // Recommended way to handle checkbox
  };
};

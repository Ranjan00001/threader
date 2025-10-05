import { useState } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import apiClient from '@/imports/api';

interface ApiError {
    message: string;
    status?: number;
}

interface UseApiReturn {
    get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
    post: <T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
    del: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
    loading: boolean;
    error: ApiError | null;
}


export const useApi = (): UseApiReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const handleRequest = async <T>(
        method: 'get' | 'post' | 'delete',
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<T> => {
        try {
            setLoading(true);
            setError(null);

            const response = await apiClient.request<T>({
                method,
                url,
                data,
                ...config,
            });

            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError;
            setError({
                message: axiosError.message || 'Something went wrong',
                status: axiosError.response?.status
            });
            throw axiosError;
        } finally {
            setLoading(false);
        }
    };

    const get = <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
        return handleRequest<T>('get', endpoint, undefined, config);
    };

    const post = <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        return handleRequest<T>('post', endpoint, data, config);
    };

    const del = <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
        return handleRequest<T>('delete', endpoint, undefined, config);
    };

    return {
        get,
        post,
        del,
        loading,
        error
    };
};
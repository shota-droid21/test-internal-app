import useSWR from "swr";
import axios from "axios";

interface FetcherParams {
    url: string;
}

const fetcher = async (params: FetcherParams) => {
    return await axios
        .get(params.url, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.data);
};

interface UseFetchSWRResult<T> {
    data: T;
    loading: boolean;
    error: any;
}

export function useFetchSWR<T = any>(url: string): UseFetchSWRResult<T> {
    const { data, error, isLoading } = useSWR({ url: url }, fetcher, {
        revalidateOnFocus: true,
        refreshInterval: 360000,
        shouldRetryOnError: false
    });

    return {
        data: data == undefined ? [] : data,
        loading: isLoading,
        error: error
    };
}

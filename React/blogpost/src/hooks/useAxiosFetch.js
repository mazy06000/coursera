import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();
        const fetchData = async (url) => {
            setLoading(true);
            try {
                const response = await axios.get(url, { cancelToken: source.token });
                if (isMounted) {
                    setData(response.data);
                    setFetchError('');
                }
            } catch (error) {
                if (isMounted) {
                    setFetchError(error.message);
                    setData([]);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        
        fetchData(dataUrl);
        return () => {
            isMounted = false;
            source.cancel('Cancelling in cleanup');
        };
    }, [dataUrl]);

    return { data, fetchError, loading };
}

export default useAxiosFetch;
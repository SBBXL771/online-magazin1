import { useEffect, useState } from "react";



export const useDebaunce = (query: string, delay: number = 500) => {
    const [debounce, setDebounce] = useState(query);

    useEffect(() => {
        const handelTime = setTimeout(() => {
            setDebounce(query);
        }, delay);

        return () => {
            clearTimeout(handelTime);
        }
    }, [query, delay]);
   
    return debounce

}
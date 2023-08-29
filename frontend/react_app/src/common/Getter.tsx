import { useEffect, useState } from 'react';
import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:3030" 
});

export function GetElements(locationGet: string) {

    const [items, getitems] = useState([]);

    useEffect(() => {
        client.get(`${locationGet}`).then((response) => {
            getitems(response.data)
        });
    }, []);

    return items;
}

export { client };
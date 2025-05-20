'use client';
import { useEffect, useState } from 'react';

export default function useProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data);
        }

        fetchProducts();
    }, []);

    return products;
}

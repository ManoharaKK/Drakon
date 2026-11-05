'use client';

import { useEffect, useState } from 'react';

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
};

function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((json) => {
        const list = json?.data;
        setProducts(Array.isArray(list) ? list : []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Saved Products</h1>
      {products.length === 0 && <p>No products found</p>}
      {products.map((product) => (
        <div
          key={product._id}
          style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}
        >
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default AllProductsPage;

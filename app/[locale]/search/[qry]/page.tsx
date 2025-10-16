import ProductCarousel from "@/components/ProductCarausel";
import axios from "axios";
import React from "react";

interface Props {
  params: {
    query: string;
  };
}

const Search = async ({ params }: Props) => {
  try {
    const { query } = params;

    const result = await axios.get(
      `https://dummyjson.com/products/search?q=${query}`
    );

    return (
      <div className="mt-8">
        <h1 className="text-3xl font-semibold mb-4">Qidiruv: {query}</h1>
        <ProductCarousel products={result.data.products} />
      </div>
    );
  } catch (error) {
    return <div>Serverda xatolik yuz berdi!</div>;
  }
};

export default Search;

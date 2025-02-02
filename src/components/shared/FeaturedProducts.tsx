import { useGetAllProductsQuery } from "@/redux/features/products/productApi"
import FeaturedCard from "./FeaturedCard";

import { Button } from "../ui/button";
import { TProduct } from "@/types/form.types";
import { Link } from "react-router";
import { useState } from "react";


const FeaturedProducts = () => {
    const [search] = useState("");
      const [minPrice] = useState<number>(0);
      const [maxPrice] = useState<number>(700000);
      const [brand] = useState("");
      const [category] = useState("");
      const [availability] = useState("");
    
      const queryArgs = [
        { name: "search", value: search },
        { name: "minPrice", value: minPrice },
        { name: "maxPrice", value: maxPrice },
        { name: "brand", value: brand },
        { name: "category", value: category },
        { name: "inStock", value: availability },
      ].filter(
        (arg) => arg.value !== "" && arg.value !== "all" && arg.value !== null
      );
    
      const { data, isLoading, isFetching } = useGetAllProductsQuery(queryArgs, {
        // skip: true,
      });
    
    console.log(isLoading);
    console.log(isFetching);
  const products = data?.data;
  
  
    return (
      <div>
        <h1 className="text-3xl font-bold text-center mt-8">
          Featured Product
        </h1>
        <div className="grid lg:grid-cols-4 gap-6 justify-items-center p-10">
          {products?.map((item: TProduct) => (
            <FeaturedCard key={item?.name} item={item} />
          ))}
        </div>
        <div className="flex justify-center">
          <Link to={'/all-products'}>
            <Button>View All Products</Button>
          </Link>
        </div>
      </div>
    );
}

export default FeaturedProducts

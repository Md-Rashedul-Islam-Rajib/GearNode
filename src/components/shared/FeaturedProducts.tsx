import { useGetAllProductsQuery } from "@/redux/features/products/productApi"
import FeaturedCard from "./FeaturedCard";

import { Button } from "../ui/button";
import { TProduct } from "@/types/form.types";
import { Link } from "react-router";


const FeaturedProducts = () => {
    const {data, isLoading,isFetching} = useGetAllProductsQuery(undefined);
    
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

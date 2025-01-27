import { useGetAllProductsQuery } from "@/redux/features/products/productApi"
import FeaturedCard from "./FeaturedCard";

import { Button } from "../ui/button";
import { TProduct } from "@/types/form.types";


const FeaturedProducts = () => {
    const {data, isLoading,isFetching} = useGetAllProductsQuery(undefined);
    
    console.log(isLoading);
    console.log(isFetching);
    const products = data?.data;
  
    return (
      <div>
            
<h1 className="text-3xl font-bold text-center mt-8">Featured Product</h1>
    <div className="grid lg:grid-cols-3 gap-6 justify-items-center p-10">
          {
              products?.map((item: TProduct) => <FeaturedCard key={item?.name} item={item}/>)
            }
            </div>
            <div className="flex justify-center">
            <Button>View All Products</Button>
            </div>
            </div>
  );
}

export default FeaturedProducts

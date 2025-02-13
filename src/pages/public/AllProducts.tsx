import ProductCard from "@/components/shared/ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/products/productApi";
import { TProduct } from "@/types/form.types";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Bike from "@/components/loaders/Bike";
// import { generateQueryParams } from "nhb-toolbox";

const AllProducts = () => {
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(700000);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [availability, setAvailability] = useState("");

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
  // const {data, isLoading,isFetching} = useGetAllProductsQuery(undefined);

  console.log(isLoading);
  console.log(isFetching);
  const products = data?.data;

  const brands = ["all", ...new Set(products?.map((product) => product.brand))];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Bike />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-8">All Products</h1>

      {/* Filter and Search Section */}
      <div className="p-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between rounded-lg shadow mb-6">
        {/* Search */}
        <div className="w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search by brand, name, or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="w-full md:w-1/3">
          <p className="mb-2 text-gray-700">Price Range:</p>
          <Slider
            defaultValue={[0, 700000]}
            min={0}
            max={700000}
            step={5000}
            onValueChange={(value) => {
              setMinPrice(value[0]);
              setMaxPrice(value[1]);
            }}
          />
          <div className="text-sm text-gray-500 flex justify-between mt-2">
            <span>{minPrice} BDT</span>
            <span>{maxPrice} BDT</span>
          </div>
        </div>

        {/* Filters: Brand, Category, Availability */}
        <div className="space-y-4 md:space-y-0 md:flex md:space-x-4">
          {/* Brand Filter */}
          <Select onValueChange={setBrand} value={brand}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((b) => (
                <SelectItem value={b} key={b}>
                  {b === "all" ? "All Brands" : b}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Scooter">Scooter</SelectItem>
              <SelectItem value="road">Road</SelectItem>
              <SelectItem value="mountain">Mountain</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="electric">Electric</SelectItem>
            </SelectContent>
          </Select>

          {/* Availability Filter */}
          <Select onValueChange={setAvailability} value={availability}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="true">In Stock</SelectItem>
              <SelectItem value="false">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid lg:grid-cols-4 gap-6 justify-items-center p-10">
        {products?.map((item: TProduct) => (
          <ProductCard key={item?.name} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import image1 from "../../../public/assets/banner/image-1.jpg";
import image3 from "../../../public/assets/banner/image-3.jpg";
import image4 from "../../../public/assets/banner/image-4.jpg";
import image5 from "../../../public/assets/banner/image-5.jpg";
import image6 from "../../../public/assets/banner/image-6.jpg";
import image7 from "../../../public/assets/banner/image-7.jpg";
import image8 from "../../../public/assets/banner/image-8.jpg";


import { CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Banner() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  // Array of images
  const images = [
    image1,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];

  return (
    <Carousel
      plugins={[plugin.current]} // Use Autoplay plugin here
      className="w-full max-w-6xl mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {images.map((imgSrc, index) => (
          <CarouselItem key={index}>
            <div className="">
              <CardContent className="aspect-[16/9]">
                <img
                  src={imgSrc}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl mt-6"
                />
              </CardContent>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

export default Banner;

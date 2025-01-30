"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const links = [
  {
    name: "Islamic Talks",
    image_url:
      "https://res.cloudinary.com/daukkeshg/image/upload/v1737725103/010_usqzsc.jpg",
  },
  {
    name: "Charity Tournament",
    image_url:
      "https://res.cloudinary.com/daukkeshg/image/upload/v1737725037/006_ycptyr.jpg",
  },
  {
    name: "Workshops",
    image_url:
      "https://res.cloudinary.com/daukkeshg/image/upload/v1737724898/003_nwasnj.jpg",
  },
];

export default function EventsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );
  return (
    <div className="flex items-center justify-center">
      <Carousel className="w-full max-w-md" plugins={[plugin.current]}>
        <CarouselContent>
          {links.map((link) => {
            return (
              <CarouselItem key={link.name}>
                <div className="rounded-xl p-1">
                  <Card className="overflow-hidden border-4">
                    <CardContent className="flex items-center justify-center p-0 h-[600px]">
                      <div
                        style={{ backgroundImage: `url(${link.image_url})` }}
                        className="relative bg-cover bg-center w-full h-full flex items-center justify-center"
                      >
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative z-10">
                          <span className=" text-4xl font-bold text-white ">
                            {link.name}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </div>
  );
}

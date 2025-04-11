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
      "https://ik.imagekit.io/djga6bl1m/site-assets/talk?updatedAt=1744298030546",
  },
  {
    name: "Charity Tournament",
    image_url:
      "https://ik.imagekit.io/djga6bl1m/site-assets/charity-tournament?updatedAt=1744297980463",
  },
  {
    name: "Workshops",
    image_url:
      "https://ik.imagekit.io/djga6bl1m/site-assets/workshop?updatedAt=1744297903912",
  },
  {
    name: "Island Trip",
    image_url:
      "https://ik.imagekit.io/djga6bl1m/site-assets/island-trip?updatedAt=1744298057265",
  },
  {
    name: "Annual Dinner",
    image_url:
      "https://ik.imagekit.io/djga6bl1m/site-assets/annual-dinner?updatedAt=1744298076368",
  },
  {
    name: "Gaming Nights",
    image_url:
      "https://ik.imagekit.io/djga6bl1m/site-assets/gaming-night?updatedAt=1744297931422",
  },
  {
    name: "And More!",
    image_url:
      "https://ik.imagekit.io/djga6bl1m/site-assets/and-more?updatedAt=1744298093861",
  },
];

export default function EventsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true }),
  );
  return (
    <div className="flex items-center justify-center">
      {/* <Carousel className="w-full max-w-md" plugins={[plugin.current]}> */}
      <Carousel className="w-full" plugins={[plugin.current]}>
        <CarouselContent>
          {links.map((link) => {
            return (
              <CarouselItem
                key={link.name}
                className="lg:basis-1/2 xl:basis-1/3"
              >
                <div className="rounded-xl p-1">
                  <Card className="overflow-hidden border-2">
                    <CardContent className="flex items-center justify-center p-0 h-[550px]">
                      <div
                        style={{ backgroundImage: `url(${link.image_url})` }}
                        className="relative bg-cover bg-center w-full h-full flex items-center justify-center"
                      >
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="relative z-10">
                          <span className="text-3xl md:text-4xl font-bold text-white ">
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

import Link from "next/link";
import { lusitana } from "@/components/ui/fonts";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import talkImage from "@/public/talk.jpg";
import Salam from "@/public/salam.png";
import EventsCarousel from "@/components/ui/events-carousel";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <main>
      <h1
        className={`${lusitana.className} hidden mb:block mb-4 text-xl md:text-2xl`}
      >
        Home
      </h1>
      <div className="flex flex-col gap-5">
        <div className="relative bg-gray-200 rounded-xl h-[80vh] lg:h-screen p-5 lg:mb-4 bg-[url('/crowd.jpg')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black opacity-60 rounded-xl"></div>
          <div className="text-white relative flex flex-col justify-center items-center h-full gap-6 lg:gap-9">
            <div>
              <Image
                src={Salam}
                width={700}
                height={100}
                alt="Salam"
                className=""
              ></Image>
            </div>
            <div className="text-center font-medium text-xl lg:text-3xl">
              <p>
                Welcome to The University of Nottingham{" "}
                <span className="">Islamic Society</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 rounded-xl p-5">
          <div className="flex flex-col xl:flex-row gap-8">
            <div className="flex-1">
              <div className="flex flex-col gap-5">
                <div className="flex flex-1 items-center">
                  <Image
                    src={talkImage}
                    width={900}
                    height={400}
                    alt="Image of audience at a live talk"
                    className="rounded-xl"
                  ></Image>
                </div>
                <h1 className="text-blue-600 font-black text-4xl">
                  Who We Are
                </h1>
                <p className="text-justify text-slate-700 text-sm md:text-base">
                  We are a vibrant and welcoming community of students brought
                  together by a shared faith and a commitment to fostering
                  unity, growth, and understanding on campus. The ISOC is a
                  space for Muslims at the University of Nottingham Malaysia to
                  connect, support one another, and grow both spiritually and
                  socially. At the same time, we aim to build bridges of
                  understanding and collaboration with the wider university
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 rounded-xl p-5">
          <div className="flex flex-col xl:flex-row gap-5">
            <h1 className="font-black text-4xl text-white">What We Do</h1>
            <EventsCarousel />
          </div>
        </div>
        <div className="bg-gray-200 rounded-xl p-5">
          <Footer />
        </div>
      </div>
    </main>
  );
}

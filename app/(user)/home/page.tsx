import Link from "next/link";
import { lusitana } from "@/components/ui/fonts";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Salam from "@/public/salam.png";
import EventsCarousel from "@/components/ui/events-carousel";
import Footer from "@/components/ui/footer";
import { HOME_URLS } from "@/lib/images";

export default function Home() {
  return (
    <main>
      <h1
        className={`${lusitana.className} hidden mb:block mb-4 text-xl md:text-2xl`}
      >
        Home
      </h1>
      <div className="flex flex-col gap-5">
        <div
          className="relative bg-gray-200 rounded-xl h-[80vh] lg:h-screen p-5 bg-cover bg-center"
          style={{ backgroundImage: `url(${HOME_URLS.hero})` }}
        >
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
                Welcome to The University of Nottingham
                <span> Islamic Society</span>
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 rounded-xl p-5 2xl:hidden border-2 lg:px-28 md:px-16 border-black">
          <div className="flex flex-col gap-8">
            <div className="flex Lflex-col gap-8">
              <div className="flex flex-col gap-5">
                <h1 className="text-blue-600 font-black text-4xl">
                  Who Are We
                </h1>
                <div className="flex flex-1 items-center">
                  <Image
                    src={HOME_URLS.crowd}
                    width={900}
                    height={400}
                    alt="Image of audience at a live talk"
                    className="rounded-xl"
                  ></Image>
                </div>

                <p className="text-justify text-slate-700 text-sm md:text-base">
                  We are a vibrant and welcoming community of students brought
                  together by a shared faith and a commitment to fostering
                  unity, growth, and understanding on campus. The ISOC is a
                  space for Muslims at the University of Nottingham Malaysia to
                  connect, support one another, and grow both spiritually and
                  socially. At the same time, we aim to build bridges of
                  understanding and collaboration with the wider university
                  community. Through engaging events, insightful discussions,
                  and meaningful initiatives, we strive to create an inclusive
                  environment where students can strengthen their faith, develop
                  leadership skills, and form lasting friendships. <br /> <br />
                  Whether through weekly prayers, charity drives, educational
                  workshops, or social gatherings, ISOC serves as a hub for both
                  personal and collective development. No matter where you are
                  on your journey, you are welcome here. Join us in fostering a
                  campus community built on faith, compassion, and unity.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 rounded-xl p-5 2xl:hidden lg:px-28 md:px-16 ">
          <div className="flex flex-col gap-5">
            <h1 className="text-white font-black text-4xl text-right">
              Our Headquarters
            </h1>
            <div className="flex flex-1 items-center">
              <Image
                src={HOME_URLS.masjid}
                width={900}
                height={400}
                alt="Image of Islamic Center at UNM"
                className="rounded-xl"
              ></Image>
            </div>

            <p className="text-justify text-slate-200 text-sm md:text-base">
              We are a vibrant and welcoming community of students brought
              together by a shared faith and a commitment to fostering unity,
              growth, and understanding on campus. The ISOC is a space for
              Muslims at the University of Nottingham Malaysia to connect,
              support one another, and grow both spiritually and socially. At
              the same time, we aim to build bridges of understanding and
              collaboration with the wider university community. Through
              engaging events, insightful discussions, and meaningful
              initiatives, we strive to create an inclusive environment where
              students can strengthen their faith, develop leadership skills,
              and form lasting friendships. <br /> <br />
              Whether through weekly prayers, charity drives, educational
              workshops, or social gatherings, ISOC serves as a hub for both
              personal and collective development. No matter where you are on
              your journey, you are welcome here. Join us in fostering a campus
              community built on faith, compassion, and unity.
            </p>
          </div>
        </div>

        <div className="bg-gray-200 rounded-xl p-5 hidden 2xl:block border-2 xl:px-36 border-black">
          <div className="flex flex-col gap-8">
            <div className="flex 2xl:flex-row-reverse gap-8">
              <div className="flex-1">
                <Image
                  src={HOME_URLS.crowd}
                  width={900}
                  height={400}
                  alt="Image of audience at a live talk"
                  // className="rounded-xl"
                  className="h-full w-auto  rounded-xl"
                ></Image>
              </div>
              <div className="flex flex-1 flex-col justify-evenly gap-2">
                <h1 className="text-blue-600 font-black text-4xl">
                  Who Are We
                </h1>
                <p className="text-justify text-slate-700 text-sm md:text-base">
                  We are a vibrant and welcoming community of students brought
                  together by a shared faith and a commitment to fostering
                  unity, growth, and understanding on campus. The ISOC is a
                  space for Muslims at the University of Nottingham Malaysia to
                  connect, support one another, and grow both spiritually and
                  socially. At the same time, we aim to build bridges of
                  understanding and collaboration with the wider university
                  community. Through engaging events, insightful discussions,
                  and meaningful initiatives, we strive to create an inclusive
                  environment where students can strengthen their faith, develop
                  leadership skills, and form lasting friendships. <br /> <br />
                  Whether through weekly prayers, charity drives, educational
                  workshops, or social gatherings, ISOC serves as a hub for both
                  personal and collective development. No matter where you are
                  on your journey, you are welcome here. Join us in fostering a
                  campus community built on faith, compassion, and unity.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 rounded-xl p-5 hidden 2xl:block xl:px-36 border-black">
          <div className="flex 2xl:flex-row gap-8">
            <div className="flex-1">
              <Image
                src={HOME_URLS.masjid}
                width={900}
                height={400}
                alt="Image of Islamic Center at UNM"
                // className="rounded-xl"
                className="h-full w-auto  rounded-xl"
              ></Image>
            </div>
            <div className="flex flex-1 flex-col justify-evenly gap-2">
              <h1 className="text-white font-black text-4xl">
                Our Headquarters
              </h1>
              <p className="text-justify text-slate-200 text-sm md:text-base">
                We are a vibrant and welcoming community of students brought
                together by a shared faith and a commitment to fostering unity,
                growth, and understanding on campus. The ISOC is a space for
                Muslims at the University of Nottingham Malaysia to connect,
                support one another, and grow both spiritually and socially. At
                the same time, we aim to build bridges of understanding and
                collaboration with the wider university community. Through
                engaging events, insightful discussions, and meaningful
                initiatives, we strive to create an inclusive environment where
                students can strengthen their faith, develop leadership skills,
                and form lasting friendships. <br /> <br />
                Whether through weekly prayers, charity drives, educational
                workshops, or social gatherings, ISOC serves as a hub for both
                personal and collective development. No matter where you are on
                your journey, you are welcome here. Join us in fostering a
                campus community built on faith, compassion, and unity.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 border-2 border-black rounded-xl p-5 xl:px-36 lg:px-32 md:px-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-black text-4xl text-blue-600">What We Do</h1>
            <EventsCarousel />
          </div>
        </div>
        <div className="bg-gray-700 rounded-xl p-5 xl:px-36 lg:px-28 md:px-16 ">
          <Footer />
        </div>
      </div>
    </main>
  );
}

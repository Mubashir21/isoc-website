import Link from "next/link";
import { lusitana } from "@/components/ui/fonts";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Salam from "@/public/salam.png";
import EventsCarousel from "@/components/ui/events-carousel";
import Footer from "@/components/ui/footer";
import { HOME_URLS } from "@/lib/images";

const info = {
  about: (
    <>
      Established in 2006, the Islamic Society at the University of Nottingham
      Malaysia is a vibrant and welcoming community dedicated to fostering
      brotherhood and sisterhood among students. We strive to create a space
      where both Muslims and non-Muslims can learn about and engage with the
      beauty of Islam. <br />
      <br /> Balancing faith and academics can be challenging, and our society
      provides an avenue for students to stay connected to their religion while
      navigating university life. Through a diverse range of events—including
      talks, sports activities, island trips, and sisters-only events such as
      away days visiting Islamic museums—we aim to cater to different interests
      and ensure there’s something for everyone. <br />
      <br /> Whether you're looking to deepen your understanding of Islam, find
      a supportive community, or simply relieve stress, ISOC is here for you.
    </>
  ),
  masjid: (
    <>
      The masjid on campus, officially known as the Islamic Center, is more than
      just a place of prayer—it is the heart of our ISOC and a sanctuary for all
      students. As our base, it serves as a hub for our activities, from
      congregational prayers and study circles to community gatherings and
      spiritual discussions. Above all, the masjid is the House of Allah, a
      place of worship, peace, and reflection.
      <br />
      <br />
      Beyond ISOC, the masjid also hosts its own activities and events, with
      both brothers and sisters leading initiatives such as Tajweed classes,
      Tafseer sessions, and short masjid reminders. It is also a space for
      students to unwind and build friendships through fun and engaging
      activities—whether it's gaming nights for the brothers, chai nights for
      the sisters, or just a place to relax. <br />
      <br />
      The masjid is more than a building—it is a refuge, a source of strength,
      and a home away from home. Whether you seek knowledge, companionship, or a
      moment of stillness in the presence of Allah, the masjid welcomes you with
      open doors.
    </>
  ),
};

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
                  {info.about}
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
              {info.masjid}
            </p>
          </div>
        </div>

        <div className="bg-gray-200 rounded-xl p-5 hidden 2xl:block border-2 2xl:px-64 border-black">
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
                  {info.about}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-blue-600 rounded-xl p-5 hidden 2xl:block 2xl:px-64 border-black">
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
                {info.masjid}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 border-2 border-black rounded-xl p-5 2xl:px-64 lg:px-32 md:px-16">
          <div className="flex flex-col gap-5">
            <h1 className="font-black text-4xl text-blue-600">What We Do</h1>
            <EventsCarousel />
          </div>
        </div>
        <div className="bg-gray-700 rounded-xl p-5 2xl:px-64 lg:px-28 md:px-16 ">
          <Footer />
        </div>
      </div>
    </main>
  );
}

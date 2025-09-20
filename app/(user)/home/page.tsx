import type { Metadata } from "next";
import Link from "next/link";
import { lusitana } from "@/components/ui/fonts";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Salam from "@/public/salam.png";
import EventsCarousel from "@/components/ui/events-carousel";
import Footer from "@/components/ui/footer";
import { ResponsiveContainer } from "@/components/responsive-container";
import { HOME_URLS } from "@/lib/images";

export const metadata: Metadata = {
  title: "Home | Islamic Society UNM",
  description: "Welcome to the Islamic Society at the University of Nottingham Malaysia. Discover our vibrant community, upcoming events, and learn about our mission to foster brotherhood and sisterhood among students.",
  keywords: [
    "ISOC UNM home",
    "Islamic Society UNM",
    "Muslim community Malaysia",
    "University Nottingham Islamic Center",
    "Student organization",
    "Islamic events Malaysia",
    "Brotherhood sisterhood",
    "Campus mosque"
  ],
  openGraph: {
    title: "Home | Islamic Society UNM",
    description: "Welcome to the Islamic Society at the University of Nottingham Malaysia. Join our vibrant community of Muslim students.",
    type: "website",
  },
};

const info = {
  about: (
    <>
      Established in 2006, the Islamic Society at the University of Nottingham
      Malaysia is a vibrant and welcoming community dedicated to fostering
      brotherhood and sisterhood among students. We strive to create a space
      where both Muslims and non-Muslims can learn about and engage with the
      beauty of Islam.
      <br />
      <br />
      Balancing faith and academics can be challenging, and our society provides
      an avenue for students to stay connected to their religion while
      navigating university life. Through a diverse range of
      events&mdash;including talks, sports activities, island trips, and
      sisters-only events such as away days visiting Islamic museums&mdash;we
      aim to cater to different interests and ensure there&apos;s something for
      everyone.
      <br />
      <br />
      Whether you&apos;re looking to deepen your understanding of Islam, find a
      supportive community, or simply relieve stress, ISOC is here for you.
    </>
  ),
  masjid: (
    <>
      The masjid on campus, officially known as the Islamic Center, is more than
      just a place of prayer&mdash;it is the heart of our ISOC and a sanctuary
      for all students. As our base, it serves as a hub for our activities, from
      congregational prayers and study circles to community gatherings and
      spiritual discussions. Above all, the masjid is the House of Allah, a
      place of worship, peace, and reflection.
      <br />
      <br />
      Beyond ISOC, the masjid also hosts its own activities and events, with
      both brothers and sisters leading initiatives such as Tajweed classes,
      Tafseer sessions, and short masjid reminders. It is also a space for
      students to unwind and build friendships through fun and engaging
      activities&mdash;whether it&apos;s gaming nights for the brothers, chai
      nights for the sisters, or just a place to relax.
      <br />
      <br />
      The masjid is more than a building&mdash;it is a refuge, a source of
      strength, and a home away from home. Whether you seek knowledge,
      companionship, or a moment of stillness in the presence of Allah, the
      masjid welcomes you with open doors.
    </>
  ),
};

// Reusable section component for individual sections within merged container
interface SectionProps {
  title: string;
  content: React.ReactNode;
  image: string;
  imageAlt: string;
  textColor: string;
  contentTextColor: string;
  imagePosition?: "left" | "right";
}

function Section({
  title,
  content,
  image,
  imageAlt,
  textColor,
  contentTextColor,
  imagePosition = "left",
}: SectionProps) {
  return (
    <>
      {/* Mobile Layout - Always stacked */}
      <div className="flex flex-col gap-5 xl:hidden">
        <h1
          className={`font-black text-4xl ${textColor} ${imagePosition === "right" ? "text-right" : ""}`}
        >
          {title}
        </h1>
        <div className="flex flex-1 items-center">
          <Image
            src={image}
            width={900}
            height={400}
            alt={imageAlt}
            className="rounded-xl h-full object-cover"
          />
        </div>
        <p className={`text-justify text-sm md:text-base ${contentTextColor}`}>
          {content}
        </p>
      </div>

      {/* Desktop Layout - Side by side */}
      <div
        className={`hidden xl:flex gap-8 ${imagePosition === "right" ? "flex-row-reverse" : "flex-row"}`}
      >
        <div className="flex-1">
          <Image
            src={image}
            width={900}
            height={400}
            alt={imageAlt}
            className="h-full object-cover rounded-2xl"
          />
        </div>
        <div className="flex flex-1 flex-col justify-evenly gap-2">
          <h1 className={`font-black text-4xl ${textColor}`}>{title}</h1>
          <p
            className={`text-justify text-sm md:text-base ${contentTextColor}`}
          >
            {content}
          </p>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <main>
      <h1
        className={`${lusitana.className} hidden mb:block mb-4 text-xl md:text-2xl`}
      >
        Home
      </h1>
      <div className="flex flex-col gap-5">
        {/* Hero Section */}
        <div
          className="relative bg-gray-200 rounded-2xl h-[60vh] lg:h-[75vh] p-5 bg-cover bg-center"
          style={{ backgroundImage: `url(${HOME_URLS.hero})` }}
        >
          <div className="absolute inset-0 bg-black opacity-60 rounded-2xl"></div>
          <div className="text-white relative flex flex-col justify-center items-center h-full gap-6 lg:gap-9">
            <div>
              <Image
                src={Salam}
                width={700}
                height={100}
                alt="Salam"
                className=""
              />
            </div>
            <div className="text-center font-medium text-xl lg:text-3xl">
              <p>
                Welcome to The University of Nottingham Malaysia
                <span> Islamic Society</span>
              </p>
            </div>
          </div>
        </div>

        {/* Merged About Us Section */}
        <div className="bg-blue-600  rounded-2xl p-5">
          <ResponsiveContainer
            maxWidth={{
              default: "xl",
              md: "2xl",
              lg: "2xl",
              xl: "6xl",
            }}
          >
            <div className="flex flex-col gap-8 xl:gap-12">
              {/* Who Are We */}
              <Section
                title="Who We Are"
                content={info.about}
                image={HOME_URLS.crowd}
                imageAlt="Image of audience at a live talk"
                textColor="text-white"
                contentTextColor="text-white"
                imagePosition="right"
              />

              {/* Our Headquarters */}
              <Section
                title="Our Headquarters"
                content={info.masjid}
                image={HOME_URLS.masjid}
                imageAlt="Image of Islamic Center at UNM"
                textColor="text-white"
                contentTextColor="text-white"
                imagePosition="left"
              />
            </div>
          </ResponsiveContainer>
        </div>

        {/* What We Do Section */}
        <div className="bg-gray-200  rounded-2xl p-5">
          <ResponsiveContainer
            maxWidth={{
              default: "xl",
              md: "2xl",
              lg: "2xl",
              xl: "6xl",
            }}
          >
            <div className="flex flex-col gap-5">
              <h1 className="font-black text-4xl text-blue-600">What We Do</h1>
              <EventsCarousel />
            </div>
          </ResponsiveContainer>
        </div>

        {/* Footer Section */}
        <div className="bg-blue-600 rounded-xl p-5">
          <ResponsiveContainer
            maxWidth={{
              default: "xl",
              md: "2xl",
              lg: "2xl",
              xl: "6xl",
            }}
          >
            <Footer />
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

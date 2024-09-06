import Link from "next/link";
import { lusitana } from "@/components/ui/fonts";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import talkImage from "@/public/talk.jpg";
import Salam from "@/public/salam.png";

export default function Home() {
  return (
    <main>
      <h1
        className={`${lusitana.className} hidden mb:block mb-4 text-xl md:text-2xl`}
      >
        Home
      </h1>
      <div className="relative bg-gray-200 rounded-xl h-[80vh] lg:h-screen p-5 mb-5 lg:mb-4 bg-[url('/crowd.jpg')] bg-cover bg-center">
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
        {/* <div className="flex flex-col gap-6 md:items-center md:w-1/2 md:mx-auto">
          <h1 className="text-xl font-extrabold md:text-2xl">
            UNM Islamic Society:
            <br />
            <span className="text-4xl font-normal md:text-6xl">
              Inspiring Minds, Nurturing Faith
            </span>
          </h1>
          <p className="text-justify text-slate-700 text-sm md:text-base">
            Welcome to the UNM Islamic Society, where we foster a supportive
            community rooted in Islamic values. Through enriching events,
            educational workshops, and meaningful discussions, we aim to unite
            students in faith, promote cultural understanding, and empower
            individuals to thrive academically and spiritually. Join us in
            exploring the beauty of Islam and building lasting connections.
          </p>
          <div className="flex justify-normal gap-2">
            <Link
              href="/events/future"
              className={buttonVariants({ variant: "default" })}
            >
              Future Events
            </Link>

            <Link
              href="/about"
              className={buttonVariants({ variant: "defaultBlue" })}
            >
              About Us
            </Link>
          </div>
        </div> */}
      </div>
      <div className="bg-gray-200 rounded-xl p-5 mb-4">
        <div className="flex flex-col-reverse xl:flex-row gap-8">
          <div className="flex-1">
            <div className="flex flex-col">
              <h1 className="text-xl font-bold md:text-2xl">What We Do</h1>
              <p className="text-justify text-slate-700 text-sm md:text-base mt-5">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
                adipisci minima cupiditate eligendi quisquam, alias esse maxime
                consequuntur, natus officia tempore sequi nesciunt quis
                voluptatem ab hic facilis aspernatur qui accusantium quod
                provident aut nisi quia? Eos, vel debitis. Natus commodi
                laboriosam quae ratione inventore facilis hic? Excepturi cumque
                placeat nihil totam perferendis dolores maiores vero mollitia
                odio deserunt, ex iusto dignissimos, consequatur ab a, soluta
                sequi asperiores? Ullam, quaerat minima ut fugiat beatae dolorum
                itaque debitis officiis laborum. Ut magni in incidunt facilis
                ducimus corrupti minus debitis, distinctio alias neque
                repellendus repudiandae quam hic inventore molestias maiores
                atque illo?
              </p>
            </div>
          </div>
          <div className="flex flex-1 items-center">
            <Image
              src={talkImage}
              width={900}
              height={400}
              alt="Image of audience at a live talk"
              className="rounded-xl"
            ></Image>
          </div>
        </div>
      </div>
    </main>
  );
}

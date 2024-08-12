import Image from "next/image";
import crowdImage from "@/public/crowd.jpg";
import { Card, CardTitle, CardDescription } from "./ui/card";
import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<typeof Card>;

export function FutureEventsCard({ className, ...props }: CardProps) {
  return (
    <Card
      className={cn("w-[390px] h-[490px] overflow-hidden", className)}
      {...props}
    >
      <div className="flex flex-col h-[490px] w-[390px] overflow-hidden">
        <div className="flex-none h-[380px] w-full overflow-hidden">
          <Image
            src={crowdImage}
            height={690}
            width={390}
            alt="Image of audience at a live talk"
            className="object-cover h-full w-full transition-transform duration-150 ease-in-out transform hover:scale-105"
          ></Image>
        </div>
        <div className="flex-auto flex flex-col justify-around py-2 px-5">
          <div>
            {/* <p className="font-semibold text-2xl leading-none truncate"> */}
            <CardTitle> Fasting in Ramadan</CardTitle>

            {/* </p> */}
            <CardDescription className="leading-6">
              Sheikh Ibrahim Nuhu
            </CardDescription>
            {/* <p className="text-sm text-muted-foreground">Sheikh Ibrahim Nuhu</p> */}
          </div>
          <div className="flex justify-between text-sm font-semibold text-blue-600">
            <p>F3A12</p>
            <p>20:30</p>
            <p>4 Sep 24</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

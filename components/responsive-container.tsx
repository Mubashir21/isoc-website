import { cn } from "@/lib/utils";

type MaxWidthSize =
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  maxWidth?:
    | MaxWidthSize
    | {
        default?: MaxWidthSize;
        sm?: MaxWidthSize;
        md?: MaxWidthSize;
        lg?: MaxWidthSize;
        xl?: MaxWidthSize;
        "2xl"?: MaxWidthSize;
      };
  className?: string;
}

export function ResponsiveContainer({
  children,
  maxWidth = "5xl",
  className,
}: ResponsiveContainerProps) {
  // If maxWidth is a string, use the simple approach
  if (typeof maxWidth === "string") {
    const maxWidthClasses = {
      sm: "max-w-sm", // 384px
      md: "max-w-md", // 448px
      lg: "max-w-lg", // 512px
      xl: "max-w-xl", // 576px
      "2xl": "max-w-2xl", // 672px
      "3xl": "max-w-3xl", // 768px
      "4xl": "max-w-4xl", // 896px
      "5xl": "max-w-5xl", // 1024px
      "6xl": "max-w-6xl", // 1152px
      "7xl": "max-w-7xl", // 1280px
    };

    return (
      <div
        className={cn("mx-auto w-full", maxWidthClasses[maxWidth], className)}
      >
        {children}
      </div>
    );
  }

  // If maxWidth is an object, build responsive classes
  const responsiveClasses: string[] = [];

  // Default (mobile-first)
  if (maxWidth.default) {
    const defaultClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      "4xl": "max-w-4xl",
      "5xl": "max-w-5xl",
      "6xl": "max-w-6xl",
      "7xl": "max-w-7xl",
    };
    responsiveClasses.push(defaultClasses[maxWidth.default]);
  }

  // Add responsive variants with correct Tailwind classes
  if (maxWidth.sm) {
    const smClasses = {
      sm: "sm:max-w-sm",
      md: "sm:max-w-md",
      lg: "sm:max-w-lg",
      xl: "sm:max-w-xl",
      "2xl": "sm:max-w-2xl",
      "3xl": "sm:max-w-3xl",
      "4xl": "sm:max-w-4xl",
      "5xl": "sm:max-w-5xl",
      "6xl": "sm:max-w-6xl",
      "7xl": "sm:max-w-7xl",
    };
    responsiveClasses.push(smClasses[maxWidth.sm]);
  }

  if (maxWidth.md) {
    const mdClasses = {
      sm: "md:max-w-sm",
      md: "md:max-w-md",
      lg: "md:max-w-lg",
      xl: "md:max-w-xl",
      "2xl": "md:max-w-2xl",
      "3xl": "md:max-w-3xl",
      "4xl": "md:max-w-4xl",
      "5xl": "md:max-w-5xl",
      "6xl": "md:max-w-6xl",
      "7xl": "md:max-w-7xl",
    };
    responsiveClasses.push(mdClasses[maxWidth.md]);
  }

  if (maxWidth.lg) {
    const lgClasses = {
      sm: "lg:max-w-sm",
      md: "lg:max-w-md",
      lg: "lg:max-w-lg",
      xl: "lg:max-w-xl",
      "2xl": "lg:max-w-2xl",
      "3xl": "lg:max-w-3xl",
      "4xl": "lg:max-w-4xl",
      "5xl": "lg:max-w-5xl",
      "6xl": "lg:max-w-6xl",
      "7xl": "lg:max-w-7xl",
    };
    responsiveClasses.push(lgClasses[maxWidth.lg]);
  }

  if (maxWidth.xl) {
    const xlClasses = {
      sm: "xl:max-w-sm",
      md: "xl:max-w-md",
      lg: "xl:max-w-lg",
      xl: "xl:max-w-xl",
      "2xl": "xl:max-w-2xl",
      "3xl": "xl:max-w-3xl",
      "4xl": "xl:max-w-4xl",
      "5xl": "xl:max-w-5xl",
      "6xl": "xl:max-w-6xl",
      "7xl": "xl:max-w-7xl",
    };
    responsiveClasses.push(xlClasses[maxWidth.xl]);
  }

  if (maxWidth["2xl"]) {
    const xl2Classes = {
      sm: "2xl:max-w-sm",
      md: "2xl:max-w-md",
      lg: "2xl:max-w-lg",
      xl: "2xl:max-w-xl",
      "2xl": "2xl:max-w-2xl",
      "3xl": "2xl:max-w-3xl",
      "4xl": "2xl:max-w-4xl",
      "5xl": "2xl:max-w-5xl",
      "6xl": "2xl:max-w-6xl",
      "7xl": "2xl:max-w-7xl",
    };
    responsiveClasses.push(xl2Classes[maxWidth["2xl"]]);
  }

  return (
    <div
      className={cn("mx-auto w-full", responsiveClasses.join(" "), className)}
    >
      {children}
    </div>
  );
}

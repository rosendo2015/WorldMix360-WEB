import LogoIcon from "../assets/images/WorldMix360-logo.png";

interface LogoProps {
  location?: "header" | "footer";
}

export function Logo({ location = "header" }: LogoProps) {
  const worldColor = location === "footer" ? "text-white" : "text-navy";
  const mix360 = location === "footer" ? "md:flex-wrap" : "md:flex-row";

  return (
    <div className="flex items-center gap-2 md:min-h-[60px]">
      <img
        src={LogoIcon}
        alt="Logo WorldMix360"
        className="h-14 w-14 md:h-16 md:w-16"
      />
      <div className="flex flex-col justify-center">
        <div className={`flex flex-col ${mix360}`}>
          <span className={`${worldColor} text-2xl font-bold md:text-3xl`}>
            WORLD
          </span>
          <div className="flex gap-1">
            <span className="text-blue text-2xl font-bold md:text-3xl">
              MIX
            </span>
            <span className="text-green text-2xl font-bold md:text-3xl">
              360
            </span>
          </div>
        </div>

        <p className="text-green-dark text-xs leading-4 md:text-sm md:leading-5">
          Um mundo de escolhas.
        </p>
      </div>
    </div>
  );
}

import LogoIcon from "../assets/images/WorldMix360-logo.png";

interface LogoProps {
  location?: "header" | "footer";
}

export function Logo({ location = "header" }: LogoProps) {
  const worldColor = location === "footer" ? "text-white" : "text-navy";

  return (
    <div className="flex flex-row items-center gap-3">
      <img src={LogoIcon} alt="Logo WorldMix360" className="w-16 h-16" />
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row  md:items-baseline md:gap-0.5">
          <span className={`${worldColor} text-3xl font-bold leading-tight`}>
            WORLD
          </span>
          <div className="flex space-x-2 md:ml-1">
            <span className="text-blue text-3xl font-bold leading-3">MIX</span>
            <span className="text-green text-3xl font-bold leading-3">360</span>
          </div>
        </div>

        <p className="text-green-dark text-sm leading-5 mt-2 md:mt-0">
          Um mundo de escolhas.
        </p>
      </div>
    </div>
  );
}

import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-[#E1000F] shadow-sm">
      <div className="mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center space-x-4">
          <Image
            src="/2560px-Henkel-Logo.svg.png"
            alt="Henkel Logo"
            width={32}
            height={32}
            className="h-8 w-auto"
          />
          <h1 className="font-bold tracking-wide text-lg">
            <span className="text-henkel-red">HENKEL</span>{" "}
            <span className="text-black font-semibold">CHALLENGE</span>
          </h1>
        </div>

          
      </div>
    </header>
  );
}

export default Header;
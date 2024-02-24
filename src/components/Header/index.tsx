"use client";
import { IoMoon, IoSunny } from "react-icons/io5";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div className="pb-3 mb-2 p-2 flex flex-row items-center justify-between bg-background  top-0 w-full">
      <div className="w-[20%]">
        <Button
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
          variant={"ghost"}
        >
          <IoMoon className="text-xl dark:hidden text-[#38a482]" />
          <IoSunny className="text-xl hidden dark:block text-[#38a482]" />
        </Button>
      </div>
      {/* <div
        className={`w-[80%] lg:w-[30%] ${
          pathname === "/list-surah" ? "block" : "hidden"
        }`}
      >
        <Input
          type="text"
          placeholder="Search"
          className="h-8 border border-slate-400"
        />
      </div> */}
    </div>
  );
}

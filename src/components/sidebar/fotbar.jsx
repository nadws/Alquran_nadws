"use client";
import Link from "next/link";
import { GoBook, GoHeart } from "react-icons/go";
import { Button } from "../ui/button";
import ButtonSidebar from "./buttonSidebar";
import { usePathname } from "next/navigation";

export default function Fotbar() {
  const pathname = usePathname();
  return (
    <div className="bg-background border border-border h-14 bottom-0  w-full fixed z-10 flex justify-center lg:hidden">
      <Link href="/list-surah">
        <Button
          variant={"ghost"}
          className=" justify-center h-full  hover:text-primary"
        >
          <GoBook
            className={
              pathname === "/list-surah"
                ? "text-2xl text-center  text-[#38a482]"
                : "text-2xl text-center  "
            }
          />
        </Button>
      </Link>
      <Link href="/favorite">
        <Button
          variant={"ghost"}
          className=" justify-center h-full  hover:text-primary"
        >
          <GoHeart
            className={
              pathname === "/favorite"
                ? "text-2xl text-center  text-[#38a482]"
                : "text-2xl text-center  "
            }
          />
        </Button>
      </Link>
    </div>
  );
}

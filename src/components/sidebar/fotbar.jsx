"use client";
import Link from "next/link";
import { GoBook, GoBookmark, GoHeart } from "react-icons/go";
import { Button } from "../ui/button";
import ButtonSidebar from "./buttonSidebar";
import { usePathname } from "next/navigation";

export default function Fotbar() {
  const pathname = usePathname();
  return (
    <div className="bg-background border border-border  bottom-0  w-full   flex justify-between lg:hidden h-14 fixed px-20">
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
      <Link href="/bookmark">
        <Button
          variant={"ghost"}
          className=" justify-center h-full  hover:text-primary"
        >
          <GoBookmark
            className={
              pathname === "/bookmark"
                ? "text-2xl text-center  text-[#38a482]"
                : "text-2xl text-center  "
            }
          />
        </Button>
      </Link>
    </div>
  );
}

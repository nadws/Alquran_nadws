"use client";
import Link from "next/link";
import { GoBook, GoHeart } from "react-icons/go";
import { Button } from "../ui/button";
import ButtonSidebar from "./buttonSidebar";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="pb-12 min-h-screen ">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-32 px-4 text-lg font-semibold">Logo</h2>
          <div>
            <ButtonSidebar text="Surah">
              <Link href="/list-surah">
                <Button
                  variant={"ghost"}
                  className="w-full justify-center rounded-none  hover:text-primary mb-10"
                >
                  <GoBook
                    className={
                      pathname === "/list-surah"
                        ? "text-5xl text-center  text-[#38a482]"
                        : "text-5xl text-center  text-black"
                    }
                  />
                </Button>
              </Link>
            </ButtonSidebar>

            <ButtonSidebar text="Favorite">
              <Link href="/favorite">
                <Button
                  variant={"ghost"}
                  className="w-full justify-center rounded-none  hover:text-primary mb-10"
                >
                  <GoHeart
                    className={
                      pathname === "/favorite"
                        ? "text-5xl text-center  text-[#38a482]"
                        : "text-5xl text-center  text-black"
                    }
                  />
                </Button>
              </Link>
            </ButtonSidebar>
          </div>
        </div>
      </div>
    </div>
  );
}

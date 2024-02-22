import Link from "next/link";
import { GoBook, GoHeart } from "react-icons/go";
import { Button } from "../ui/button";
import ButtonSidebar from "./buttonSidebar";

export default function Sidebar() {
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
                  <GoBook className="text-5xl text-center text-[#38a482]" />
                </Button>
              </Link>
            </ButtonSidebar>
            <ButtonSidebar text="Favorite">
              <Link href="/favorite">
                <Button
                  variant={"ghost"}
                  className="w-full justify-center rounded-none  hover:text-primary mb-10"
                >
                  <GoHeart className="text-5xl text-center text-[#38a482]" />
                </Button>
              </Link>
            </ButtonSidebar>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { GoHeart } from "react-icons/go";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className=" grid grid-cols-1 p-3 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
      {[...Array(16)].map((_, index) => (
        <Card key={index} className="cursor-pointer rounded-lg  mb-1 lg:mb-0">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-12 w-12 rounded-full"></Skeleton>
              <div>
                <Skeleton className="h-10 w-12 rounded-full" />
              </div>
            </div>
            <div className="mt-4">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px] mt-4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

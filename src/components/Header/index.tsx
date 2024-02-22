import { Input } from "../ui/input";

export default function Header() {
  return (
    <div className="pb-3 mb-8 border-b border-border flex flex-row items-center justify-between">
      <div>
        <div className="font-semibold text-[#38a482]">My Alqur&apos;an</div>
      </div>
      <div>
        <Input type="text" placeholder="Search" />
      </div>
    </div>
  );
}

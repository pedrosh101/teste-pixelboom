import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Profile from "@/../public/assets/profile-image.png";
import Bell from "@/../public/icons/Bell.svg";
import CircleHelp from "@/../public/icons/CircleHelp.svg";
import PanelLeftClose from "@/../public/icons/PanelLeftClose.svg";

export default function Header() {
  return (
    <div className="h-18 w-full border-b flex justify-between items-center px-6 bg-white">
      <Button variant="ghost" className="p-0 rounded-full bg-none">
        <Image src={PanelLeftClose} alt="PanelLeftClose" width={20} height={20} />
      </Button>
      <div className="flex items-center gap-3">
        <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
          <Image src={CircleHelp} alt="CircleHelp" width={20} height={20} />
        </Button>

        <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
          <Image src={Bell} alt="Bell" width={20} height={20} />
        </Button>

        <Avatar>
          <AvatarImage src={Profile.src} />
          <AvatarFallback>PI</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

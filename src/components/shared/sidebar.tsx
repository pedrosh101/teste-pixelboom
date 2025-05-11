import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import CollapseIcon from "@/../public/icons/CollapseIcon.svg";
import Dashboard from "@/../public/icons/Dashboard Icon.svg";
import Users from "@/../public/icons/Users Icon.svg";
import Documents from "@/../public/icons/Documents Icon.svg";
import Settings from "@/../public/icons/Settings Icon.svg";
import Help from "@/../public/icons/Help Icon.svg";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function Sidebar() {
  return (
    <aside
      className={`w-72 border-r flex flex-col bg-clr1  ${inter.className}`}
    >
      <div className="p-4 border-b">
        <div className="bg-black text-white p-2 w-2/3 rounded-lg text-center">
          Logo
        </div>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
            <span className="text-gray-800 font-bold text-sm">FA</span>
          </div>
          <div>Filial A</div>
        </div>
        <Image
          src={CollapseIcon}
          alt="Collapse"
          width={16}
          height={16}
          className="mr-1"
        />
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-4">Menu</div>
        <nav className="space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 p-3 rounded-3xl text-sm text-gray-700 hover:bg-gray-100"
          >
            <Image
              src={Dashboard}
              alt="Dashboard"
              width={20}
              height={20}
              className="mr-1"
            />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 p-3 text-sm rounded-3xl bg-clr2 hover:bg-clr2/90 text-white"
          >
            <Image
              src={Users}
              alt="Users"
              width={20}
              height={20}
              className="mr-1"
            />
            <span>Usuários</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 p-3 rounded-3xl text-sm text-gray-700 hover:bg-gray-100"
          >
            <Image
              src={Documents}
              alt="Documents"
              width={20}
              height={20}
              className="mr-1"
            />
            <span>Documentos</span>
          </Link>
        </nav>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-4">Configurações</div>
        <nav className="space-y-1">
          <Link
            href="/"
            className="flex items-center gap-2 p-3 rounded-3xl text-sm text-gray-700 hover:bg-gray-100"
          >
            <Image
              src={Settings}
              alt="Settings"
              width={20}
              height={20}
              className="mr-1"
            />
            <span>Geral</span>
          </Link>
        </nav>
      </div>

      <div className="mt-auto p-4 flex items-center gap-2 text-gray-600 bg-white justify-between mx-4 rounded-2xl">
        <span>Precisa de ajuda?</span>
        <Image src={Help} alt="Help" width={20} height={20} className="mr-1" />
      </div>
    </aside>
  );
}
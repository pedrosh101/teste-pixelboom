import { ReactNode } from "react";
import { BarChart2, File, HelpCircle, Settings } from "lucide-react";
import Link from "next/link";

function SidebarLink({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
        active ? "bg-clr2 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-72 border-r flex flex-col bg-clr1 h-screen">
      <div className="p-4 border-b">
        <div className="bg-black text-white p-2 w-2/3 rounded-lg text-center">
          Logo
        </div>
      </div>

      <div className="p-4 border-b flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">FA</div>
          <div>Filial A</div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="p-4">
        <div className="text-sm text-gray-500 mb-2">Menu</div>
        <nav className="space-y-1">
          <SidebarLink
            href="/"
            icon={<BarChart2 size={18} />}
            label="Dashboard"
          />
          <SidebarLink
            href="/"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            }
            label="Usuários"
          />
          <SidebarLink href="/" icon={<File size={18} />} label="Documentos" />
        </nav>
      </div>

      <div className="p-4 mt-4">
        <div className="text-sm text-gray-500 mb-2">Configurações</div>
        <nav className="space-y-1">
          <SidebarLink href="/" icon={<Settings size={18} />} label="Geral" />
        </nav>
      </div>

      <div className="mt-auto p-4 flex items-center gap-2 text-gray-600 bg-white justify-between mx-4 rounded-2xl">
        <span>Precisa de ajuda?</span>
        <HelpCircle size={18} />
      </div>
    </aside>
  );
}

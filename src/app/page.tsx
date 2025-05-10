"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Noto_Serif } from "next/font/google";
import {
  Search,
  Plus,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ListFilter from "@/../public/icons/ListFilter.svg";
import Modal from "@/components/shared/modal";
import { ToasterSuccess } from "@/components/shared/toaster-success";
import { useUserStore } from "@/store/userStore";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export default function UsersPage() {
  const users = useUserStore((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeUsers = users.filter((user) => user.status === "Ativo").length;
  const inactiveUsers = users.filter(
    (user) => user.status === "Inativo"
  ).length;

  return (
    <div className="bg-white p-4 md:p-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-4">
        <h1
          className={`text-2xl md:text-3xl font-semibold font-serif ${notoSerif.className}`}
        >
          Usuários
        </h1>
        <Button
          variant="default"
          className="bg-clr2 hover:bg-clr2/90 p-4 text-white rounded-3xl w-full sm:w-auto"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} /> Adicionar
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
        <Card className="bg-clr3 rounded-sm border-0 shadow-none">
          <CardContent>
            <div className="text-xs md:text-sm text-gray-500 mb-1">
              Usuários
            </div>
            <div
              className={`text-xl md:text-3xl font-semibold font-serif ${notoSerif.className}`}
            >
              {users.length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-clr3 rounded-sm border-0 shadow-none">
          <CardContent>
            <div className="text-xs md:text-sm text-gray-500 mb-1">
              Tempo de sessão
            </div>
            <div
              className={`text-xl md:text-3xl font-semibold font-serif ${notoSerif.className}`}
            >
              31m 20s
            </div>
          </CardContent>
        </Card>
        <Card className="bg-clr3 rounded-sm border-0 shadow-none">
          <CardContent>
            <div className="text-xs md:text-sm text-gray-500 mb-1">Ativos</div>
            <div
              className={`text-xl md:text-3xl font-semibold font-serif ${notoSerif.className}`}
            >
              {activeUsers}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-clr3 rounded-sm border-0 shadow-none">
          <CardContent>
            <div className="text-xs md:text-sm text-gray-500 mb-1">
              Inativos
            </div>
            <div
              className={`text-xl md:text-3xl font-semibold font-serif ${notoSerif.className}`}
            >
              {inactiveUsers}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="relative mb-6 flex gap-4">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search size={18} className="text-gray-400" />
        </div>
        <Input
          placeholder="Buscar..."
          className="pl-10 bg-white border-gray-200"
        />
        <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
          <Image src={ListFilter} alt="ListFilter" width={20} height={20} />
        </Button>
      </div>

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id} className="p-0">
            <div className="flex flex-col sm:flex-row sm:items-center p-3 md:p-4">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <span className="text-gray-500 font-medium">{user.id}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="font-medium">{user.name}</h3>
                    <div className="text-gray-500 text-xs sm:text-sm flex flex-wrap items-center">
                      <span className="inline-block mr-1">
                        {user.age} anos,
                      </span>
                      <span>{user.gender}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-4 mt-1 text-xs md:text-sm text-gray-500">
                    <div className="flex items-center">
                      <span className="mr-1">
                        {user.lastSession?.date} - {user.lastSession?.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span>{user.lastSession?.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <span>{user.type}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end sm:ml-auto gap-2 md:gap-4 mt-2 sm:mt-0">
                <Badge
                  variant={user.status === "Ativo" ? "default" : "outline"}
                  className={
                    user.status === "Ativo"
                      ? "bg-clr3 text-black px-2 rounded-xl"
                      : "px-2 rounded-xl"
                  }
                >
                  {user.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <MoreVertical size={18} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4 border-t border-gray-200 mt-6 pt-6">
        <div className="text-sm text-gray-500 text-center">
          {users.length} de {users.length} itens
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <ChevronLeft size={16} className="mr-1" /> Anterior
          </Button>
          <Button variant="secondary" size="sm" className="bg-gray-50">
            1
          </Button>
          <Button variant="ghost" size="sm">
            2
          </Button>
          <span className="text-gray-500">...</span>
          <Button variant="ghost" size="sm">
            58
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500">
            Próxima <ChevronRight size={16} className="ml-1" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Itens por página</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-16 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <ToasterSuccess />
    </div>
  );
}

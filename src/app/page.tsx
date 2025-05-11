"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Noto_Serif } from "next/font/google";
import { Inter } from "next/font/google";
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
import User from "@/../public/icons/User Icon.svg";
import Time from "@/../public/icons/Time Icon.svg";
import Date from "@/../public/icons/Date Icon.svg";
import Tag from "@/../public/icons/Tag Icon.svg";
import Search from "@/../public/icons/Search.svg";
import ChevronLeft from "@/../public/icons/ChevronLeft.svg";
import ChevronRight from "@/../public/icons/ChevronRight.svg";
import EllipsisVertical from "@/../public/icons/EllipsisVertical.svg";
import Plus from "@/../public/icons/Plus.svg";
import Modal from "@/components/shared/modal";
import { ToasterSuccess } from "@/components/shared/toaster-success";
import { useUserStore } from "@/store/userStore";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
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
    <div className={`h-full bg-white p-4 md:px-12 md:pb-0 ${inter.className}`}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6  gap-4">
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
          <Image src={Plus} alt="Plus" width={14} height={14} className="mr-1" /> Adicionar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-6 mb-4">
        <Card className="bg-clr3 rounded-sm border-0 shadow-none p-4 px-0">
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
        <Card className="bg-clr3 rounded-sm border-0 shadow-none p-4 px-0">
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
        <Card className="bg-clr3 rounded-sm border-0 shadow-none p-4 px-0">
          <CardContent>
            <div className="text-xs md:text-sm text-gray-500 mb-1">Ativos</div>
            <div
              className={`text-xl md:text-3xl font-semibold font-serif ${notoSerif.className}`}
            >
              {activeUsers}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-clr3 rounded-sm border-0 shadow-none p-4 px-0">
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

      <div className="relative mb-2 flex gap-4 py-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Image src={Search} alt="Search" width={14} height={14} className="mr-1" />
        </div>
        <Input
          placeholder="Buscar..."
          className="pl-10 bg-white border-gray-200 rounded-sm"
        />
        <Button variant="outline" className="w-10 h-10 p-0 rounded-full">
          <Image src={ListFilter} alt="ListFilter" width={20} height={20} />
        </Button>
      </div>

      <div className="space-y-3">
        {users.map((user) => (
          <Card key={user.id} className="p-0 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center p-3 md:p-4">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                  <span className="text-gray-800 font-medium">{user.id}</span>
                </div>
                <div className="flex-grow">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="font-medium">{user.name}</h3>
                    <div className="text-gray-500 text-xs sm:text-sm flex flex-wrap items-center">
                      <Image src={User} alt="User" width={14} height={14} className="ml-2 mr-1" />
                      <span className="inline-block mr-1">
                        {user.age} anos,
                      </span>
                      <span>{user.gender}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 md:gap-4 mt-1 text-xs md:text-sm text-gray-500">
                    <div className="flex items-center">
                      <Image src={Date} alt="Date" width={14} height={14} className="mr-1" />
                      <span className="mr-1">
                        {user.lastSession?.date} - {user.lastSession?.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Image src={Time} alt="Time" width={14} height={14} className="mr-1" />
                      <span>{user.lastSession?.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Image src={Tag} alt="Tag" width={14} height={14} className="mr-1" />
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
                      ? "bg-gray-100 text-black px-2 rounded-xl"
                      : "px-2 rounded-xl"
                  }
                >
                  {user.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <Image src={EllipsisVertical} alt="EllipsisVertical" width={16} height={16} className="mr-1" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 border-gray-200 pt-6 py-2">
        <div className="text-sm text-gray-500 text-center flex items-center">
          {users.length} de {users.length} itens
        </div>

        <div className="flex flex-wrap justify-center items-center gap-2">
          <Button variant="ghost" size="sm" className="text-gray-500">
            <Image src={ChevronLeft} alt="CL" width={14} height={14} className="mr-1" /> Anterior
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
            Próxima <Image src={ChevronRight} alt="CR" width={14} height={14} className="mr-1" />
          </Button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <span>Itens por página</span>
          <Select defaultValue="10">
            <SelectTrigger className="w-18 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Modal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <ToasterSuccess />
    </div>
  );
}

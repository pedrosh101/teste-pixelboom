"use client";

import React, { useState } from "react";
import { Noto_Serif } from "next/font/google";
import { Inter } from "next/font/google";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useUserStore } from "@/store/userStore";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

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

export default function Modal({ open, onOpenChange }: ModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    email2: "",
    phone: "",
    cpf: "",
    rg: "",
    age: 0,
    gender: "",
    type: "Usuário padrão",
    whatsapp: true,
    status: "Ativo" as "Ativo" | "Inativo",
  });

  const [isActive, setIsActive] = useState(true);
  const addUser = useUserStore((state) => state.addUser);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { id, value, type, checked } = target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdd = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.cpf) {
      toast("Erro", {
        description: "Todos os campos são obrigatórios.",
      });
      return;
    }

    addUser(formData);

    toast.custom(() => (
      <div className="bg-white px-2 py-6 w-96 rounded-md border shadow-lg flex justify-center gap-2 items-center text-base">
        <span>Usuário adicionado com sucesso!</span>
        <button
          className=" bg-white ml-2 border text-black font-semibold px-3 py-1 rounded-3xl"
          onClick={() => {}}
        >
          Fechar
        </button>
      </div>
    ));

    onOpenChange(false);

    setFormData({
      name: "",
      email: "",
      email2: "",
      phone: "",
      cpf: "",
      rg: "",
      age: 0,
      gender: "",
      type: "Usuário padrão",
      whatsapp: true,
      status: "Ativo",
    });
    setIsActive(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`fixed inset-y-0 right-0 left-auto m-0 p-0 h-full w-full max-w-md rounded-none border-0 shadow-none translate-x-0 translate-y-0 flex flex-col gap-0 overflow-hidden data-[state=open]:animate-slide-in-from-right data-[state=closed]:animate-slide-out-to-right ${inter.className}`}
      >
        <DialogHeader className="flex flex-row justify-between items-center p-4 md:p-6 border-b">
          <DialogTitle
            className={`text-lg md:text-xl font-medium font-serif ${notoSerif.className}`}
          >
            Adicionar usuário
          </DialogTitle>
        </DialogHeader>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6 flex-1 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite o nome"
              className="rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite o e-mail"
              className="rounded-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Informe o telefone"
              className="rounded-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="whatsapp"
              checked={formData.whatsapp}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  whatsapp: checked as boolean,
                }))
              }
            />
            <Label htmlFor="whatsapp">WhatsApp</Label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="Informe o CPF"
                className="rounded-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rg">RG</Label>
              <Input
                id="rg"
                value={formData.rg}
                onChange={handleChange}
                placeholder="Informe o RG"
                className="rounded-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email2">E-mail</Label>
            <Input
              id="email2"
              value={formData.email2}
              onChange={handleChange}
              placeholder="Digite o e-mail"
              className="rounded-sm"
            />
          </div>

          <Card className="border-gray-200 bg-clr3 rounded-sm py-4">
            <CardContent className="p-3 py-0">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="font-medium">Status</div>
                  <div className="text-xs md:text-sm text-gray-500">
                    Defina se o usuário estará ativo ao ser adicionado.
                  </div>
                </div>
                <Switch checked={isActive} onCheckedChange={setIsActive} />
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className=" p-4 flex flex-col sm:flex-row justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-3xl w-full sm:w-auto"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleAdd}
            className="bg-green-950 hover:bg-clr2 text-white px-4 py-2 rounded-3xl w-full sm:w-auto"
          >
            Adicionar
          </Button>
        </DialogFooter>
        <Toaster />
      </DialogContent>
    </Dialog>
  );
}

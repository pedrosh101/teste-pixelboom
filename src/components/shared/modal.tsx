"use client";

import React, { useState } from "react";
import { Noto_Serif } from "next/font/google";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useUserStore } from "@/store/userStore";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const notoSerif = Noto_Serif({
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

    toast("Usuário adicionado com sucesso!", {
      action: {
        label: "Fechar",
        onClick: () => {},
      },
    });

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end z-50">
      <div className="bg-white h-full w-full max-w-md overflow-y-auto flex flex-col">
        <div className="flex justify-between items-center p-4 md:p-6 border-b">
          <h2 className={`text-lg md:text-xl font-medium font-serif ${notoSerif.className}`}>Adicionar usuário</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-4 md:space-y-6 flex-1 overflow-y-auto">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Digite o nome"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite o e-mail"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Informe o telefone"
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
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rg">RG</Label>
              <Input
                id="rg"
                value={formData.rg}
                onChange={handleChange}
                placeholder="Informe o RG"
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
            />
          </div>

          <Card className="border-gray-200">
            <CardContent className="p-3 md:p-6">
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

        <div className="border-t p-4 flex flex-col sm:flex-row justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded w-full sm:w-auto"
          >
            Cancelar
          </Button>

          <Button
            onClick={handleAdd}
            className="bg-green-950 hover:bg-clr2 text-white px-4 py-2 rounded w-full sm:w-auto"
          >
            Adicionar
          </Button>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
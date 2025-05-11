import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp: boolean;
  cpf: string;
  rg: string;
  age: number;
  gender: string;
  type: string;
  status: 'Ativo' | 'Inativo';
  lastSession?: {
    date: string;
    time: string;
    duration: string;
  };
};

type UserStore = {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  getUserById: (id: string) => User | undefined;
};

const generateInitials = (name: string): string => {
  const words = name.split(' ');
  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
};

const getCurrentDate = (): { date: string; time: string } => {
  const now = new Date();
  const date = now.toLocaleDateString('pt-BR');
  const time = now.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit'
  }).toLowerCase();
  
  return { date, time };
};

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [
        {
          id: "JG",
          name: "José Ricardo Gomes",
          email: "jose.gomes@exemplo.com",
          phone: "(11) 99999-8888",
          whatsapp: true,
          cpf: "123.456.789-00",
          rg: "12.345.678-9",
          age: 51,
          gender: "Homem",
          type: "Usuário padrão",
          status: "Ativo",
          lastSession: {
            date: "22/03/2025",
            time: "10:21am",
            duration: "38m22s"
          }
        },
        {
          id: "HS",
          name: "Helena Soares",
          email: "helena.soares@exemplo.com",
          phone: "(11) 98765-4321",
          whatsapp: true,
          cpf: "987.654.321-00",
          rg: "98.765.432-1",
          age: 46,
          gender: "Mulher",
          type: "Usuário padrão",
          status: "Inativo",
          lastSession: {
            date: "22/03/2025",
            time: "10:21am",
            duration: "38m22s"
          }
        },
        {
          id: "DS",
          name: "Débora Santana",
          email: "debora.santana@exemplo.com",
          phone: "(11) 97777-6666",
          whatsapp: false,
          cpf: "111.222.333-44",
          rg: "11.222.333-4",
          age: 24,
          gender: "Mulher",
          type: "Usuário padrão",
          status: "Inativo",
          lastSession: {
            date: "22/03/2025",
            time: "10:21am",
            duration: "38m22s"
          }
        },
        {
          id: "LS",
          name: "Lucas Rocha Silveira",
          email: "lucas.silveira@exemplo.com",
          phone: "(11) 96666-5555",
          whatsapp: true,
          cpf: "222.333.444-55",
          rg: "22.333.444-5",
          age: 31,
          gender: "Homem",
          type: "Usuário padrão",
          status: "Ativo",
          lastSession: {
            date: "22/03/2025",
            time: "10:21am",
            duration: "38m22s"
          }
        },
        {
          id: "SA",
          name: "Sérgio Arantes",
          email: "sergio.arantes@exemplo.com",
          phone: "(11) 95555-4444",
          whatsapp: true,
          cpf: "333.444.555-66",
          rg: "33.444.555-6",
          age: 36,
          gender: "Homem",
          type: "Usuário padrão",
          status: "Ativo",
          lastSession: {
            date: "22/03/2025",
            time: "10:21am",
            duration: "38m22s"
          }
        },
        {
          id: "AC",
          name: "Adriano Costa",
          email: "adriano.costa@exemplo.com",
          phone: "(11) 94444-3333",
          whatsapp: false,
          cpf: "444.555.666-77",
          rg: "44.555.666-7",
          age: 38,
          gender: "Homem",
          type: "Usuário padrão",
          status: "Ativo",
          lastSession: {
            date: "22/03/2025",
            time: "10:21am",
            duration: "38m22s"
          }
        }
      ],
      
      addUser: (userData) => {
        const { date, time } = getCurrentDate();
        const id = generateInitials(userData.name);
        
        const newUser: User = {
          ...userData,
          id,
          lastSession: {
            date,
            time,
            duration: "0m0s"
          }
        };
        
        set((state) => ({
          users: [newUser, ...state.users]
        }));
      },
      
      updateUser: (id, updatedData) => {
        set((state) => ({
          users: state.users.map((user) => 
            user.id === id ? { ...user, ...updatedData } : user
          )
        }));
      },
      
      deleteUser: (id) => {
        set((state) => ({
          users: state.users.filter((user) => user.id !== id)
        }));
      },
      
      getUserById: (id) => {
        return get().users.find((user) => user.id === id);
      }
    }),
    {
      name: 'user-storage'
    }
  )
);
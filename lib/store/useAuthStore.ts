import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, AuthState } from "@/types/auth";
import { toast } from "react-hot-toast";

const USERS = [
  {
    id: "1",
    name: "Demo User",
    email: "user@example.com",
    password: "password",
  },
];

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
  registeredUsers: Array<{
    id: string;
    name: string;
    email: string;
    password: string;
  }>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      registeredUsers: USERS,

      setUser: (user) => set({ user, isAuthenticated: !!user }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          console.log(`Login attempt: ${email}`);
          console.log("Current registered users:", get().registeredUsers);

          const allUsers = [...get().registeredUsers];
          const user = allUsers.find(
            (u) =>
              u.email.toLowerCase() === email.toLowerCase() &&
              u.password === password,
          );

          if (user) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...userWithoutPassword } = user;

            set({
              user: userWithoutPassword,
              isAuthenticated: true,
              isLoading: false,
            });

            toast.success(`Welcome back, ${user.name}!`);
            console.log("Auth state after login:", get().user);

            return true;
          }

          toast.error("Invalid credentials");
          set({ isLoading: false });
          return false;
        } catch (error) {
          console.error("Login error:", error);
          toast.error("Login failed");
          set({ isLoading: false });
          return false;
        }
      },

      register: async (name, email, password) => {
        set({ isLoading: true });
        try {
          await new Promise((resolve) => setTimeout(resolve, 800));

          const currentUsers = get().registeredUsers;

          const existingUser = currentUsers.find(
            (u) => u.email.toLowerCase() === email.toLowerCase(),
          );

          if (existingUser) {
            toast.error("Email already in use");
            set({ isLoading: false });
            return false;
          }

          const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
          };

          const updatedUsers = [...currentUsers, newUser];

          set({
            user: { id: newUser.id, name, email },
            isAuthenticated: true,
            isLoading: false,
            registeredUsers: updatedUsers,
          });

          console.log("Registered new user:", newUser);
          console.log("Updated users list:", updatedUsers);

          toast.success("Registered successfully");
          return true;
        } catch {
          toast.error("Registration failed");
          set({ isLoading: false });
          return false;
        }
      },

      logout: () => {
        set((state) => ({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          registeredUsers: state.registeredUsers,
        }));

        toast.success("Logged out successfully");
        console.log("Auth state after logout:", get());
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        registeredUsers: state.registeredUsers,
      }),
    },
  ),
);

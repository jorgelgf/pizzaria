import { createContext, ReactNode, useState } from "react";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
};
type UserProps = {
  id: string;
  name: string;
  email: string;
};
type SignInProps = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

async function signIn({ email, password }: SignInProps) {
  console.log("EMAIL DIGITADO: ", email);
  console.log("Senha: ", password);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

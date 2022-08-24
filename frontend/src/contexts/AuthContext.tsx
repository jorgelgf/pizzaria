import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "../services/apiClients";
import { FaUnderline } from "react-icons/fa";

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => Promise<void>;
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
type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextData);

type AuthProviderProps = {
  children: ReactNode;
};

export function signOut() {
  try {
    destroyCookie(undefined, "@nextauth.token");
    Router.push("/");
  } catch {
    console.log("Signout error");
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });
      const { id, name, token } = response.data;

      //Cookies info insert
      setCookie(undefined, "@nextauth.token", token),
        {
          maxAge: 60 * 60 * 24 * 30, //Expired time cookie - one month
          path: "/", //path cookie (all)
        };
      setUser({ id, name, email });

      //Info token to next request
      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      //User redirect for /dashboard
      Router.push("/dashboard");

      console.log(response.data);
    } catch (err) {
      console.log("Error accessing", err);
    }
  }
  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const response = await api.post("/users", {
        name,
        email,
        password,
      });
      console.log("Cadastrado com sucesso!");
      Router.push("/");
    } catch (err) {
      console.log("Erro ao cadastrar ", err);
    }
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, signIn, signOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

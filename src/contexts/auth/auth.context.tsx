// contexts/auth/auth.context.tsx
import { UsuarioPayload } from "@/components/forms/cadastro/types";
import { Tokens } from "@/components/forms/login/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  JSX,
} from "react";
import { parseCookies, setCookie, destroyCookie } from "nookies";
import ApiClient from "@/services/http-client";

type AuthContextData = {
  usuario: UsuarioPayload | null;
  definirUsuario: (novoUsuario: UsuarioPayload) => void;
  logout: () => Promise<void>;
  tokens: Tokens | null;
  definirToken: (novoToken: Tokens) => void;
  getUsuario(): Promise<UsuarioPayload | null>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [usuario, setUsuario] = useState<UsuarioPayload | null>(null);
  const [tokens, setTokens] = useState<Tokens | null>(null);

  const definirUsuario = useCallback((novoUsuario: UsuarioPayload) => {
    setUsuario(novoUsuario);
    setCookie(null, "@usuario", JSON.stringify(novoUsuario), {
      path: "/",
    });
  }, []);

  const logout = useCallback(async () => {
    try {
      setUsuario(null);
      setTokens(null);
      destroyCookie(null, "@token");
      destroyCookie(null, "@refresh-token");
      destroyCookie(null, "@usuario");
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  }, []);

  const definirToken = useCallback((novoToken: Tokens) => {
    if (novoToken.token && novoToken.refreshToken) {
      setTokens(novoToken);
      setCookie(null, "@token", novoToken.token, {
        path: "/",
      });
      setCookie(null, "@refresh-token", novoToken.refreshToken, {
        path: "/",
      });
    }
  }, []);

  const getUsuario = useCallback(async (): Promise<UsuarioPayload | null> => {
    try {
      const httpClient = new ApiClient(tokens?.token);
      const dados: UsuarioPayload = await httpClient.get("/auth/usuario");
      return dados;
    } catch (error) {
      console.log(error);
      return null;
    }
  }, []);

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["@token"];
    const refreshToken = cookies["@refresh-token"];
    const usuarioString = cookies["@usuario"];

    if (token && refreshToken) {
      setTokens({
        token,
        refreshToken,
      });
    }

    if (usuarioString) {
      try {
        setUsuario(JSON.parse(usuarioString));
      } catch {
        // Ignora erro de parse
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        usuario,
        definirUsuario,
        logout,
        tokens,
        definirToken,
        getUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

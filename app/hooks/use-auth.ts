import { ANON_SERVER_URL } from "@/app/constants";
import { useAuthStore } from "@/app/store/useAuth";
import { toast } from "sonner";
import { handleApiError } from "@/app/lib/handle-error";

export const useAuth = () => {
  const { setUser, setToken, setLoading, logout } = useAuthStore();

  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`${ANON_SERVER_URL}/api/user/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setToken(data.token, data.refreshToken);
      return data.token;
    } catch (error) {
      logout();
      throw error;
    }
  };

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${ANON_SERVER_URL}/api/user/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      setUser(data.user);
      setToken(data.token, data.refreshToken);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (username: string, password: string, age: number) => {
    setLoading(true);
    try {
      const response = await fetch(`${ANON_SERVER_URL}/api/user/sign-up`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, age }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const requestPasswordReset = async (username: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${ANON_SERVER_URL}/api/user/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toast.success("Password reset instructions sent to your email");
      return data;
    } catch (error) {
      handleApiError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    signIn,
    signUp,
    logout,
    refreshAccessToken,
    requestPasswordReset,
  };
};

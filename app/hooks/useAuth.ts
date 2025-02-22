import { toast } from "sonner";
import { useRouter } from "next-nprogress-bar";
import { ANON_SERVER_URL } from "@/app/constants";
import { useAuthStore } from "@/app/store/useAuth";
import Cookies from "js-cookie";
export const useAuth = () => {
  const router = useRouter();
  const { setAuth, setLoading, logout } = useAuthStore();

  const signIn = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${ANON_SERVER_URL}/api/user/sign-in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const { status, message, data, token } = await response.json();
      if (!response.ok || status !== "success") throw new Error(message);

      document.cookie = `token=${token}; path=/`;

      setAuth(data.user, token, token);
      toast.success("Signed in successfully!");
      router.push("/dashboard");
      return data;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Authentication failed"
      );
      throw error;
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

      toast.success("Account created successfully!");
      router.push("/signin");
      return data;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    console.log("logout");
    Cookies.remove("token");  
    Cookies.remove("refreshToken");
    logout();
    router.push("/signin");
    toast.success("Logged out successfully");
  };

  return {
    signIn,
    signUp,
    logout: handleLogout,
  };
};

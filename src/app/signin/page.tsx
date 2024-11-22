import { FloatingThemeToggle } from "@/components/FloatingThemeToggle";
import { Login } from "@/components/pages/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion",
  description: "Login page",
};

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center">
        <FloatingThemeToggle position="bottom-right"/>
        <Login/>
    </div>
  );
};

export default LoginPage;

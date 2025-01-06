import { auth } from "@/auth/auth";
import LoginForm from "@/components/forms/login-form";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="container mt-10 flex justify-center">
      <LoginForm />
    </div>
  );
}

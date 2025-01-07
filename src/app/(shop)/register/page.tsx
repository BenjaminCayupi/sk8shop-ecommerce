import { auth } from "@/auth/auth";
import RegisterForm from "@/components/forms/register-form";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="container mt-10 flex justify-center">
      <RegisterForm />
    </div>
  );
}

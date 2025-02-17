import { auth } from "@/auth/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session?.user.role !== "admin") {
    redirect("/login");
  }
  return (
    <div className="container ">
      <h1 className="text-3xl font-bold mb-8">Bienvenido, BENJAMIN</h1>
    </div>
  );
}

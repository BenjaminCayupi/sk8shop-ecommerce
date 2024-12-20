import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import NotificationBar from "@/components/notification-bar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NotificationBar />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

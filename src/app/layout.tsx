import "./globals.css";
import NavigationBar from '@/components/NavigationBar';
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import ProtectedLayout from "@/components/ProtectedLayout";

export const metadata = {
  title: "Open Your Eyes",
  description: "뮤지컬 공연 정보 사이트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <NavigationBar />
        <LoginModal />
        <SignupModal />
        <ProtectedLayout>
          <main>{children}</main>
        </ProtectedLayout>
        <Footer />
      </body>
    </html>
  );
}

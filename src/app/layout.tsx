import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar/index";
import Fotbar from "@/components/sidebar/fotbar";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Header from "@/components/Header/index";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "My Qur'an",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <div className="border-t">
              <div className="bg-background">
                <div className="flex flex-row justify-center ">
                  <div className="hidden lg:block w-[7%]">
                    <Sidebar />
                  </div>
                  <div className="w-[100%] col-span-3 overflow-auto lg:col-span-5 lg:border-l lg:w-[93%] bg-background">
                    <Header />
                    {children}
                    <Fotbar />
                  </div>
                </div>
              </div>
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

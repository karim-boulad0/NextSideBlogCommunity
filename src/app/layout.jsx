import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { WindowProvider } from "@/context/WindowContext";
import { ReRenderProvider } from "@/context/ReRenderContext";
import { PostProvider } from "@/context/PostContext";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className}`}>
        <PostProvider>
          <ReRenderProvider>
            <WindowProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </WindowProvider>
          </ReRenderProvider>
        </PostProvider>
      </body>
    </html>
  );
}

import AppProvider from "@/provider/provider";

export const metadata = {
  title: "Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{ height: "100vh", backgroundColor: "aliceblue", margin: " 0" }}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
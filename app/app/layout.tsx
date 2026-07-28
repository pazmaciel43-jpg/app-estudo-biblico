import "./globals.css";

export const metadata = {
  title: "Estudo Bíblico AI",
  description: "Gerador de estudos e esboços bíblicos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

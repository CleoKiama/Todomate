import "./globals.css";

export const metadata = {
  title: "Todomate",
 
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className='main_body' >{children}</body>
    </html>
  );
}

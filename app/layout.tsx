import "./app.css";

async function Layout({ children }: { children: any[] }) {
  return (
    <html>
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="manifest" href="manifest.webmanifest" />
        <title>My App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

export default Layout;

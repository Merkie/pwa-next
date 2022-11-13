import "./app.css";

export default async function Layout({ children }: { children: any[] }) {
  return (
    <html>
      <head>
        <link rel="manifest" href="manifest.webmanifest" />
        <title>My App</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

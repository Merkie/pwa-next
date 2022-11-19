import "./app.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
        <link rel="manifest" href="manifest.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/ios/64.png" type="image/png" />
        <title>FreeSpeech AAC</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

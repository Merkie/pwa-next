"use client";
import "./portal.module.css";
import { useRef } from "react";

export default function Portal({ isLogin }: { isLogin: boolean }) {
  const email = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  const onSubmit = async () => {
    const response = await fetch(
      `/api/auth/${isLogin ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current?.value,
          name: name.current?.value,
          password: password.current?.value,
        }),
      }
    );

    // get the response body
    const data: { success: boolean; message?: string; token?: string } =
      await response.json();

    // if the response is successful, set cookie, else alert with error message
    if (data.success) {
      document.cookie = `auth=${data.token}; max-age=86400;path=/`;
      window.location.href = "/app";
    } else {
      alert(data.message);
    }
  };

  return (
    <main>
      <h1>Portal</h1>
      <section>
        <input ref={email} type="text" placeholder="email" />
        {isLogin ? (
          <input ref={password} type="password" placeholder="password" />
        ) : (
          <>
            <input ref={name} type="text" placeholder="name" />
            <input ref={password} type="password" placeholder="password" />
            <input
              ref={confirmPassword}
              type="password"
              placeholder="confirm password"
            />
          </>
        )}
      </section>
      <button onClick={onSubmit}>{isLogin ? "Login" : "Sign in"}</button>
    </main>
  );
}

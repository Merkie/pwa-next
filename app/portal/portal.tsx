"use client";
import "./portal.module.css";
import { useRef } from "react";
import Image from "next/image";

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
    <main className="h-screen shadow-xl grid place-items-center bg-gradient-to-b from-gray-800 to-gray-900 text-gray-50">
      <a
        className="absolute top-[10%] left-1/2 -trangray-x-1/2 sm:-trangray-x-0 sm:top-[40px] sm:left-[40px]"
        href="/"
      >
        <div className="flex items-center gap-4 opacity-75 hover:opacity-100">
          <Image
            src="/images/logo-white.png"
            width={30}
            height={30}
            alt="free speech aac logo"
          />
          <h1 className="font-bold text-2xl">
            FreeSpeech <span className="font-light">AAC</span>
          </h1>
        </div>
      </a>

      <div className="flex w-full sm:w-[700px] sm:h-[600px] bg-transparent sm:bg-gray-100">
        <section
          style={{
            backgroundImage:
              'url("https://static.wixstatic.com/media/086b42_959bc8c420e044d9a2aacfb2c88fab74~mv2_d_3024_3024_s_4_2.jpg/v1/fill/w_560,h_560,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/086b42_959bc8c420e044d9a2aacfb2c88fab74~mv2_d_3024_3024_s_4_2.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
          className="hidden sm:inline flex-1 overflow-hidden"
        >
          <div
            style={{ background: "#29306b7f" }}
            className="h-full w-full grid place-items-center"
          >
            <h1
              style={{ textShadow: "0 0 20px rgba(0,0,0,0.5)" }}
              className="text-4xl font-bold text-gray-50 p-4"
            >
              {'"Where AAC feels like home."'}
              <small className="block text-sm font-normal">
                -<i>Anonymous</i>, AAC User
              </small>
            </h1>
          </div>
        </section>
        <section className="flex-1 flex gap-2 flex-col justify-center p-4 md:text-gray-900 bg-gray-900 md:bg-gray-100 border border-gray-700 border-x-0">
          <h1 className="text-2xl font-bold text-center sm:text-left">
            {isLogin ? "Log in" : "Join FreeSpeech"}
          </h1>
          <p className="font-medium">Add your email</p>
          <input
            className="bg-gray-200 mb-2 border border-gray-300 text-gray-500 p-2 rounded-sm"
            ref={email}
            type="text"
          />
          {isLogin ? (
            <>
              <p className="font-medium">Choose a password</p>
              <input
                className="bg-gray-200 border border-gray-300 text-gray-500 p-2 rounded-sm"
                ref={password}
                type="password"
                placeholder="password"
              />
              <p className="font-light mb-2" style={{ opacity: 0.75 }}>
                Min 6 characters, numbers & letters
              </p>
            </>
          ) : (
            <>
              <p className="font-medium">Add your name</p>
              <input
                className="bg-gray-200 mb-2 border border-gray-300 text-gray-500 p-2 rounded-sm"
                ref={name}
                type="text"
                placeholder="name"
              />
              <p className="font-medium">Choose a password</p>
              <input
                className="bg-gray-200 border border-gray-300 text-gray-500 p-2 rounded-sm"
                ref={password}
                type="password"
                placeholder="password"
              />
              <p className="font-light mb-2" style={{ opacity: 0.75 }}>
                Min 6 characters, numbers & letters
              </p>
              <p className="font-medium">Confirm your password</p>
              <input
                className="bg-gray-200 mb-2 border border-gray-300 text-gray-500 p-2 rounded-sm"
                ref={confirmPassword}
                type="password"
                placeholder="confirm password"
              />
            </>
          )}
          <button
            className="bg-blue-600 text-blue-50 border border-blue-500 rounded-md p-2"
            onClick={onSubmit}
          >
            {isLogin ? "Login" : "Sign in"}
          </button>
          <span className="pt-5 text-center sm:text-left">
            {isLogin ? "Don't have an account?" : "Already a member?"}
            <a
              className="underline ml-2 text-blue-500 hover:text-blue-400"
              href={isLogin ? "/portal/signup" : "/portal/login"}
            >
              {isLogin ? "Sign up instead" : "Log in instead"}
            </a>
          </span>
        </section>
      </div>
      <div className="absolute left-1/2 -trangray-x-1/2 sm:-trangray-x-0 bottom-[50px] sm:bottom-[20px] flex gap-2 items-center">
        <a href="https://github.com/merkie/freespeech" target="blank">
          <i className="bx bxl-github text-4xl text-gray-500 hover:text-gray-50"></i>
        </a>
        <a href="/docs">
          <i className="bx bxs-book text-4xl text-gray-500 hover:text-gray-50"></i>
        </a>
      </div>
    </main>
  );
}

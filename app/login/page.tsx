import Image from "next/image";
import React from "react";

function LoginPage() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="bg-slate-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:block hidden w-1/2 rounded-lg">
          <Image
            className="rounded-lg"
            width={468}
            height={703}
            src={
              "https://img.freepik.com/free-photo/beautiful-nature-landscape-with-mountains_23-2150706073.jpg?t=st=1708241899~exp=1708245499~hmac=a780b86cfe8a4acf41c390f4e908e1d3e7027f2f52810c527a88a397df100c87&w=360"
            }
            alt=""
          />
        </div>

        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-3xl text-[#002D74]">Login</h2>
          <p className="text-s mt-4 text-[#002D74]">
            Travel Healthcare Admin Panel
          </p>

          <form action="" className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border"
              type="email"
              name="email"
              placeholder="Username"
            />
            <div className="relative">
              <input
                className="p-2 rounded-xl border w-full"
                type="password"
                name="password"
                placeholder="Password"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;

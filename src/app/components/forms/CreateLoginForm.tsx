
import Image from "next/image";
import { FormEvent } from "react";
import LabeledInput from "../input/AuthInput";
interface CreateLoginFormProps {
  onSubmit: () => void;
}


const CreateLoginForm = ({onSubmit}: {onSubmit: (event: FormEvent<HTMLFormElement>) => void}) => {
  return (
    <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
          <section className="flex justify-center items-center self-stretch px-16 py-20 my-auto w-full bg-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col mt-10 max-w-full w-[300px]">
              <header className="flex gap-3 text-blue-900">
                <Image
                  src="/logo.png"
                  alt="App logo"
                  className="shrink-0 aspect-[1.15] w-[85px]"
                  width={400}
                  height={1000}   
                />
                <div className="flex flex-col self-start mt-3.5">
                  <p className="text-xs">
                    Selamat Datang di [Nama App] <br />
                  </p>
                  <h1 className="mt-3 text-2xl font-bold">Silakan Masuk!</h1>
                </div>
              </header>
              <form onSubmit={onSubmit}>
              <div className={`flex flex-col justify-center`}>
                <LabeledInput
                  label="Username"
                  id="username"
                  placeholder="Enter your username"
                  className="mt-9"
                />

                <LabeledInput
                  label="Password"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  className="mt-5"

                />
                <button
                  type="submit"
                  className="justify-center items-center px-16 py-2 mt-6 text-sm font-bold text-center text-white whitespace-nowrap rounded-lg bg-blue-950 max-md:px-5"
                >
                  masuk
                </button>
              </div>
              </form>
              <div className="mt-28 text-sm text-start max-md:mt-10">
                <span className="text-black font-medium">Lupa password? </span>
                <a href="#" className="text-blue-900 font-bold">
                  ubah di sini
                </a>
                <br />
              </div>
              <div className="mt-2 text-sm font-bold text-start text-blue-900">
                <span className="text-black font-medium">Belum punya akun? daftar</span>{" "}

                <a href="#" className="text-blue-900">
                  di sini
                </a>
              </div>
            </div>
          </section>
        </div>
  )
  }

  export default CreateLoginForm;
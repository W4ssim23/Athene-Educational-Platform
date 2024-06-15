"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

import { LogoP } from "../../../assets";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import Image from "next/image";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("All fields are required !");
      return;
    }
    setLoading(true);
    console.log("submit", username, password);
    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid Credentials");
        setLoading(false);
        return;
      }
      console.log("LogedIn !", res);
      router.replace("classes");
      setLoading(false);
    } catch (error) {
      setError("An error occurred while logging in");
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className=" w-full min-h-lvh flex items-center justify-center flex-col gap-[35px] bg-bgfakeWhite">
      <div className="flex flex-col sm:flex-col-reverse justify-center items-center gap-[29px]">
        <Image src={LogoP} alt="logo" priority />
        <h2 className="text-center font-poppins text-headcolor font-semibold text-[22px] sm:text-[33px]">
          Bienvenue, Connectez-vous <br className="sm:hidden" /> à votre compte
        </h2>
      </div>
      <div className="w-full flex flex-col gap-[17px] items-center justify-between relative">
        <form
          className="w-full flex flex-col gap-[17px] items-center justify-between relative"
          onSubmit={handleSubmit}
        >
          <Input
            name="username"
            type="text"
            label="Username"
            placeholder="Entre Votre Nom d'utilisateur"
            className="w-[70%] max-w-[400px] rounded-[5px] "
            variant="underlined"
            onChange={(e) => {
              setUsername(e.target.value);
              // console.log(e.target.value);
            }}
          />
          <Input
            name="password"
            type="password"
            label="Password"
            placeholder="Entre Votre Mot de Passe"
            className="w-[70%] max-w-[400px] rounded-[5px]"
            variant="underlined"
            onChange={(e) => {
              setPassword(e.target.value);
              // console.log(e.target.value);
            }}
          />
          {error && <p className="text-red">{error}</p>}
          <Button
            type="submit"
            size="lg"
            radius="sm"
            className="w-[70%] min-h-[60px] max-w-[400px] text-white bg-primary mt-[1%]"
            isLoading={loading}
          >
            Connecter
          </Button>
        </form>
        <div className="flex items-center justify-center flex-col">
          <p className="text-textgray1">Vous n’avez pas encore de compte?</p>
          <a
            className="text-primary font-semibold text-center hover:underline"
            href="##"
          >
            Contacter l’adminstration
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

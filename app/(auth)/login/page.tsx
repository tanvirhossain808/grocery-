"use client";
import { BikeIcon, LockIcon, MailIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { redirect } from "next/navigation";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
  Spinner,
} from "@heroui/react";
export default function LoginPage() {
  const [isLoginState, setIsLoginState] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      redirect("/");
    }, 1000);
  };
  return (
    <div className="flex">
      <div className="relative min-h-screen flex items-center justify-center w-1/2">
        <Image
          // sizes=""
          loading="eager"
          src="/grocery-assets/Background.png"
          alt="Background"
          fill
          sizes="100vw"
        />
        <div className="relative">
          <h1 className="text-4xl font-semibold text-white">
            Welcome back to Instacart
          </h1>
          <p className="text-white/60 mt-5 text-xl max-w-sm font-serif text-center">
            Fresh groceries and organic produce, delivered to your doorstep.
          </p>
        </div>
      </div>
      <div className="flex-1 flex-center px-4 py-12 bg-app-cream">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <Link href="/" className="inline-flex gap-2 items-center mb-6">
              <BikeIcon className="text-app-green" />
              <span className="text-2xl font-semibold text-app-green">
                Instacart
              </span>
            </Link>
            <h1 className="text-2xl font-semibold font-2xl text-app-green mb-2">
              {isLoginState
                ? "Sign in to your account"
                : "Sign up for an account"}
            </h1>
            <p className="text-app-text-light">
              {isLoginState
                ? "Don't have an account? "
                : "Already have an account? "}{" "}
              <span
                className="text-orange-500 ml-1 w-auto p-0 max-w-0 bg-transparent cursor-pointer hover:text-orange-600 font-semibold translation-color "
                onClick={(prev) => setIsLoginState(!isLoginState)}
              >
                {isLoginState ? "Create one" : "Sign in"}
              </span>{" "}
            </p>
          </div>

          <Form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {inputFields.map(
              (field) =>
                (!isLoginState || field.name !== "name") && (
                  <TextField
                    key={field.name}
                    isRequired
                    name={field.name}
                    type="text"
                    {...(field.type === "email" && {
                      validate: (value) => {
                        if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                            value,
                          )
                        ) {
                          return "Please enter a valid email address";
                        }
                        return null;
                      },
                    })}
                  >
                    <Label className="text-app-green text-sm">
                      {field.name}
                    </Label>

                    <InputGroup className="w-full py-2 rounded-xl bg-white flex items-center gap-2 border not-focus:border-app-border px-3 transition-all ">
                      <InputGroup.Suffix>{field.icon({})}</InputGroup.Suffix>

                      <InputGroup.Input
                        type={field.type}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            [field.name]: e.target.value,
                          });
                        }}
                        className="w-full"
                        placeholder={field.placeholder}
                      />
                    </InputGroup>

                    <FieldError className="text-red-500" />
                  </TextField>
                ),
            )}
            <div className="flex gap-2">
              <Button
                isDisabled={loading}
                type="submit"
                className="bg-app-green h-12 w-full font-semibold py-3 text-base rounded-lg text-white hover:bg-app-green-light transition-all disabled:bg-app-green/50"
              >
                {loading ? (
                  <div>
                    <Spinner size="lg" />
                  </div>
                ) : isLoginState ? (
                  "Sign In"
                ) : (
                  "Sign Up"
                )}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

const inputFields = [
  {
    name: "name",
    type: "text",
    placeholder: "John Doe",
    icon: (rest: React.SVGProps<SVGSVGElement>) => (
      <UserIcon className="text-app-text-light size-4" {...rest} />
    ),
  },
  {
    name: "email",
    type: "email",
    placeholder: "you@example.com",
    icon: (rest: React.SVGProps<SVGSVGElement>) => (
      <MailIcon className="text-app-text-light size-4" {...rest} />
    ),
  },
  {
    name: "password",
    type: "password",
    placeholder: "Enter your password",
    icon: (rest: React.SVGProps<SVGSVGElement>) => (
      <LockIcon className="text-app-text-light size-4" {...rest} />
    ),
  },
];

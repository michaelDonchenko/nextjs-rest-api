"use client";
import React, {useCallback, useState} from "react";
import {useForm} from "react-hook-form";
import Button from "./Button";
import {useRouter} from "next/navigation";

interface FormData {
  email: string;
  name: string;
  age: string;
  isAdmin: boolean;
}

type Props = {};

const CreateUserForm = (props: Props) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const {handleSubmit, register, reset} = useForm<FormData>({
    defaultValues: {
      name: "",
      age: "",
      email: "",
      isAdmin: false,
    },
  });

  const onSubmit = useCallback(
    async (formData: FormData) => {
      const serverFormatted = {...formData, age: Number(formData.age)};
      const res = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        body: JSON.stringify(serverFormatted),
      });

      if (!res.ok) {
        const {message} = await res.json();
        setError(message);
        throw new Error("Unable to create new user");
      }

      router.refresh();
      reset();
      setError("");
      setSuccess("Successfully create a new user");
    },
    [router]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full max-w-xs mb-2">
        <label className="label">
          <span className="label-text">What is your name?</span>
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          className="input input-bordered input-sm w-full max-w-xs"
        />
      </div>

      <div className="form-control w-full max-w-xs mb-2">
        <label className="label">
          <span className="label-text">What is your email?</span>
        </label>
        <input
          {...register("email")}
          type="text"
          placeholder="email"
          className="input input-bordered input-sm w-full max-w-xs"
        />
      </div>

      <div className="form-control w-full max-w-xs mb-2">
        <label className="label">
          <span className="label-text">What is your age?</span>
        </label>
        <input
          {...register("age")}
          type="number"
          placeholder="Age"
          className="input input-bordered input-sm w-full max-w-xs"
        />
      </div>

      <div className="form-control w-full max-w-xs mb-2">
        <label className="label cursor-pointer">
          <span className="label-text">Are you an admin?</span>
          <input {...register("isAdmin")} type="checkbox" className="checkbox checkbox-primary" />
        </label>
      </div>

      {success ? (
        <div className="alert alert-success">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 hover:cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setSuccess("")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{success}</span>
        </div>
      ) : null}
      {error ? (
        <div className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6 hover:cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            onClick={() => setError("")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{error}</span>
        </div>
      ) : null}

      <Button className="btn btn-primary btn-sm mt-4">Submit</Button>
    </form>
  );
};

export default CreateUserForm;

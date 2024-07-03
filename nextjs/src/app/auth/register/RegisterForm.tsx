"use client";
import React from "react";
import { AuthForm } from "@/app/components/AuthForm";

export default function RegisterForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    alert("submitting from register...");
    e.preventDefault();
  };

  return <AuthForm formType="register" onSubmit={handleSubmit} />;
}

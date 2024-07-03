import Link from "next/link";
import React from "react";

export const NavLinks = () => (
  <ul className="hidden space-x-4 md:flex">
    <Link href="/search?genre=Comedy">Loja</Link>
    <Link href="/search?genre=Action">Fale Conosco</Link>
    <Link href="/search?genre=Animation">Sobre</Link>
    <Link href="/auth/login">Minha Conta</Link>
    <Link href="/search?genre=Adventure">Blog</Link>
  </ul>
);

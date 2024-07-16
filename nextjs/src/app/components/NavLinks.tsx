import Link from "next/link";
import React from "react";

export const NavLinks = () => (
  <ul className="hidden space-x-4 md:flex">
    <Link href="/store">Loja</Link>
    <Link href="/contact">Fale Conosco</Link>
    <Link href="/about">Sobre</Link>

    {/* <Link href="/search?title=">Filmes</Link> */}
    {/* <Link href="/search?genre=Comedy">Loja</Link> */}
    <Link href="/products">Produtos</Link>
    <Link href="/events">Eventos</Link>
    <Link href="/video">Vídeos</Link>
    <Link href="/blog">Blog</Link>
    <Link href="/my-account">Minha Conta</Link>
  </ul>
);

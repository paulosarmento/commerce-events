import Link from "next/link";
import {
  ChevronDownIcon,
  PlayIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { Product } from "../types/product";

export const ProductInfo = ({ product }: { product: Product }) => (
  <div className="absolute z-10 w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4 ">
    <div className="flex flex-row items-center justify-between gap-2">
      <div className="flex flex-row items-center gap-2">
        <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-transparent transition hover:bg-neutral-300 hover:text-black lg:h-10 lg:w-10">
          <Link href={`/watch/${product.id}`}>
            <PlayIcon className="w-4 lg:w-6" />
          </Link>
        </div>
        <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-transparent transition hover:bg-neutral-300 hover:text-black lg:h-10  lg:w-10">
          <PlusIcon className="w-4 lg:w-6" />
        </div>
      </div>
      <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-transparent transition hover:bg-neutral-300 hover:text-black lg:h-10 lg:w-10">
        <ChevronDownIcon className="w-4 lg:w-6" />
      </div>
    </div>

    <div className="mt-4 text-sm font-bold text-white lg:text-lg">
      {product.name}
    </div>
    {/* 
    <div className="mt-4 flex flex-col gap-2 text-sm">
      <div className="flex flex-row items-center gap-2">
        <SpeakerWaveIcon className="w-4" /> Double Atmos 5.1 4K
      </div>
      <div className="flex flex-row items-center gap-2">
        <UserGroupIcon className="w-4" /> <MovieRating rating={product.rating} />
        4k
      </div>
    </div>
    <div className="mt-4 flex flex-row items-center gap-2 text-[8px] text-white lg:text-sm">
      <p>{product.genres.join(" ·  ")}</p>
    </div> */}
  </div>
);

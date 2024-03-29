"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa6";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

export const ListItem = ({ image, name, href }: ListItemProps) => {
  const router = useRouter();

  function onClick() {
    // add authentication before push
    router.push(href);
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center relative group rounded-md overflow-hidden  gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="flex items-center justify-center absolute transition opacity-0 rounded-full bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
        <FaPlay className="text-black" />
      </div>
    </button>
  );
};

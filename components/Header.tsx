"use client";

import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { Button } from "./Button";
import { useAuthModal } from "@/hooks/useAuthModal";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const Header = ({ children, className }: HeaderProps) => {
  const authModal = useAuthModal();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  async function handleLogout() {
    const { error } = await supabaseClient.auth.signOut();
    router.refresh();
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out!");
    }
  }
  return (
    <div
      className={twMerge("bg-gradient-to-b from-emerald-800 p-6", className)}
    >
      <div className="flex items-center justify-between w-full mb-4 ">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center rounded-full bg-black hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className="flex items-center justify-center rounded-full bg-black hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex items-center md:hidden gap-x-2 ">
          <button className="flex items-center justify-center rounded-full bg-white p-2 hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>
          <button className="flex items-center justify-center rounded-full bg-white p-2 hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        {user ? (
          <div className="flex gap-x-4 items-center">
            <Button onClick={handleLogout} className="bg-white px-6 py-2">
              Logout
            </Button>
            <Button
              onClick={() => router.push("/account")}
              className="bg-white"
            >
              <FaUserAlt />
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-x-3">
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Log In
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
      {children}
    </div>
  );
};

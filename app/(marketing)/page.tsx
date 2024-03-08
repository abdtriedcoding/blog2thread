import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="min-h-full flex flex-col lg:flex-row justify-center items-center">
      <div className="flex flex-col lg:items-start items-center justify-center">
        <h2 className="font-black bg-gradient-to-b from-zinc-800 via-neutral-600 to-stone-800 text-[3rem] md:text-[4.5rem] lg:text-[5rem] text-transparent bg-clip-text leading-none tracking-tight mb-8 lg:text-left text-center">
          turn your blogs into concise twitter threads
        </h2>
        <Link
          href={"https://github.com/abdtriedcoding"}
          className={buttonVariants({ variant: "secondary", size: "lg" })}
        >
          <Github className="w-5 h-5" />
          <p className="font-medium ml-1">Github</p>
        </Link>
      </div>
      <Image
        width={500}
        height={460}
        src="/taking-notes.svg"
        alt="illustration"
      />
    </section>
  );
}

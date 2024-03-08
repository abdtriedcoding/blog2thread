import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="h-full flex flex-col lg:flex-row justify-center items-center">
      <div className="flex flex-col lg:items-start items-center justify-center">
        <h2 className="font-black bg-gradient-to-b from-zinc-800 via-neutral-600 to-stone-800 text-[3rem] md:text-[4.5rem] lg:text-[5rem] text-transparent bg-clip-text leading-none tracking-tight mb-8 lg:text-left text-center">
          turn your blogs into concise twitter threads
        </h2>
        <Button>Get Started</Button>
      </div>
      <Image
        width={500}
        height={460}
        src="https://illustrations.popsy.co/white/taking-notes.svg"
        alt="illustration"
      />
    </section>
  );
}

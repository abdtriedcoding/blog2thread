import Link from "next/link";
import { Button } from "./ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

export const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="z-50 bg-background fixed top-0 flex items-center w-full p-4 justify-between border-b">
      <Link href={"/"} className="font-semibold text-xl">
        Blog2Thread
      </Link>
      {user ? (
        <Button asChild>
          <LogoutLink>Logout</LogoutLink>
        </Button>
      ) : (
        <Button asChild>
          <LoginLink>Log in</LoginLink>
        </Button>
      )}
    </div>
  );
};

import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

import UserProfileMenu from "./userprofile-menu";

export const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className="z-50 bg-background fixed top-0 flex items-center w-full p-4 justify-between border-b">
      <Link href={"/"} className="font-semibold text-xl">
        Blog2Thread
      </Link>
      {user ? (
        <div className="flex items-center justify-center space-x-2">
          <Link href={"/create"} className={buttonVariants()}>
            Enter
          </Link>
          <UserProfileMenu />
        </div>
      ) : (
        <Button asChild>
          <LoginLink>Log in</LoginLink>
        </Button>
      )}
    </div>
  );
};

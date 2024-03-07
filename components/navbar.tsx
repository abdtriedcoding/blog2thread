import { Button } from "./ui/button";

export const Navbar = () => {
  return (
    <div className="z-50 bg-background fixed top-0 flex items-center w-full p-4 justify-between border-b">
      <p className="font-semibold">Jotion</p>
      <Button>Login</Button>
    </div>
  );
};

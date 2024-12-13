"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/action";

export default function LogoutButton() {
  return <Button onClick={() => signOut()}>Logout</Button>;
}

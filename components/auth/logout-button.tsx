"use client";

import { logout } from "@/actions/user";
import { Button } from "@/components/ui/button";

export const LogoutButton = () => {
  const handleLogout = () => {
    logout();
  };

  return <Button onClick={handleLogout}>Logout</Button>;
};

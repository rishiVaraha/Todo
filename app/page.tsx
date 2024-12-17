"use client";

import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { UserRole } from "@/types/custom";

export default function Home() {
  const [userRole, setUserRole] = useState<UserRole>("user");
  const { toast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        toast({
          title: "Error",
          description: "Could not fetch user",
          variant: "destructive",
        });
        return;
      }

      if (user) {
        getUserRole(user.id);
      }
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        getUserRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const getUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Could not fetch user role",
        variant: "destructive",
      });
    } else if (data) {
      setUserRole(data.role as UserRole);
    }
  };

  return <div>Admin Dashboard {userRole}</div>;
}

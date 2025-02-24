"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { UserRole } from "@/types/custom";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  user: any | null;
  userRole: UserRole;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: "user",
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [userRole, setUserRole] = useState<UserRole>("user");
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUser = async () => {
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
        setIsLoading(false);
        return;
      }

      if (user) {
        await fetchUserAndRole(user.id);
      } else {
        setUser(null);
        setUserRole("user");
        setIsLoading(false);
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserAndRole(session.user.id);
      } else {
        setUser(null);
        setUserRole("user");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserAndRole = async (userId: string) => {
    const { data, error } = await supabase
      .from("users")
      .select("*, role")
      .eq("id", userId)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Could not fetch user data",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (data) {
      setUser({
        id: data.id,
        email: data.email,
        ...data,
      });
      setUserRole(data.role as UserRole);
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

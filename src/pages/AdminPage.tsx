import { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";

import { supabase } from "../lib/supabase";
import UploadForm from "./UploadForm";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      console.log(data)
      setIsLoggedIn(!!data.session);
    };
    // console.log(data)

    checkSession();

    // Optional: subscribe to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  return isLoggedIn ? <UploadForm /> : <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
};

export default AdminPage;

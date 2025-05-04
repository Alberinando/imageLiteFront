'use client'
import Login from "@/app/login/page";
import {useAuth} from "@/resources/users/authentication.resourse";
import GaleriaPage from "@/app/galeria/page";

export default function Home() {
    const auth = useAuth();
    const user = auth.getUserSession();

    if(!user){
        return <Login/>
    }
  return (
    <>
      <GaleriaPage />
    </>
  );
}

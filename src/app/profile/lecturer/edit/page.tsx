'use client'


import EditLecturerForms from "@/app/components/forms/EditLecturerForm";
import Spinner from "@/app/components/spinner/spinner";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useState } from "react";




  const EditUserPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);
    const { data, status } = useGetAuth("/api/auth/lecturer", "lecturer")

    if (status === "pending") {
      return <div><Spinner/></div>
    }
    if (status === "success")
    return(
      <EditLecturerForms preloadedUser={data} onMutationSuccess={() => setReloadKey(prevKey => prevKey + 1)} />
    )
  
  };



  
  export default EditUserPage;
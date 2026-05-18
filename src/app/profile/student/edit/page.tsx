'use client'

import EditStudentForms from "@/app/components/forms/EditStudentForm";
import Spinner from "@/app/components/spinner/spinner";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useState } from "react";




  const EditUserPage: React.FC = () => {
    const [reloadKey, setReloadKey] = useState(0);
    const { data, status } = useGetAuth("/api/auth/student", "student")

    if (status === "pending") {
      return <div>
        <Spinner/>
      </div>
    }
    if (status === "success")
    return(
      <EditStudentForms preloadedUser={data} onMutationSuccess={() => setReloadKey(prevKey => prevKey + 1)} />
    )
  
  };



  
  export default EditUserPage;
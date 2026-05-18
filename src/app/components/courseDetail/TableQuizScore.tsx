"use client";

import React from "react";
import { useGetAuth } from "@/app/lib/api/useAuth";
import { useParams, usePathname } from "next/navigation";

const TableQuizScore = () => {
  const params = useParams();
  const pathname = usePathname();

  const { data } = useGetAuth(
    `/api/course/${params.id_course}/students`,
    "list student"
  );

  return (
    <>
      <div className="py-10 flex flex-col items-center justify-center">
        <table className="table-fixed text-center">
          <thead className="bg-main text-white h-12">
            <tr>
              <th className="w-12">No</th>
              <th className="w-72">Nama</th>
              <th className="w-52">Nilai</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data?.map((data:any, index:number) => (
              <tr className="h-12">
                <td className="font-bold">{index + 1}</td>
                <td>{data["user"]["nama_lengkap"]}</td>
                <td>{data["user"]["score"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableQuizScore;

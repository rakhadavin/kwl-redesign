"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";


const MyCourseContainer = ({ data }:any) => {
  // const [course, setCourse] = useState([]);

  return (
    <div>
      {data?.map((course:any) => (
        <CourseCard
          key={course["id"]}
          id={course["id"]}
          courseLong={course["full_name"]}
          courseShort={course["short_name"]}
          color={course["color_theme"]}
          
        />
      ))}
    </div>
  );
};

export default MyCourseContainer;

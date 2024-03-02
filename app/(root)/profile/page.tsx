"use client";

import React, { useContext, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { preferenceUrl } from "@/utils/route";
import { Appcontext } from "@/context/appcontext";
import axios from "axios";

const page = () => {
  const { token }: { token: string } = useContext(Appcontext);
  const preferenceList = [
    "Software Engineer/Developer",
    "Data Scientist/Data Analyst",
    "Product Manager",
    "Entrepreneur/Startup Founder",
    "Consultant",
    "Project Manager",
    "Technical Sales Engineer",
    "Research and Development (R&D) Engineer",
    "Quality Assurance/Quality Control (QA/QC) Engineer",
    "Systems Architect/Systems Engineer",
    "Finance",
  ];

  const [preferences, setPrefernces] = useState<string[]>([]);

  const checkHandler = async (checked: boolean, value: string) => {
    if (checked) {
      setPrefernces([...preferences, value]);
    } else {
      const updatedpreferences = preferences.filter((p) => p != value);
      setPrefernces([...updatedpreferences]);
    }
  };
  const savePreference = async (e: any) => {
    e.preventDefault();
    console.log(preferences)
    const loading = toast.loading("Saving Preferences");
    try {
      console.log("Printing token",token);
      const response=await axios.post(preferenceUrl, { preference: JSON.stringify(preferences)
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },

      });
      console.log(response)
    } catch (error) {
      toast.error("Error Saving Preferences");
    }finally{
      toast.dismiss(loading);
    }
  };
  return (
    <div className=" flex flex-col h-[calc(100vh-4rem)] justify-center items-center">
      <div className="flex flex-col gap-2 items-start justify-center h-full">
        <div className="mb-10 ml-2">
          <h1 className="font-bold text-2xl ">
            Select Your Desired Preference List
          </h1>
        </div>
        {preferenceList.map((p, index) => (
          <div key={index} className="flex items-start space-x-2">
            <Checkbox
              id={p}
              onCheckedChange={(checked: boolean) => {
                checkHandler(checked, p);
              }}
            />
            <label
              htmlFor={p}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {p}
            </label>
          </div>
        ))}
      </div>
      <div>
        <Button onClick={savePreference}>Save Preferences</Button>
      </div>
    </div>
  );
};

export default page;


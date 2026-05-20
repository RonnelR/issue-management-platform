"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CreateIssue() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //funtions for creating issues 
  const handleSubmit = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/issues`,
        {
          title,
          description,
        }
      );

      toast.success("Issue created successfully")
      router.push("/");
    } catch (err) {
      console.log(err);
      toast.error("Creating issue failed!")
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create Issues</h1>

      <input
        className="border p-2 w-full"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        onClick={handleSubmit}
        className="bg-red-900 hover:bg-red-950 text-white px-4 py-2 rounded"
      >
        Create Issue
      </button>
    </div>
  );
}
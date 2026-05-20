"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";


export default function Home() {
  const [issues, setIssues] = useState([]);

//getting list of issues
useEffect(() => {
 axios
  .get(`${process.env.NEXT_PUBLIC_API_URL}/issues`)
  .then((res) => setIssues(res.data))
  .catch((err) => {
    console.log(err);
    toast.error("Error in getting List of Issues");
  });
}, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>


<Link href="/create">
  <button className="mb-4 bg-green-600 text-white px-3 py-1 rounded">
    + Create Issue
  </button>
</Link>

<div className="space-y-3">
  {issues.map((issue: any) => (
    <Link key={issue.id} href={`/issue/${issue.id}`}>
      <div
        className="p-4 mb-3 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
      >
        <h2 className="text-rose-900 font-semibold">{issue.title}</h2>
        <p className="text-sm text-gray-600">{issue.description}</p>
      </div>
    </Link>
  ))}
</div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import toast from 'react-hot-toast'

export default function IssueDetail() {
  const { id } = useParams();
  const issueId = Number(id); 
  const [issue, setIssue] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [analysis, setAnalysis] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [message, setMessage] = useState("");

  // get both issue and commennts
  useEffect(() => {
    if (!issueId) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/issues/${issueId}`)
      .then((res) => setIssue(res.data))
      .catch(console.log);

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/comments/${issueId}`)
      .then((res) => setComments(res.data))
      .catch(console.log);
  }, [issueId]);

  // to add comments
  const addComment = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
        {
          issueId: issueId, 
          authorName,
          message,
        }
      );
      toast.success('comment added')

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${issueId}`
      );

      setComments(res.data);
      setAuthorName("");
      setMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  //for ai analysis
  const generateAI = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/ai/${issueId}`
      );

      setAnalysis(res.data.analysis);
    } catch (err) {
        toast.error("Gemini API quota exceeded. Please try again later.")
      console.log(err);
    }
  };

  if (!issue) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 space-y-4">

      {/* ISSUE */}
      <h1 className="text-2xl font-bold">{issue.title}</h1>
      <p className="text-gray-600">{issue.description}</p>

      {/* AI BUTTON */}
      <button
        onClick={generateAI}
        className="bg-fuchsia-900 hover:bg-fuchsia-950 text-white px-4 py-2 rounded"
      >
        Generate AI Analysis
      </button>

      {analysis && (
        <div className="p-4 border rounded bg-gray-50 whitespace-pre-wrap">
          {analysis}
        </div>
      )}

      {/* COMMENTS */}
      <h2 className="text-xl font-semibold mt-6">Comments</h2>

      {comments.map((c: any) => (
        <div key={c.id} className="border p-3 rounded">
          <p className="font-medium">{c.authorName}</p>
          <p>{c.message}</p>
        </div>
      ))}

      {/* ADD COMMENT FORM */}
      <div className="mt-6 space-y-2">
        <h3 className="font-semibold">Add Comment</h3>

        <input
          className="border p-2 w-full"
          placeholder="Your name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Write a comment..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={addComment}
          className="bg-blue-600 hover:bg-blue-900 text-white px-4 py-2 rounded"
        >
          Post Comment
        </button>
      </div>
    </div>
  );
}
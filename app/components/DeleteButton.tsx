"use client";
import {useRouter} from "next/navigation";
import React, {useCallback, useState} from "react";

interface Props {
  id: number;
}

const DeleteButton = ({id}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const deleteUser = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      cache: "no-cache",
    });

    if (!res.ok) {
      setLoading(false);
      throw new Error("Failed to delete user");
    }
    router.refresh();
    setLoading(false);
  }, [id]);

  return (
    <button disabled={loading} onClick={deleteUser} className="btn btn-circle btn-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};

export default DeleteButton;

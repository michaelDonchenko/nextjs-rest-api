import {User} from "@prisma/client";
import React from "react";
import ActionHeader from "./components/ActionHeader";
import DeleteButton from "./components/DeleteButton";

const getUsers = async () => {
  const res = await fetch("http://localhost:3000/api/users", {method: "GET", cache: "no-cache"});

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return await res.json();
};

const RootPage = async () => {
  const users = await getUsers();

  return (
    <section className="flex flex-col w-full max-w-[900px] mx-auto py-6">
      <ActionHeader />

      <div className="relative overflow-x-auto my-6 shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3">Id</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Is admin</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users.map((user: User) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td className="px-6 py-3">{user.id}</td>
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3">{user.age}</td>
                  <td className="px-6 py-3">{user.isAdmin ? "Yes" : "No"}</td>
                  <td className="px-6 py-3">
                    <DeleteButton id={user.id} />
                  </td>
                </tr>
              ))
            ) : (
              <div>No users found...</div>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default RootPage;

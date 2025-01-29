import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { jwtTokenState, userState } from "../store/states";
import fetchUserDetails from "../apis/fetchUserDetails";
import { useLogout } from "../hooks/useLogout";
import Button from "./material3/Button";

function Account() {
  const jwtToken = useRecoilValue(jwtTokenState);
  const logout = useLogout();
  const [user, setUser] = useRecoilState(userState);
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["userDetails", jwtToken],
    queryFn: () => fetchUserDetails({ jwtToken }),
    onSuccess: (data) => {
      setUser(data); //TODO - Check if this is necessary
    },
  });

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600">Error: {error.message}</div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md border-s-[1px] overflow-auto h-full">
      <header className="sticky top-0 p-3 bg-white border-b-[1px] flex justify-between">
        <h2 className="m3-title-medium text-2xl font-semibold mb-6">
          Account Details
        </h2>
        <div className="">
          <Button variant="filled" title="Log out" onClick={logout}>
            <div className="flex items-center gap-1">
              <span>Logout</span>
              <span className="material-symbols-outlined">logout</span>
            </div>
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-3">
        {/* Personal Information */}
        <div>
          <h3 className="m3-title-medium text-xl font-medium mb-2">
            Personal Information
          </h3>
          <div className="space-y-2">
            <p className="m3-body-large text-gray-700">
              <strong>First Name:</strong> {data?.first_name}
            </p>
            <p className="m3-body-large text-gray-700">
              <strong>Last Name:</strong> {data?.last_name}
            </p>
            <p className="m3-body-large text-gray-700">
              <strong>Email:</strong> {data?.email}
            </p>
            <p className="m3-body-large text-gray-700">
              <strong>Username:</strong> {data?.username}
            </p>
          </div>
        </div>

        {/* Account Details */}
        <div>
          <h3 className="m3-title-medium text-xl font-medium mb-2">
            Account Details
          </h3>
          <div className="space-y-2">
            <p className="m3-body-large text-gray-700">
              <strong>User ID:</strong> {data?.user_id}
            </p>
            <p className="m3-body-large text-gray-700">
              <strong>Role:</strong> {data?.role}
            </p>
            <p className="m3-body-large text-gray-700">
              <strong>Level:</strong> {data?.level}
            </p>
            <p className="m3-body-large text-gray-700">
              <strong>Sector ID:</strong> {data?.sector_id}
            </p>
            <p className="m3-body-large text-gray-700">
              <strong>Last Seen:</strong>{" "}
              {new Date(data?.last_seen).toLocaleString()}
            </p>
            <p className="m3-body-large text-gray-700">
              <strong>Password Modified:</strong>{" "}
              {data?.password_modified_date || "Not Modified"}
            </p>
          </div>
        </div>
      </div>

      {/* Account Status */}
      <div className="mt-6  p-3">
        <h3 className="m3-title-medium text-xl font-medium mb-2">
          Account Status
        </h3>
        <p className="m3-body-large text-gray-700">
          <strong>Active:</strong> {data?.is_active ? "Yes" : "No"}
        </p>
      </div>

      {/* Additional Details */}
      <div className="mt-6  p-3">
        <h3 className="m3-title-medium text-xl font-medium mb-2">
          Additional Information
        </h3>
        <p className="m3-body-large text-gray-700">
          <strong>Extra:</strong> {data?.extra || "No additional information"}
        </p>
        <p className="m3-body-large text-gray-700">
          <strong>Created At:</strong>{" "}
          {new Date(data?.createdAt).toLocaleString()}
        </p>
        <p className="m3-body-large text-gray-700">
          <strong>Updated At:</strong>{" "}
          {new Date(data?.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default Account;

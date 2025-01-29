import React from "react";
import { fetchUsers } from "../apis/admin/fetchUsers";
import { jwtTokenState } from "../store/states";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import clsx from "clsx";

function AccountsOverview() {
  const jwtToken = useRecoilValue(jwtTokenState);
  console.log(!!jwtToken);
  const { data: users } = useQuery({
    queryKey: ["users", jwtToken],
    queryFn: () => fetchUsers(jwtToken),
    enabled: !!jwtToken,
    placeholderData: [],
  });
  return (
    <section className=" h-full flex flex-col">
      <header className="p-2">
        <h1>Users in your administrative body</h1>
      </header>
      <main className="w-full overflow-auto px-2">
        <div className="_table-wrapper overflow-x-auto max-w-full w-[calc(100dvw-74)]">
          <table className="table h-full border border-collapse overflow-visible">
            <thead className="sticky top-0 bg-gray-100">
              <tr>
                <TableHeadData data="ID" rowSpan="2" />
                <TableHeadData data="Username" rowSpan="2" />
                <TableHeadData data="Name" rowSpan="2" />
                <TableHeadData data="Email" rowSpan="2" />
                <TableHeadData data="Role" rowSpan="2" />
                <TableHeadData data="Jurisdiction" colSpan="3" />
                <TableHeadData data="Password " rowSpan="1" />
                <TableHeadData data="Updated At" rowSpan="2" />
              </tr>
              <tr>
                <TableHeadData data="Level" />
                <TableHeadData data="Wards" />
                <TableHeadData data="Departments" />
                <TableHeadData data="Modified At" />
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user?.id} className="p-1">
                  <TableData data={user?.id} className="text-right" />
                  <TableData data={user?.username} />
                  <TableData
                    data={user?.first_name + " " + user?.last_name}
                    className="capitalize"
                  />
                  <TableData data={user?.email} />
                  <TableData data={user?.role} />
                  <TableData data={user?.jurisdiction_level} />
                  <TableData data={user?.jurisdiction_wards} />
                  <TableData data={user?.jurisdiction_departments} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
}

export default AccountsOverview;

const TableData = (props) => {
  const { data, className, ...rest } = props;

  return (
    <td
      className={clsx(
        "px-2 text-nowrap whitespace-nowrap  border-slate-500",
        className
      )}
      {...rest}
    >
      {data}
    </td>
  );
};
const TableHeadData = (props) => {
  const { data, ...rest } = props;
  return (
    <th className="px-2 whitespace-nowrap font-medium" {...rest}>
      {data}
    </th>
  );
};

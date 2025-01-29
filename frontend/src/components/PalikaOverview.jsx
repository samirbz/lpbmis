import { palikaState } from "../store/states";
import React from "react";
import { use } from "react";
import { useRecoilValue } from "recoil";
import Button from "./material3/Button";

function PalikaOverview() {
  const palika = useRecoilValue(palikaState);
  return (
    <section className="py-2">
      <header className="p-2">
        <h2>
          <span className="m3-title-large">{palika?.name}</span>
        </h2>
      </header>
      <main className="px-2">
        <section className="flex flex-col gap-3">
          <section className="flex flex-col items-start justify-start gap-3 border border-blue-fair-300 bg-blue-fair-50  rounded-md  py-2">
            <header className="px-2 flex items-center justify-between w-full">
              <p>Address</p>
              <Button variant="filled" color="green-fair">
                <span className="material-symbols-outlined">edit</span>
              </Button>
            </header>
            <main className="flex items-center gap-2 px-2">
              <span>{palika?.address}</span>
            </main>
          </section>
          <section className="flex flex-col items-start justify-start gap-3 border border-blue-fair-300 bg-blue-fair-50  rounded-md  py-2">
            <header className="px-2 flex items-center justify-between w-full">
              <p>Wards</p>
              <Button variant="filled" color="green-fair">
                <span className="material-symbols-outlined">edit</span>
              </Button>
            </header>
            <main className="flex gap-2 flex-wrap px-2">
              {palika?.wards?.map((ward) => (
                <span
                  key={ward}
                  className="border block border-solid border-marigold-400 p-1 aspect-square rounded-full"
                >
                  {ward}
                </span>
              ))}
            </main>
          </section>
          <section className="flex flex-col items-start justify-start gap-3 border border-blue-fair-300 bg-blue-fair-50  rounded-md  py-2">
            <header className="px-2 flex items-center justify-between w-full">
              <p>Departments</p>
              <Button variant="filled" color="green-fair">
                <span className="material-symbols-outlined">edit</span>
              </Button>
            </header>

            <main className="px-2">
              <div className="flex flex-col justify-start items-start gap-2 flex-wrap">
                {palika?.Departments?.map((department) => (
                  <span
                    key={department?.name}
                    className="border block border-solid border-green-fair-700 py-1 px-2  rounded-full"
                  >
                    {department?.name}
                  </span>
                ))}
              </div>
            </main>
          </section>
          <section className="flex flex-col items-start justify-start gap-3 border border-blue-fair-300 bg-blue-fair-50  rounded-md  py-2">
            <header className="px-2 flex items-center justify-between w-full">
              <p>Strategy Codes</p>
              <Button variant="filled" color="green-fair">
                <span className="material-symbols-outlined">edit</span>
              </Button>
            </header>

            <main className="px-2">
              <div className="flex flex-col justify-start items-start gap-2 flex-wrap">
                <table>
                  <thead>
                    <th className="px-3">ID</th>
                    <th className="px-3">Code</th>
                    <th className="px-3">Label</th>
                  </thead>
                  <tbody>
                    {palika?.StrategyCodes?.map((StrategyCode) => (
                      <tr className="px-2" key={StrategyCode?.label}>
                        <td className=" py-1 px-3  ">{StrategyCode?.code}</td>
                        <td className=" py-1 px-3  ">{StrategyCode?.label}</td>
                        <td className=" py-1 px-3  ">{StrategyCode?.label}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </section>
        </section>
      </main>
    </section>
  );
}

export default PalikaOverview;

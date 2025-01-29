import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchProjectSummary } from "../apis/fetchProjectSummary";
import PieChart from "./PieChart";

function OverviewPage() {
  const {
    data: projectSummary,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projectSummary"],
    queryFn: () => fetchProjectSummary(),
  });
  return (
    <section className="w-full">
      <header className=" border-b sticky top-0 bg-white">
        <div className="px-3 py-3 flex justify-between items-center">
          <h1 className="m3-title-large w-full">Overview</h1>
          <div className="flex items-center justify-start text-on-surface">
            <div className="h-12 w-12 flex items-center justify-center">
              <span className="material-symbols-outlined cursor-pointer">
                more_vert
              </span>
            </div>
          </div>
        </div>
      </header>
      <main className="p-4 flex">
        <div className="_chart basis-1/2">
          {projectSummary && <PieChart data={projectSummary} />}
        </div>
      </main>
    </section>
  );
}

export default OverviewPage;

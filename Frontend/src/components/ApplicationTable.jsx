import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import clsx from "clsx";

const ApplicationTable = () => {
  const allAppliedJobs = useSelector((state) => state.job.allAppliedJobs || []);

  return (
    <div>
      <Table>
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <TableRow>
              <TableCell colSpan="4" className="text-center">
                You haven't applied for any job yet.
              </TableCell>
            </TableRow>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id}>
                <TableCell>
                  {appliedJob?.createdAt?.split("T")[0] || "N/A"}
                </TableCell>
                <TableCell>{appliedJob.job?.title || "N/A"}</TableCell>
                <TableCell>{appliedJob.job?.company?.name || "N/A"}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={clsx({
                      "bg-red-400": appliedJob?.status === "rejected",
                      "bg-gray-400": appliedJob?.status === "pending",
                      "bg-green-400": appliedJob?.status === "accepted",
                    })}
                  >
                    {appliedJob.status?.toUpperCase() || "N/A"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;

import React from "react";
import clsx from "clsx";

type SkeletonProps = {
  className?: string;
};

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={clsx("animate-pulse bg-gray-200 rounded-md", className)} />
  );
}

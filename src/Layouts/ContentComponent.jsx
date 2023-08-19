import React from "react";
import { Outlet } from "react-router-dom";

export default function ContentComponent() {
  return (
    <div className="p-2 sm:ml-64 h-screen bg-white">
      <div className="p-4">
          <Outlet/>
      </div>
    </div>
  );
}

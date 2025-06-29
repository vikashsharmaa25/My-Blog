import React from "react";

function StatsCard({ stat }: any) {
  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{stat.title}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-emerald-600 font-medium">
              {stat.change}
            </p>
          </div>
          <div className={`${stat.color} p-3 rounded-lg`}>
            <stat.icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;

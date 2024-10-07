import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Phone, PhoneOutgoing, Clock, Users } from "lucide-react";



const ChartCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-4 dashboard-title">{title}</h2>
    {children}
  </div>
);

const DashboardComponent = ({response}) => {

  const dailyCallsData = response?.week_data || [];
  const callDurationData = (response?.call_duration_data||[]).map((e) => ({
    name: e.name,
    avgDuration: e.average_duration,
  }));
  const MetricCard = ({ icon, title, value }) => (
    <div className="flex items-center space-x-2">
      <div className="text-blue-500">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
  const totalOutboundCalls = dailyCallsData.reduce(
    (acc, day) => acc + (day.outbound || 0),
    0
  );
  return (
    <div className="mx-auto ">
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <div className="flex flex-wrap justify-between items-center">
          <MetricCard
            icon={<Phone size={20} />}
            title="Total Calls"
            value={response?.total_calls||0}
          />
          <MetricCard
            icon={<PhoneOutgoing size={20} />}
            title="Outbound Calls"
            value={totalOutboundCalls}
          />
          <MetricCard
            icon={<Clock size={20} />}
            title="Avg. Call Duration"
            value={response?.average_call_duration || 0}
          />
          <MetricCard
            icon={<Users size={20} />}
            title="Active Agents"
            value={response?.total_agents || 0}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Daily Calls">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyCallsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inbound" fill="#8884d8" name="Inbound" />
              <Bar dataKey="outbound" fill="#82ca9d" name="Outbound" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Average Call Duration Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={callDurationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="avgDuration"
                stroke="#8884d8"
                name="Avg. Duration (s)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
};

export default DashboardComponent;

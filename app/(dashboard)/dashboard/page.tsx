import { Card } from "../components/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-lighter">Welcome back!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="Total Messages" value="128" change="+12%" trend="up" />
        <Card title="Active Polls" value="3" change="+1" trend="up" />
        <Card title="Response Rate" value="87%" change="-2%" trend="down" />
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 flex items-center justify-between">
      <div>
        <h3 className="text-gray-500">{title}</h3>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>

      <div className={`text-4xl ${color}`}>{icon}</div>
    </div>
  );
}

export default DashboardCard;

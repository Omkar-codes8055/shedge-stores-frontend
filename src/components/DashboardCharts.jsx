import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function DashboardCharts({ products }) {
  const COLORS = [
    "#3B82F6",
    "#22C55E",
    "#FACC15",
    "#EF4444",
    "#8B5CF6",
    "#F97316",
  ];

  // Category Data
  const categoryMap = {};

  products.forEach((product) => {
    categoryMap[product.category] = (categoryMap[product.category] || 0) + 1;
  });

  const categoryData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // Status Data
  const statusData = [
    {
      name: "Active",
      count: products.filter((p) => p.status === "Active").length,
    },
    {
      name: "Inactive",
      count: products.filter((p) => p.status === "Inactive").length,
    },
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-8">
      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-5">Products by Category</h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={categoryData} dataKey="value" outerRadius={100} label>
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-5">Product Status</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="count" fill="#2563EB" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardCharts;

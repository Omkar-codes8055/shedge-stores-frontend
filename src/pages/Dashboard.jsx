import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard from "../components/DashboardCard";
import { getProducts } from "../services/productApi";
import DashboardCharts from "../components/DashboardCharts";

import {
  FaBoxOpen,
  FaCheckCircle,
  FaTimesCircle,
  FaLayerGroup,
  FaWarehouse,
  FaRupeeSign,
  FaPlus,
  FaList,
  FaExclamationTriangle,
} from "react-icons/fa";

function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const activeProducts = products.filter((p) => p.status === "Active").length;

  const inactiveProducts = products.filter(
    (p) => p.status === "Inactive",
  ).length;

  const categories = [...new Set(products.map((p) => p.category))].length;

  const totalStock = products.reduce((sum, p) => sum + p.stockQuantity, 0);

  const inventoryValue = products.reduce(
    (sum, p) => sum + (p.finalPrice || 0) * p.stockQuantity,
    0,
  );

  const lowStockProducts = products.filter((p) => p.stockQuantity < 10);
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Welcome 👋</h1>

        <p className="text-gray-500 mt-2">
          Manage your products and monitor your store.
        </p>
      </div>

      {/* Dashboard Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <DashboardCard
          title="Total Products"
          value={products.length}
          icon={<FaBoxOpen />}
          color="text-blue-500"
        />

        <DashboardCard
          title="Active"
          value={activeProducts}
          icon={<FaCheckCircle />}
          color="text-green-500"
        />

        <DashboardCard
          title="Inactive"
          value={inactiveProducts}
          icon={<FaTimesCircle />}
          color="text-red-500"
        />

        <DashboardCard
          title="Categories"
          value={categories}
          icon={<FaLayerGroup />}
          color="text-purple-500"
        />

        <DashboardCard
          title="Total Stock"
          value={totalStock}
          icon={<FaWarehouse />}
          color="text-orange-500"
        />

        <DashboardCard
          title="Inventory Value"
          value={`₹${inventoryValue}`}
          icon={<FaRupeeSign />}
          color="text-yellow-500"
        />
      </div>

      {/* Quick Actions */}

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <a
          href="/add-product"
          className="bg-black text-white rounded-2xl p-6 shadow-xl hover:bg-yellow-500 hover:text-black transition"
        >
          <FaPlus className="text-3xl mb-3" />

          <h2 className="text-2xl font-bold">Add Product</h2>

          <p className="mt-2">Create a new product.</p>
        </a>

        <a
          href="/products"
          className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition"
        >
          <FaList className="text-3xl text-blue-500 mb-3" />

          <h2 className="text-2xl font-bold">View Products</h2>

          <p className="text-gray-500 mt-2">Browse and manage all products.</p>
        </a>
      </div>

      {/* Recent Products */}

      <div className="bg-white mt-8 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-5">Recent Products</h2>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3">Product</th>
              <th className="text-left p-3">Category</th>
              <th className="text-left p-3">Price</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {products.slice(0, 5).map((product) => (
              <tr key={product._id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{product.productName}</td>

                <td className="p-3">{product.category}</td>

                <td className="p-3">₹{product.finalPrice}</td>

                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white ${
                      product.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Low Stock */}

      <div className="bg-white mt-8 p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-3 mb-5">
          <FaExclamationTriangle className="text-yellow-500" />
          Low Stock Products
        </h2>

        {lowStockProducts.length === 0 ? (
          <p className="text-green-600">
            🎉 All products have sufficient stock.
          </p>
        ) : (
          lowStockProducts.map((product) => (
            <div
              key={product._id}
              className="flex justify-between border-b py-3"
            >
              <span>{product.productName}</span>

              <span className="text-red-500 font-bold">
                {product.stockQuantity} Left
              </span>
            </div>
          ))
        )}
        <DashboardCharts products={products} />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;

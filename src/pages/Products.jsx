import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { getProducts, deleteProduct } from "../services/productApi";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const productsPerPage = 5;

  useEffect(() => {
    loadProducts();
  }, [search, category, status, sortBy, currentPage]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const res = await getProducts({
        search,
        category,
        status,
        sortBy,
        page: currentPage,
        limit: productsPerPage,
      });

      const loadedProducts = res.data.products || [];

      setProducts(loadedProducts);
      setTotalPages(res.data.totalPages || 0);

      // Category options need all known categories.
      // This is temporary until categories get their own API.
      const categoryRes = await getProducts({ limit: 1000 });
      const allProducts = categoryRes.data.products || [];
      const uniqueCategories = [
        "All",
        ...new Set(
          allProducts.map((product) => product.category).filter(Boolean),
        ),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load products");
      setProducts([]);
      setTotalPages(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProduct(id);
      toast.success("Product deleted successfully");

      if (products.length === 1 && currentPage > 1) {
        setCurrentPage((page) => page - 1);
      } else {
        loadProducts();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-800">
            Product Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage all products in your store.
          </p>
        </div>

        <Link
          to="/add-product"
          className="mt-4 md:mt-0 bg-black text-white px-6 py-3 rounded-2xl hover:bg-yellow-500 hover:text-black transition font-semibold shadow-lg"
        >
          ➕ Add Product
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">
        <h2 className="text-xl font-bold mb-5">Search & Filters</h2>

        <div className="grid md:grid-cols-4 gap-5">
          <input
            type="text"
            placeholder="🔍 Search by product name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-xl p-4 focus:ring-2 focus:ring-yellow-500 outline-none"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-xl p-4 focus:ring-2 focus:ring-yellow-500 outline-none"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-xl p-4 focus:ring-2 focus:ring-yellow-500 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="border rounded-xl p-4 focus:ring-2 focus:ring-yellow-500 outline-none"
          >
            <option value="date">Created Date</option>
            <option value="name">Product Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
          <h2 className="text-3xl mb-3">📦</h2>
          <h2 className="text-2xl font-bold">No Products Found</h2>
          <p className="text-gray-500 mt-3">
            Try changing your search or add a new product.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            ⬅ Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="bg-black text-white px-5 py-2 rounded-xl hover:bg-yellow-500 hover:text-black transition disabled:opacity-40"
          >
            Next ➜
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}

export default Products;

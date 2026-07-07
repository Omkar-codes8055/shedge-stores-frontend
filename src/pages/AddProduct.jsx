import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DashboardLayout from "../layouts/DashboardLayout";
import { createProduct } from "../services/productApi";
import {
  FaBox,
  FaTags,
  FaBuilding,
  FaRupeeSign,
  FaWarehouse,
  FaAlignLeft,
  FaImage,
} from "react-icons/fa";

function AddProduct() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    brand: "",
    price: "",
    discountPercentage: 0,
    stockQuantity: "",
    description: "",
    productImage: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName) {
      return toast.error("Product Name is required");
    }

    if (!formData.category) {
      return toast.error("Category is required");
    }

    if (Number(formData.price) <= 0) {
      return toast.error("Price must be greater than 0");
    }

    if (Number(formData.stockQuantity) < 0) {
      return toast.error("Stock cannot be negative");
    }

    if (!formData.productImage) {
      return toast.error("Product Image is required");
    }

    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      await createProduct(data);

      toast.success("Product Added Successfully");

      navigate("/products");
    } catch (error) {
      toast.error("Failed to add product");
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Add New Product</h1>

        <p className="text-gray-500 mt-2">
          Fill in the details to add a new product to Shedge Stores.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8"
      >
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="mb-5">
            <label className="font-semibold mb-2 block">Product Name</label>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaBox className="text-gray-500 mr-3" />

              <input
                type="text"
                name="productName"
                placeholder="Enter Product Name"
                value={formData.productName}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="font-semibold mb-2 block">Category</label>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaTags className="text-gray-500 mr-3" />

              <input
                type="text"
                name="category"
                placeholder="Enter Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="font-semibold mb-2 block">Brand</label>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaBuilding className="text-gray-500 mr-3" />

              <input
                type="text"
                name="brand"
                placeholder="Enter Brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="font-semibold mb-2 block">Price</label>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaRupeeSign className="text-gray-500 mr-3" />

              <input
                type="number"
                name="price"
                placeholder="Enter Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="font-semibold mb-2 block">Discount (%)</label>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaRupeeSign className="text-gray-500 mr-3" />

              <input
                type="number"
                name="discountPercentage"
                placeholder="Discount Percentage"
                value={formData.discountPercentage}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="font-semibold mb-2 block">Stock Quantity</label>

            <div className="flex items-center border rounded-xl px-4 py-3">
              <FaWarehouse className="text-gray-500 mr-3" />

              <input
                type="number"
                name="stockQuantity"
                placeholder="Enter Stock"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="font-semibold mb-2 block">Description</label>

            <div className="flex items-start border rounded-xl px-4 py-3">
              <FaAlignLeft className="text-gray-500 mr-3 mt-1" />

              <textarea
                name="description"
                placeholder="Write Product Description..."
                rows="5"
                value={formData.description}
                onChange={handleChange}
                className="w-full outline-none resize-none"
              />
            </div>
          </div>
        </div>
        <div>
          <div className="bg-gray-50 rounded-3xl p-6 shadow-md h-full">
            <h2 className="text-2xl font-bold mb-6">Product Image</h2>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-black transition">
              <FaImage className="text-6xl text-gray-400 mx-auto mb-4" />

              <p className="text-gray-600 mb-4">
                Click below to upload an image
              </p>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];

                  setFormData({
                    ...formData,
                    productImage: file,
                  });

                  if (file) {
                    setPreview(URL.createObjectURL(file));
                  }
                }}
                className="w-full"
              />

              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-6 w-full h-80 object-cover rounded-2xl shadow-xl"
                />
              )}
            </div>
          </div>

          <div className="mb-5">
            <label className="font-semibold mb-2 block">Product Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 outline-none"
            >
              <option value="Active">🟢 Active</option>
              <option value="Inactive">🔴 Inactive</option>
            </select>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-yellow-500 hover:to-yellow-400 text-white hover:text-black font-bold py-4 rounded-2xl transition-all duration-300 shadow-xl text-lg"
            >
              ➕ Add Product
            </button>
          </div>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default AddProduct;

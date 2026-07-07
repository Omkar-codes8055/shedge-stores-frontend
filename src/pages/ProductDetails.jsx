import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getProductById } from "../services/productApi";
import toast from "react-hot-toast";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.data.product);
    } catch (error) {
      toast.error("Failed to load product");
    }
  };

  if (!product) {
    return (
      <DashboardLayout>
        <h2 className="text-center text-xl mt-10">Loading...</h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <img
            src={`${import.meta.env.VITE_API_URL}${product.productImage}`}
            alt={product.productName}
            className="w-full h-96 object-cover rounded-lg border"
          />

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>

            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Price:</strong> ₹{product.price}
            </p>
            <p>
              <strong>Discount:</strong> {product.discountPercentage}%
            </p>
            <p>
              <strong>Final Price:</strong> ₹{product.finalPrice}
            </p>
            <p>
              <strong>Stock:</strong> {product.stockQuantity}
            </p>
            <p>
              <strong>Status:</strong> {product.status}
            </p>

            <div className="mt-5">
              <h2 className="text-xl font-semibold mb-2">Description</h2>

              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ProductDetails;

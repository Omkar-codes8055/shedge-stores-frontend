import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function ProductCard({ product, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <img
        src={`http://localhost:5000${product.productImage}`}
        alt={product.productName}
        className="w-full h-48 object-cover rounded-lg"
      />

      <h2 className="text-xl font-bold mt-3">{product.productName}</h2>

      <p className="text-gray-600">{product.category}</p>

      <p className="text-sm">Stock: {product.stockQuantity}</p>

      <p className="text-gray-500 line-through">₹{product.price}</p>

      <p className="text-2xl font-bold text-green-600">₹{product.finalPrice}</p>

      <span className="bg-red-500 text-white px-2 py-1 rounded">
        {product.discountPercentage}% OFF
      </span>

      <p className="text-gray-500">{product.brand}</p>

      <p
        className={`mt-2 font-semibold ${
          product.status === "Active" ? "text-green-600" : "text-red-600"
        }`}
      >
        {product.status}
      </p>

      <div className="flex gap-3 mt-4">
        <Link to={`/product/${product._id}`} className="text-blue-600">
          <FaEye />
        </Link>

        <Link to={`/edit-product/${product._id}`} className="text-green-600">
          <FaEdit />
        </Link>

        <button onClick={() => onDelete(product._id)} className="text-red-600">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

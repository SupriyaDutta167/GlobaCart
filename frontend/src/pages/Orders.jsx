import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as cartAPI from '../services/cartAPI'; // <-- Fixed: Removed the "D"
import Loader from '../components/Loader';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        try {
          const res = await cartAPI.getOrderHistory(user.id);
          // Sort orders by most recent first
          setOrders(res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
          setError(err.message || 'Failed to fetch orders');
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="max-w-4xl mx-auto p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6">Your Orders</h2>
      
      {orders.length === 0 ? (
        <p className="text-xl text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-200 rounded-lg shadow-sm">
              <div className="bg-gray-50 p-4 flex justify-between items-center rounded-t-lg">
                <div>
                  <div className="text-sm text-gray-600">ORDER PLACED</div>
                  <div className="text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">TOTAL</div>
                  <div className="text-gray-800 font-bold">₹{order.totalPrice.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">ORDER #</div>
                  <div className="text-gray-800">{order.id}</div>
                </div>
              </div>
              <div className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">{order.status}</h3>
                <p className="text-gray-700">
                  Shipping to: {order.shippingName}, {order.shippingAddressLine1}, {order.shippingCity} {order.shippingPostalCode}
                </p>
                {order.items.map(item => (
                  <div key={item.id} className="flex items-center gap-4 py-2 border-b last:border-b-0">
                    <div className="flex-1">
                      <div className="font-medium">{item.productName}</div>
                      <div className="text-sm text-gray-600">Qty: {item.quantity}</div>
                      <div className="text-sm text-gray-600">Price: ₹{item.priceAtPurchase.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


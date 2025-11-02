import React from 'react';

export default function CartItem({ item, onUpdate, onRemove }) {
  
  // The 'item' prop is now a CartItemDTO
  // It has 'quantity' and 'product' fields
  const { product, quantity } = item;

  // Use discount price if available, otherwise original price
  const price = product.discountPrice || product.originalPrice;

  return (
    <div className="flex items-center gap-4 border-b py-3">
      <img 
        src={product.imageUrl || 'https://placehold.co/100x100/eee/ccc?text=No+Image'} 
        alt={product.name} 
        className="w-20 h-20 object-cover rounded" 
      />
      <div className="flex-1">
        <div className="font-semibold">{product.name}</div>
        <div className="text-sm text-gray-600">{product.company}</div>
        <div className="text-lg font-medium mt-1">₹{price.toFixed(2)}</div>
      </div>
      <div className="flex items-center gap-2">
        <input 
          type="number" 
          min="1" 
          max={product.quantity} // Max is stock
          value={quantity} // <-- MODIFIED: from item.qty
          onChange={(e) => onUpdate(product.id, Number(e.target.value))} 
          className="w-16 p-1 border rounded" 
        />
        <button 
          onClick={() => onRemove(product.id)} 
          className="px-3 py-1 border border-red-300 text-red-600 rounded hover:bg-red-50"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

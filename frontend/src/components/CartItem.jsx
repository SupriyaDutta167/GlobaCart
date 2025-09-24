import React from 'react';

export default function CartItem({ item, onUpdate, onRemove }) {
  return (
    <div className="flex items-center gap-4 border-b py-3">
      <img src={item.product.imageUrl || '/assets/no-image.png'} alt={item.product.name} className="w-20 h-20 object-cover" />
      <div className="flex-1">
        <div className="font-semibold">{item.product.name}</div>
        <div className="text-sm">₹{item.product.price}</div>
      </div>
      <div className="flex items-center gap-2">
        <input type="number" min="1" value={item.qty} onChange={(e) => onUpdate(item.product.id, Number(e.target.value))} className="w-16 p-1 border" />
        <button onClick={() => onRemove(item.product.id)} className="px-3 py-1 border rounded">Remove</button>
      </div>
    </div>
  );
}

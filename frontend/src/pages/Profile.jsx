import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  if (!user) return <div>Loading profile…</div>;

  return (
    <div className="max-w-md mx-auto border p-4 rounded">
      <h2 className="text-2xl mb-3">Profile</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Address:</strong> {user.address || '-'}</div>
    </div>
  );
}

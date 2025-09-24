import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-8">
      <div className="container mx-auto p-4 text-center text-sm">
        © {new Date().getFullYear()} GlobaCart — cultural goods marketplace.
      </div>
    </footer>
  );
}

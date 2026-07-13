import { useState } from "react";

function Dashboard() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {/* دکمه باز کردن */}
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Modal
      </button>

      {/* خود مدال */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-bold mb-4">Simple Modal</h2>
            <p className="mb-4">This is the simplest modal example.</p>

            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;

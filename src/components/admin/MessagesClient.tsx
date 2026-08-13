"use client";

import { useState } from "react";
import { ContactMessage } from "@prisma/client";
import { Search, Eye, Trash2, Mail, MailOpen } from "lucide-react";
import Swal from "sweetalert2";
import { deleteMessageAction, bulkDeleteMessagesAction, markMessageReadAction } from "@/app/actions/contact";

export default function MessagesClient({ initialMessages }: { initialMessages: ContactMessage[] }) {
  const [messages, setMessages] = useState(initialMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const filteredMessages = messages.filter((msg) =>
    msg.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredMessages.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0FA877",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      const res = await deleteMessageAction(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        Swal.fire("Deleted!", "Message has been deleted.", "success");
      } else {
        Swal.fire("Error!", res.error || "Failed to delete", "error");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedIds.length} messages.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0FA877",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete them!"
    });

    if (result.isConfirmed) {
      const res = await bulkDeleteMessagesAction(selectedIds);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => !selectedIds.includes(m.id)));
        setSelectedIds([]);
        Swal.fire("Deleted!", "Messages have been deleted.", "success");
      } else {
        Swal.fire("Error!", res.error || "Failed to delete", "error");
      }
    }
  };

  const handleView = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);

    if (!msg.isRead) {
      const res = await markMessageReadAction(msg.id);
      if (res.success) {
        setMessages((prev) =>
          prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
        );
      }
    }
  };

  return (
    <div>
      {/* Search and Bulk Actions */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 bg-white p-4 rounded-md shadow-sm border border-gray-100">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700">
            <input
              type="checkbox"
              onChange={handleSelectAll}
              checked={selectedIds.length === filteredMessages.length && filteredMessages.length > 0}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            Select All
          </label>

          {selectedIds.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100 font-bold text-sm transition-colors"
            >
              <Trash2 size={16} />
              Delete Selected ({selectedIds.length})
            </button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {filteredMessages.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white rounded-md border border-gray-100">
          No messages found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className={`bg-white p-6 rounded-md shadow-sm border transition-all ${msg.isRead ? 'border-gray-100' : 'border-primary/50 shadow-primary/10'}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(msg.id)}
                    onChange={() => handleSelectOne(msg.id)}
                    className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                  />
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.isRead ? 'bg-gray-100 text-gray-500' : 'bg-primary/10 text-primary'}`}>
                    {msg.isRead ? <MailOpen size={18} /> : <Mail size={18} />}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 truncate max-w-[150px]" title={msg.name}>{msg.name}</h3>
                    <p className="text-xs text-gray-500 truncate max-w-[150px]" title={msg.email}>{msg.email}</p>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                  {new Date(msg.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-800 mb-2 truncate" title={msg.subject}>{msg.subject}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{msg.message}</p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleView(msg)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 text-sm font-bold rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Eye size={14} /> View
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 text-sm font-bold rounded-md hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      {isModalOpen && selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-md w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">Message Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded-md hover:bg-gray-300 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 md:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Sender Name</p>
                  <p className="font-semibold text-gray-900 text-lg">{selectedMessage.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="font-semibold text-gray-900 text-lg">
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">{selectedMessage.email}</a>
                  </p>
                </div>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Subject</p>
                <p className="font-semibold text-gray-900 text-lg">{selectedMessage.subject}</p>
              </div>
              
              <div className="border-t border-gray-100 pt-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Message Content</p>
                <div className="bg-gray-50 p-5 rounded-md border border-gray-100 text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 font-bold rounded-md hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

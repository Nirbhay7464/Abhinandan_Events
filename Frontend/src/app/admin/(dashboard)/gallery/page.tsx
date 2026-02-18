"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, Video, Trash2, Plus, Upload, Link as LinkIcon } from "lucide-react";

type GalleryItem = {
  id: number;
  type: "image" | "video";
  mediaUrl: string;
};

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [type, setType] = useState<"image" | "video">("image");
  const [mediaUrl, setMediaUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("admin_token")
      : null;

  /* LOAD GALLERY */
  const loadGallery = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Failed to load gallery");
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  /* FILE → BASE64 */
  const convertToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  /* ADD MEDIA */
  const addItem = async () => {
    if (!token) return alert("Not authenticated");

    let finalMediaUrl = mediaUrl;

    if (type === "image") {
      if (!file) return alert("Please select an image");
      finalMediaUrl = await convertToBase64(file);
    } else {
      if (!mediaUrl) return alert("Video URL required");
    }

    setLoading(true);

    try {
      await fetch("http://localhost:5000/api/admin/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          mediaUrl: finalMediaUrl,
        }),
      });

      setMediaUrl("");
      setFile(null);
      loadGallery();
    } catch (error) {
      alert("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  /* DELETE */
  const deleteItem = async (id: number) => {
    if (!token || !confirm("Delete this item permanently?")) return;

    await fetch(`http://localhost:5000/api/admin/gallery/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
        <p className="text-sm text-gray-500">Upload images and link videos for your public gallery</p>
      </div>

      {/* ADD MEDIA FORM */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b">
          <Plus size={18} className="text-blue-600" />
          <h2 className="font-semibold text-gray-700">Add New Media</h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Type Selector */}
          <div className="w-full md:w-48">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Media Type</label>
            <div className="relative">
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value as "image" | "video");
                  setFile(null);
                  setMediaUrl("");
                }}
                className="w-full border border-gray-200 px-4 py-2 rounded-lg text-gray-900 bg-gray-50 font-medium focus:ring-2 focus:ring-blue-100 outline-none appearance-none"
              >
                <option value="image">Image File</option>
                <option value="video">Video Link</option>
              </select>
            </div>
          </div>

          {/* Input Area */}
          <div className="flex-1">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Source</label>
            {type === "image" ? (
              <div className="relative group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full border border-gray-200 px-4 py-1.5 rounded-lg bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-100 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                />
              </div>
            ) : (
              <div className="relative">
                <LinkIcon size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  placeholder="Paste YouTube or MP4 URL"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  className="w-full border border-gray-200 pl-10 pr-4 py-2 rounded-lg bg-white text-gray-900 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="flex items-end">
            <button
              onClick={addItem}
              disabled={loading}
              className="w-full md:w-auto bg-[#2563EB] text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-blue-300 transition-all flex items-center justify-center gap-2 h-[42px]"
            >
              {loading ? "Processing..." : (
                <>
                  <Upload size={18} />
                  Upload
                </>
              )}
            </button>
          </div>
        </div>

        {/* IMAGE PREVIEW AREA */}
        {type === "image" && file && (
          <div className="pt-2">
            <div className="relative w-32 h-32 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden group">
               <img
                src={URL.createObjectURL(file)}
                className="w-full h-full object-cover"
                alt="Preview"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="text-[10px] text-white font-bold">PREVIEW</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* GALLERY GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            {item.type === "image" ? (
              <img
                src={item.mediaUrl}
                loading="lazy"
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="relative h-48 bg-gray-900 flex items-center justify-center">
                <video
                  src={item.mediaUrl}
                  className="h-full w-full object-cover opacity-60"
                />
                <Video size={32} className="absolute text-white/80 group-hover:scale-110 transition-transform" />
              </div>
            )}

            {/* Type Badge */}
            <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
              {item.type}
            </div>

            {/* Hover Actions */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                onClick={() => deleteItem(item.id)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg shadow-lg transition-all"
                title="Delete Media"
                >
                <Trash2 size={16} />
                </button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
           <ImageIcon size={48} className="text-gray-200 mb-2" />
           <p className="text-gray-400 font-medium">Your gallery is currently empty</p>
        </div>
      )}
    </div>
  );
}
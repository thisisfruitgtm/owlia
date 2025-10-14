"use client";

import { useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface Props {
  clientId: string;
  onUploadSuccess: () => void;
}

export default function FileUploadSection({ clientId, onUploadSuccess }: Props) {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
      setError("");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError("");
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("clientId", clientId);

      const response = await fetch("/api/files/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Eroare la încărcarea fișierului");
      }

      setSelectedFile(null);
      onUploadSuccess();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all
          ${dragActive ? "border-navy bg-navy/5" : "border-gray-light"}
          ${selectedFile ? "bg-green-50 border-green-200" : ""}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!selectedFile ? (
          <>
            <Upload size={48} className="mx-auto mb-4 text-gray" />
            <p className="text-lg font-semibold text-navy mb-2">
              Drag & drop sau selectează fișier
            </p>
            <p className="text-sm text-gray mb-4">
              PDF, JPG, PNG, DOCX (max 10MB)
            </p>
            <label>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png,.docx,.doc"
                onChange={handleFileSelect}
                disabled={uploading}
              />
              <span className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-xl hover:bg-navy/90 transition-smooth font-semibold cursor-pointer">
                <FileText size={18} />
                Selectează Fișier
              </span>
            </label>
          </>
        ) : (
          <div className="flex items-center justify-between bg-white p-4 rounded-lg">
            <div className="flex items-center gap-3">
              <FileText size={24} className="text-navy" />
              <div className="text-left">
                <p className="font-semibold text-navy">{selectedFile.name}</p>
                <p className="text-sm text-gray">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
              disabled={uploading}
            >
              <X size={20} className="text-gray" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      {selectedFile && (
        <Button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Se încarcă...
            </>
          ) : (
            <>
              <Upload size={18} />
              Încarcă Fișier
            </>
          )}
        </Button>
      )}
    </div>
  );
}


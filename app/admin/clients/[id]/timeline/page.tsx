"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

interface Timeline {
  id: string;
  month: number;
  milestone: string;
  description: string | null;
  status: string;
  dueDate: string | null;
  completedAt: string | null;
}

export default function AdminTimelineEditor() {
  const params = useParams();
  const [timeline, setTimeline] = useState<Timeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    month: 1,
    milestone: "",
    description: "",
    status: "PENDING",
    dueDate: "",
  });

  useEffect(() => {
    fetchTimeline();
  }, [params.id]);

  const fetchTimeline = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${params.id}/timeline`);
      const data = await response.json();
      setTimeline(data.timeline || []);
    } catch (error) {
      console.error("Error fetching timeline:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(`/api/admin/clients/${params.id}/timeline`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({
          month: 1,
          milestone: "",
          description: "",
          status: "PENDING",
          dueDate: "",
        });
        fetchTimeline();
      }
    } catch (error) {
      console.error("Error adding milestone:", error);
    }
  };

  const handleUpdate = async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/admin/clients/${params.id}/timeline/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setEditingId(null);
        fetchTimeline();
      }
    } catch (error) {
      console.error("Error updating milestone:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sigur vrei să ștergi acest milestone?")) return;

    try {
      const response = await fetch(`/api/admin/clients/${params.id}/timeline/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchTimeline();
      }
    } catch (error) {
      console.error("Error deleting milestone:", error);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "IN_PROGRESS":
        return "info";
      case "DELAYED":
        return "warning";
      default:
        return "default";
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center py-12">Se încarcă...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/admin/clients/${params.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
          >
            <ArrowLeft size={24} className="text-navy" />
          </Link>
          <h1 className="text-3xl font-bold text-navy">Editor Timeline</h1>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Adaugă Milestone
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl p-6 border border-gray-light">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-navy">Milestone Nou</h3>
            <button
              onClick={() => setShowAddForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
            >
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Luna (1-12)"
              value={formData.month}
              onChange={(e) =>
                setFormData({ ...formData, month: parseInt(e.target.value) })
              }
              min={1}
              max={12}
            />
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="px-4 py-3 border border-gray-light rounded-xl focus:outline-none focus:ring-2 focus:ring-navy/20"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="DELAYED">Delayed</option>
            </select>
            <Input
              type="text"
              placeholder="Titlu milestone"
              value={formData.milestone}
              onChange={(e) =>
                setFormData({ ...formData, milestone: e.target.value })
              }
              className="col-span-2"
            />
            <Input
              type="text"
              placeholder="Descriere"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="col-span-2"
            />
            <Input
              type="date"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
            />
          </div>
          <div className="flex gap-3 mt-4">
            <Button onClick={handleAdd} className="flex-1">
              <Save size={18} />
              Salvează
            </Button>
            <button
              onClick={() => setShowAddForm(false)}
              className="flex-1 px-4 py-3 border border-gray-light rounded-xl font-semibold hover:bg-gray-50"
            >
              Anulează
            </button>
          </div>
        </div>
      )}

      {/* Timeline List */}
      <div className="space-y-4">
        {timeline.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl p-6 border border-gray-light"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray bg-gray-100 px-3 py-1 rounded-full">
                  Luna {item.month}
                </span>
                <Badge variant={getStatusVariant(item.status) as any}>
                  {item.status}
                </Badge>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    handleUpdate(item.id, {
                      status:
                        item.status === "COMPLETED" ? "PENDING" : "COMPLETED",
                    })
                  }
                  className="px-3 py-1 text-sm bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-smooth"
                >
                  {item.status === "COMPLETED" ? "Reopen" : "Complete"}
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-smooth"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>
            <h3 className="text-xl font-bold text-navy mb-2">
              {item.milestone}
            </h3>
            {item.description && (
              <p className="text-gray mb-3">{item.description}</p>
            )}
            {item.dueDate && (
              <p className="text-sm text-gray">
                Due: {new Date(item.dueDate).toLocaleDateString("ro-RO")}
              </p>
            )}
          </div>
        ))}
      </div>

      {timeline.length === 0 && !showAddForm && (
        <div className="bg-white rounded-xl p-12 border border-gray-light text-center">
          <p className="text-gray mb-4">Niciun milestone încă</p>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus size={18} />
            Adaugă Primul Milestone
          </Button>
        </div>
      )}
    </div>
  );
}


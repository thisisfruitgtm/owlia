import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";
import { FolderOpen, FileText, Download, Calendar, User } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientFilesPage({ params }: Props) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: {
      files: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!client) {
    redirect("/auth/login");
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    // Simple icon based on type
    return <FileText size={24} className="text-navy" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-light">
        <h1 className="text-3xl font-bold text-navy mb-2">Fișiere</h1>
        <p className="text-gray">
          Toate materialele și documentele proiectului tău
        </p>
      </div>

      {/* Files List */}
      {client.files.length === 0 ? (
        <div className="bg-white rounded-xl p-12 border border-gray-light text-center">
          <FolderOpen size={64} className="mx-auto mb-4 text-gray opacity-30" />
          <h3 className="text-xl font-bold text-navy mb-2">
            Niciun fișier încă
          </h3>
          <p className="text-gray">
            Fișierele tale (logo-uri, materiale grafice, documente) vor apărea aici
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {client.files.map((file: any) => (
            <div
              key={file.id}
              className="bg-white rounded-xl p-6 border border-gray-light hover:border-navy/20 transition-smooth group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-navy/5 rounded-xl group-hover:bg-navy/10 transition-smooth">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-navy truncate mb-1" title={file.name}>
                    {file.name}
                  </h3>
                  <p className="text-sm text-gray">{formatFileSize(file.size)}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray">
                  <Calendar size={14} />
                  <span>
                    {new Date(file.createdAt).toLocaleDateString("ro-RO", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray">
                  <User size={14} />
                  <span>Încărcat de echipa OWLIA</span>
                </div>
              </div>

              <a
                href={`/api/files/${file.id}/download`}
                download
                className="w-full flex items-center justify-center gap-2 bg-navy text-white px-4 py-2 rounded-xl hover:bg-navy/90 transition-smooth font-semibold"
              >
                <Download size={18} />
                Download
              </a>
            </div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-navy mb-2">
          Despre Fișiere
        </h3>
        <p className="text-gray mb-3">
          În această secțiune vei găsi toate materialele create pentru proiectul tău:
        </p>
        <ul className="list-disc list-inside text-gray space-y-1">
          <li>Logo-uri și elemente de brand identity</li>
          <li>Materiale grafice pentru social media</li>
          <li>Rapoarte lunare de performanță</li>
          <li>Documente tehnice și ghiduri</li>
          <li>Orice alte materiale relevante</li>
        </ul>
      </div>
    </div>
  );
}


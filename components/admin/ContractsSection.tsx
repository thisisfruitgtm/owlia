"use client";

import { useState } from "react";
import { FileText, Download, Plus, Loader2, Check, X } from "lucide-react";
import Button from "@/components/ui/Button";

interface Contract {
  id: string;
  data: {
    contractNumber?: string;
    title?: string;
    [key: string]: any;
  };
  status: string;
  createdAt: string;
}

interface Props {
  clientId: string;
  contracts: Contract[];
}

type GenerationStep = 
  | "idle" 
  | "preparing" 
  | "generating-pdf" 
  | "saving" 
  | "sending-email" 
  | "success" 
  | "error";

export default function ContractsSection({ clientId, contracts: initialContracts }: Props) {
  const [contracts, setContracts] = useState(initialContracts);
  const [generationStep, setGenerationStep] = useState<GenerationStep>("idle");
  const [error, setError] = useState("");
  const [generatedContract, setGeneratedContract] = useState<any>(null);

  const getStepMessage = (step: GenerationStep): string => {
    switch (step) {
      case "preparing":
        return "Pregătire date contract...";
      case "generating-pdf":
        return "Generare PDF (poate dura 10-15 secunde)...";
      case "saving":
        return "Salvare în baza de date...";
      case "sending-email":
        return "Trimitere notificare email...";
      case "success":
        return "Contract generat cu succes!";
      case "error":
        return "Eroare la generare contract";
      default:
        return "";
    }
  };

  const handleGenerateContract = async () => {
    setGenerationStep("preparing");
    setError("");
    setGeneratedContract(null);

    try {
      // Step 1: Prepare
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Step 2: Generate PDF
      setGenerationStep("generating-pdf");
      const response = await fetch("/api/admin/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to generate contract");
      }

      const { contract } = await response.json();
      setGeneratedContract(contract);

      // Step 3: Saving (already done by API, just show message)
      setGenerationStep("saving");
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 4: Email sent (already done by API)
      setGenerationStep("sending-email");
      await new Promise(resolve => setTimeout(resolve, 500));

      // Step 5: Success
      setGenerationStep("success");

      // Reload contracts
      const contractsResponse = await fetch(`/api/admin/contracts?clientId=${clientId}`);
      const { contracts: updatedContracts } = await contractsResponse.json();
      setContracts(updatedContracts);

      // Reset after 3 seconds
      setTimeout(() => {
        setGenerationStep("idle");
      }, 3000);
    } catch (err: any) {
      setError(err.message);
      setGenerationStep("error");
      
      // Reset after 5 seconds
      setTimeout(() => {
        setGenerationStep("idle");
      }, 5000);
    }
  };

  const handleDownload = (contractId: string) => {
    window.open(`/api/admin/contracts/${contractId}/download`, "_blank");
  };

  return (
    <div className="bg-white rounded-xl border border-gray-light overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-light flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="text-navy" size={20} />
          <h2 className="text-xl font-bold text-navy">Contracte</h2>
        </div>
        <Button
          onClick={handleGenerateContract}
          disabled={generationStep !== "idle" && generationStep !== "success"}
          className="flex items-center gap-2"
        >
          {generationStep === "idle" ? (
            <>
              <Plus size={16} />
              Generează Contract
            </>
          ) : generationStep === "success" ? (
            <>
              <Check size={16} />
              Generat!
            </>
          ) : generationStep === "error" ? (
            <>
              <X size={16} />
              Eroare
            </>
          ) : (
            <>
              <Loader2 size={16} className="animate-spin" />
              Generare...
            </>
          )}
        </Button>
      </div>

      {/* Progress Messages */}
      {generationStep !== "idle" && (
        <div className={`mx-6 mt-4 p-4 border-l-4 text-sm rounded ${
          generationStep === "success" 
            ? "bg-green-50 border-green-500 text-green-700"
            : generationStep === "error"
            ? "bg-red-50 border-red-500 text-red-700"
            : "bg-blue-50 border-blue-500 text-blue-700"
        }`}>
          <div className="flex items-center gap-3">
            {generationStep === "success" ? (
              <Check size={20} className="flex-shrink-0" />
            ) : generationStep === "error" ? (
              <X size={20} className="flex-shrink-0" />
            ) : (
              <Loader2 size={20} className="animate-spin flex-shrink-0" />
            )}
            <div>
              <div className="font-semibold">{getStepMessage(generationStep)}</div>
              {generationStep === "generating-pdf" && (
                <div className="text-xs mt-1 opacity-75">
                  Puppeteer generează PDF-ul... Te rog așteaptă.
                </div>
              )}
              {generationStep === "success" && generatedContract && (
                <div className="text-xs mt-1 opacity-75">
                  Contract #{generatedContract.contractNumber} • Clientul a primit email
                </div>
              )}
              {generationStep === "error" && error && (
                <div className="text-xs mt-1 opacity-75">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="p-6">
        {contracts.length === 0 ? (
          <div className="text-center py-12 text-gray">
            <FileText size={48} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg mb-2">Niciun contract generat încă</p>
            <p className="text-sm">Generează primul contract pentru acest client</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-smooth"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-navy/10 rounded-lg">
                    <FileText className="text-navy" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">
                      {contract.data.title || 'Contract'}
                    </h3>
                    <p className="text-sm text-gray">
                      Nr. {contract.data.contractNumber || 'N/A'}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          contract.status === "SIGNED"
                            ? "bg-green-100 text-green-600"
                            : contract.status === "SENT"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {contract.status}
                      </span>
                      <span className="text-xs text-gray">
                        {new Date(contract.createdAt).toLocaleDateString('ro-RO')}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleDownload(contract.id)}
                  className="flex items-center gap-2"
                  variant="secondary"
                >
                  <Download size={16} />
                  Descarcă
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


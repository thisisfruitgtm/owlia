"use client";

import { useState } from "react";
import { FileText, Download, Plus, Loader2, Check, X, Receipt } from "lucide-react";
import Button from "@/components/ui/Button";
import ContractPreviewModal from "./ContractPreviewModal";
import EmitInvoiceModal from "./EmitInvoiceModal";

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
  clientName: string;
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

export default function ContractsSection({ clientId, clientName, contracts: initialContracts }: Props) {
  const [contracts, setContracts] = useState(initialContracts);
  const [generationStep, setGenerationStep] = useState<GenerationStep>("idle");
  const [error, setError] = useState("");
  const [generatedContract, setGeneratedContract] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEmitInvoice, setShowEmitInvoice] = useState(false);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);

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

  const handleGenerateContract = () => {
    setShowPreview(true);
  };

  const handleContractGenerated = async (contract: any) => {
    setGeneratedContract(contract);
    
    // Reload contracts
    const contractsResponse = await fetch(`/api/admin/contracts?clientId=${clientId}`);
    const { contracts: updatedContracts } = await contractsResponse.json();
    setContracts(updatedContracts);
  };

  const handleDownload = (contractId: string) => {
    window.open(`/api/admin/contracts/${contractId}/download`, "_blank");
  };

  const handleEmitInvoice = (contractId: string) => {
    setSelectedContractId(contractId);
    setShowEmitInvoice(true);
  };

  const handleInvoiceEmited = (invoice: any) => {
    // Refresh contracts or show success message
    console.log("Invoice emited:", invoice);
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
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Generează Contract
        </Button>
      </div>


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
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEmitInvoice(contract.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-smooth font-semibold text-sm"
                  >
                    <Receipt size={16} />
                    Emite Factură
                  </button>
                  <Button
                    onClick={() => handleDownload(contract.id)}
                    className="flex items-center gap-2"
                    variant="secondary"
                  >
                    <Download size={16} />
                    Descarcă
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <ContractPreviewModal
          clientId={clientId}
          onClose={() => setShowPreview(false)}
          onContractGenerated={handleContractGenerated}
        />
      )}

      {/* Emit Invoice Modal */}
      {showEmitInvoice && (
        <EmitInvoiceModal
          clientId={clientId}
          clientName={clientName}
          contractId={selectedContractId || undefined}
          onClose={() => {
            setShowEmitInvoice(false);
            setSelectedContractId(null);
          }}
          onSuccess={handleInvoiceEmited}
        />
      )}
    </div>
  );
}


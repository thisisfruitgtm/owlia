"use client";

import { useState, useEffect } from "react";
import { X, Save, Mail, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";

interface Props {
  clientId: string;
  onClose: () => void;
  onContractGenerated: (contract: any) => void;
}

export default function ContractPreviewModal({
  clientId,
  onClose,
  onContractGenerated,
}: Props) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [htmlContent, setHtmlContent] = useState("");
  const [clientData, setClientData] = useState<any>(null);
  const [generatedContractId, setGeneratedContractId] = useState<string | null>(null);
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);

  useEffect(() => {
    loadPreview();
  }, [clientId]);

  const loadPreview = async () => {
    try {
      // Fetch client data
      const response = await fetch(`/api/admin/clients/${clientId}`);
      const { client } = await response.json();
      setClientData(client);

      // Generate preview HTML
      const previewHtml = generatePreviewHtml(client);
      setHtmlContent(previewHtml);
    } catch (error) {
      console.error("Error loading preview:", error);
      alert("Eroare la încărcarea preview-ului");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const generatePreviewHtml = (client: any) => {
    const contractNumber = `OWLIA-${Date.now()}`;
    const contractDate = new Date().toLocaleDateString("ro-RO");

    return `
<div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px;">
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 40px;">
    <h1 style="color: #00288B; font-size: 32px; margin: 0 0 10px 0;">OWLIA</h1>
    <p style="color: #666666; margin: 0;">Branding & Marketing Digital</p>
  </div>

  <!-- Contract Title -->
  <div style="text-align: center; margin-bottom: 40px;">
    <h2 style="color: #1A1A1A; font-size: 24px; margin: 0 0 10px 0;">CONTRACT DE PRESTĂRI SERVICII</h2>
    <p style="color: #666666; margin: 0;">Nr. ${contractNumber}</p>
    <p style="color: #666666; margin: 0;">Data: ${contractDate}</p>
  </div>

  <!-- Parties -->
  <div style="margin-bottom: 30px;">
    <h3 style="color: #00288B; font-size: 18px; margin: 0 0 15px 0;">PĂRȚILE CONTRACTANTE</h3>
    
    <div style="margin-bottom: 20px;">
      <p style="margin: 0 0 10px 0; color: #1A1A1A;"><strong>1. PRESTATOR:</strong></p>
      <p style="margin: 0 0 5px 0; color: #666666;">OWLIA S.R.L.</p>
      <p style="margin: 0 0 5px 0; color: #666666;">CUI: RO[completează]</p>
      <p style="margin: 0 0 5px 0; color: #666666;">Adresa: [completează adresa]</p>
      <p style="margin: 0 0 5px 0; color: #666666;">Reprezentant legal: [completează]</p>
    </div>

    <div style="margin-bottom: 20px;">
      <p style="margin: 0 0 10px 0; color: #1A1A1A;"><strong>2. CLIENT:</strong></p>
      <p style="margin: 0 0 5px 0; color: #666666;"><strong>${client.companyName || client.name}</strong></p>
      <p style="margin: 0 0 5px 0; color: #666666;">CUI: ${client.cui || "RO[completează CUI]"}</p>
      <p style="margin: 0 0 5px 0; color: #666666;">Reg. Com.: ${client.regCom || "[completează Reg. Com.]"}</p>
      <p style="margin: 0 0 5px 0; color: #666666;">Adresa: ${client.address || "[completează adresa]"}</p>
      <p style="margin: 0 0 5px 0; color: #666666;">Email: ${client.user.email}</p>
      <p style="margin: 0 0 5px 0; color: #666666;">Telefon: ${client.phone || "[completează]"}</p>
      <p style="margin: 0 0 5px 0; color: #666666;">Reprezentant legal: ${client.legalRepName || "[completează]"}, ${client.legalRepRole || "[funcție]"}</p>
    </div>
  </div>

  <!-- Services -->
  <div style="margin-bottom: 30px;">
    <h3 style="color: #00288B; font-size: 18px; margin: 0 0 15px 0;">OBIECTUL CONTRACTULUI</h3>
    <p style="color: #666666; line-height: 1.6; margin: 0 0 15px 0;">
      Prin prezentul contract, PRESTATORUL se obligă să furnizeze CLIENTULUI serviciile de branding și marketing digital 
      conform pachetului <strong>${client.package?.name || "Standard"}</strong>.
    </p>
    
    ${client.package ? `
    <div style="background-color: #F5F5F0; padding: 20px; border-radius: 8px; margin-top: 15px;">
      <p style="margin: 0 0 10px 0; color: #1A1A1A;"><strong>Pachet: ${client.package.name}</strong></p>
      <p style="margin: 0 0 10px 0; color: #666666;">Valoare: ${client.package.price.toLocaleString('ro-RO')} RON</p>
      <p style="margin: 0; color: #666666;">Industrie: ${client.industry}</p>
    </div>
    ` : ''}
  </div>

  <!-- Terms -->
  <div style="margin-bottom: 30px;">
    <h3 style="color: #00288B; font-size: 18px; margin: 0 0 15px 0;">DURATA ȘI VALOAREA CONTRACTULUI</h3>
    <p style="color: #666666; line-height: 1.6; margin: 0 0 10px 0;">
      <strong>Durată:</strong> 12 luni de la data semnării
    </p>
    <p style="color: #666666; line-height: 1.6; margin: 0;">
      <strong>Valoare totală:</strong> ${client.package ? client.package.price.toLocaleString('ro-RO') : '[completează]'} RON (fără TVA)
    </p>
  </div>

  <!-- Payment Terms -->
  <div style="margin-bottom: 30px;">
    <h3 style="color: #00288B; font-size: 18px; margin: 0 0 15px 0;">MODALITĂȚI DE PLATĂ</h3>
    <p style="color: #666666; line-height: 1.6; margin: 0;">
      Plata se va efectua în tranșe lunare, conform graficului stabilit de comun acord.
      Termenul de plată este de 15 zile de la emiterea facturii.
    </p>
  </div>

  <!-- Other Terms -->
  <div style="margin-bottom: 30px;">
    <h3 style="color: #00288B; font-size: 18px; margin: 0 0 15px 0;">CLAUZE GENERALE</h3>
    <ul style="color: #666666; line-height: 1.8; margin: 0; padding-left: 20px;">
      <li>Confidențialitate: Ambele părți se obligă să păstreze confidențialitatea informațiilor</li>
      <li>Proprietate intelectuală: Materialele create devin proprietatea clientului după plata integrală</li>
      <li>Modificări: Orice modificare trebuie făcută în scris și acceptată de ambele părți</li>
      <li>Reziliere: Contractul poate fi reziliat cu preaviz de 30 de zile</li>
    </ul>
  </div>

  <!-- Signatures -->
  <div style="margin-top: 60px;">
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
      <div>
        <p style="color: #1A1A1A; margin: 0 0 40px 0;"><strong>PRESTATOR</strong></p>
        <p style="color: #666666; margin: 0;">OWLIA S.R.L.</p>
        <p style="color: #666666; margin: 40px 0 0 0;">____________________</p>
        <p style="color: #666666; margin: 5px 0 0 0; font-size: 14px;">Semnătură și ștampilă</p>
      </div>
      <div>
        <p style="color: #1A1A1A; margin: 0 0 40px 0;"><strong>CLIENT</strong></p>
        <p style="color: #666666; margin: 0;">${client.name}</p>
        <p style="color: #666666; margin: 40px 0 0 0;">____________________</p>
        <p style="color: #666666; margin: 5px 0 0 0; font-size: 14px;">Semnătură și ștampilă</p>
      </div>
    </div>
  </div>
</div>
    `.trim();
  };

  const handleSavePdf = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/contracts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          htmlContent,
          sendEmail: false,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate contract");
      }

      const { contract } = await response.json();
      setGeneratedContractId(contract.id);
      onContractGenerated(contract);

      // Ask if want to send email
      setShowEmailConfirm(true);
    } catch (error) {
      console.error("Error saving contract:", error);
      alert("Eroare la salvarea contractului");
    } finally {
      setSaving(false);
    }
  };

  const handleSendEmail = async () => {
    if (!generatedContractId) return;

    setSendingEmail(true);
    try {
      const response = await fetch("/api/admin/contracts/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractId: generatedContractId,
          clientId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      alert("Email trimis cu succes!");
      setShowEmailConfirm(false);
      onClose();
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Eroare la trimiterea emailului");
    } finally {
      setSendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <Loader2 size={48} className="animate-spin text-navy mx-auto" />
          <p className="mt-4 text-gray">Se încarcă preview...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full my-8">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-light">
            <h2 className="text-2xl font-bold text-navy">Preview Contract</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-smooth"
              disabled={saving || sendingEmail}
            >
              <X size={24} className="text-gray" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="bg-cream rounded-xl p-4 mb-4">
              <p className="text-sm text-gray">
                💡 <strong>Editează template-ul</strong> modificând HTML-ul mai jos. 
                Apoi apasă "Salvează PDF" pentru a genera contractul.
              </p>
            </div>

            {/* HTML Editor */}
            <textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              className="w-full h-[400px] p-4 border border-gray-light rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-navy"
              style={{ resize: "vertical" }}
            />

            {/* Preview */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-navy mb-3">Preview:</h3>
              <div
                className="border border-gray-light rounded-lg p-8 bg-white max-h-[400px] overflow-y-auto"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-light bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-white transition-smooth"
              disabled={saving || sendingEmail}
            >
              Anulează
            </button>
            <Button
              onClick={handleSavePdf}
              disabled={saving || sendingEmail}
              className="flex items-center gap-2"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Salvare...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Salvează PDF
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Email Confirmation Dialog */}
      {showEmailConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                <Save size={32} className="text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-navy mb-2">
                Contract salvat!
              </h3>
              <p className="text-gray">
                Contractul a fost generat și salvat cu succes.
              </p>
            </div>

            <div className="bg-cream rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-dark">
                <strong>Vrei să trimiți contractul clientului prin email?</strong>
              </p>
              <p className="text-xs text-gray mt-2">
                Clientul va primi un email cu notificare și link către portalul său.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  setShowEmailConfirm(false);
                  onClose();
                }}
                className="flex-1 px-6 py-3 border border-gray-light rounded-xl font-semibold text-gray hover:bg-gray-50 transition-smooth"
                disabled={sendingEmail}
              >
                Nu acum
              </button>
              <Button
                onClick={handleSendEmail}
                disabled={sendingEmail}
                className="flex-1 flex items-center justify-center gap-2"
              >
                {sendingEmail ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Trimitere...
                  </>
                ) : (
                  <>
                    <Mail size={18} />
                    Trimite Email
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


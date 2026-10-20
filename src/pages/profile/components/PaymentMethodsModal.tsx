import { useState } from "react";

export interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  label: string;
  default: boolean;
}

interface PaymentMethodsModalProps {
  methods: PaymentMethod[];
  onClose: () => void;
  onSave: (methods: PaymentMethod[]) => void;
}

export default function PaymentMethodsModal({ methods, onClose, onSave }: PaymentMethodsModalProps) {
  const [currentMethods, setCurrentMethods] = useState<PaymentMethod[]>([...methods]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addType, setAddType] = useState<"card" | "bank">("card");
  const [cardNumber, setCardNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [saving, setSaving] = useState(false);

  const setDefault = (id: string) => {
    setCurrentMethods((prev) =>
      prev.map((m) => ({ ...m, default: m.id === id }))
    );
  };

  const removeMethod = (id: string) => {
    setCurrentMethods((prev) => prev.filter((m) => m.id !== id));
  };

  const handleAdd = () => {
    if (addType === "card" && !cardNumber.trim()) return;
    if (addType === "bank" && (!bankName.trim() || !accountNumber.trim())) return;

    const newMethod: PaymentMethod = {
      id: `pm-${Date.now()}`,
      type: addType,
      label:
        addType === "card"
          ? `Card ending in ${cardNumber.slice(-4) || "0000"}`
          : `${bankName} · ${accountNumber}`,
      default: currentMethods.length === 0,
    };

    setCurrentMethods((prev) => [...prev, newMethod]);
    setShowAddForm(false);
    setCardNumber("");
    setBankName("");
    setAccountNumber("");
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      onSave(currentMethods);
      setSaving(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F3F4F6] dark:border-[#374151] flex-shrink-0">
          <div>
            <h2 className="text-base font-black text-[#111827] dark:text-white">Payment Methods</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">{currentMethods.length} method(s) saved</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full cursor-pointer"
          >
            <i className="ri-close-line text-[#6B7280] dark:text-[#9CA3AF] text-base"></i>
          </button>
        </div>

        <div className="px-5 py-4 overflow-y-auto flex flex-col gap-4">
          {/* Saved methods list */}
          {currentMethods.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="w-12 h-12 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full mb-2">
                <i className="ri-bank-card-line text-lg text-[#9CA3AF]"></i>
              </div>
              <p className="text-sm text-[#9CA3AF]">No payment methods saved yet</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {currentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    method.default
                      ? "border-[#194DDC] dark:border-[#6B9EFF] bg-[#EEF2FF] dark:bg-[#1e3a8a]/20"
                      : "border-[#E5E7EB] dark:border-[#374151] bg-white dark:bg-[#111827]"
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-xl flex-shrink-0">
                    <i className={`${method.type === "card" ? "ri-bank-card-line" : "ri-bank-line"} text-[#194DDC] dark:text-[#6B9EFF] text-lg`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#111827] dark:text-white truncate">{method.label}</p>
                    <p className="text-[10px] text-[#9CA3AF] capitalize">{method.type}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {method.default ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 bg-[#194DDC] text-white rounded-full">Default</span>
                    ) : (
                      <button
                        onClick={() => setDefault(method.id)}
                        className="text-[10px] font-semibold text-[#194DDC] dark:text-[#6B9EFF] hover:underline cursor-pointer"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => removeMethod(method.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#FEE2E2] transition-colors cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-[#EF4444] text-xs"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add new */}
          {!showAddForm ? (
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full h-11 border-2 border-dashed border-[#E5E7EB] dark:border-[#374151] rounded-xl flex items-center justify-center gap-2 text-sm text-[#9CA3AF] cursor-pointer hover:border-[#194DDC] hover:text-[#194DDC] transition-colors"
            >
              <i className="ri-add-line"></i>
              Add Payment Method
            </button>
          ) : (
            <div className="bg-[#F8FAFC] dark:bg-[#111827] rounded-xl p-4 flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setAddType("card")}
                  className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    addType === "card"
                      ? "bg-[#194DDC] text-white"
                      : "border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB]"
                  }`}
                >
                  <i className="ri-bank-card-line mr-1"></i>
                  Card
                </button>
                <button
                  onClick={() => setAddType("bank")}
                  className={`flex-1 h-9 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    addType === "bank"
                      ? "bg-[#194DDC] text-white"
                      : "border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB]"
                  }`}
                >
                  <i className="ri-bank-line mr-1"></i>
                  Bank
                </button>
              </div>

              {addType === "card" ? (
                <div>
                  <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))}
                    placeholder="1234 5678 9012 3456"
                    className="w-full h-11 px-3 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
                      Bank Name
                    </label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      placeholder="e.g. GTBank"
                      className="w-full h-11 px-3 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] mb-1.5 uppercase tracking-wide">
                      Account Number
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      placeholder="0123456789"
                      className="w-full h-11 px-3 bg-white dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => { setShowAddForm(false); setCardNumber(""); setBankName(""); setAccountNumber(""); }}
                  className="flex-1 h-9 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] rounded-xl text-xs font-semibold cursor-pointer whitespace-nowrap"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  disabled={addType === "card" ? !cardNumber.trim() : !bankName.trim() || !accountNumber.trim()}
                  className="flex-1 h-9 bg-[#194DDC] text-white rounded-xl text-xs font-bold cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add Method
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-3 flex gap-2 flex-shrink-0 border-t border-[#F3F4F6] dark:border-[#374151]">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 h-11 bg-[#194DDC] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
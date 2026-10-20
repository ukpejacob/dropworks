import { useState } from "react";
import { mockTransactions } from "@/mocks/jobs";

type WalletTab = "overview" | "transactions";

const colorMap: Record<string, string> = {
  green: "bg-green-100 dark:bg-green-900/30 text-[#16A34A]",
  red: "bg-red-100 dark:bg-red-900/30 text-[#EF4444]",
  yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-[#F59E0B]",
};

export default function WalletPage() {
  const [tab, setTab] = useState<WalletTab>("overview");
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const balance = 1284.50;
  const escrow = 235.00;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A]">
      <div className="max-w-3xl mx-auto px-4">
      {/* Balance card */}
      <div className="mt-5">
        <div className="bg-gradient-to-br from-[#194DDC] to-[#0f3ab8] rounded-3xl p-6 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative z-10">
            <p className="text-sm text-white/70 font-medium mb-1">Available Balance</p>
            <h2 className="text-4xl font-black tracking-tight">${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h2>
            <div className="flex items-center gap-2 mt-3">
              <div className="bg-white/10 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1">
                <i className="ri-lock-line text-[#F59E0B] text-xs"></i>
                ${escrow.toFixed(2)} in escrow
              </div>
            </div>
            <p className="text-xs text-white/50 mt-3">Last updated: Apr 22, 2026</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { icon: "ri-bank-card-line", label: "Top Up", action: () => {} },
          { icon: "ri-send-plane-line", label: "Withdraw", action: () => setShowWithdraw(true) },
          { icon: "ri-history-line", label: "History", action: () => setTab("transactions") },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.action}
            className="bg-white dark:bg-[#1F2937] rounded-2xl p-4 flex flex-col items-center gap-2 border border-[#E5E7EB]/60 dark:border-[#374151]/60 cursor-pointer hover:border-[#194DDC]/40 transition-colors"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-[#EEF2FF] dark:bg-[#1e3a8a]/20 rounded-xl">
              <i className={`${item.icon} text-[#194DDC] dark:text-[#6B9EFF] text-xl`}></i>
            </div>
            <span className="text-xs font-semibold text-[#374151] dark:text-[#D1D5DB]">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Escrow info */}
      <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-2xl px-4 py-3 flex items-center gap-3">
        <i className="ri-lock-2-line text-[#F59E0B] text-xl flex-shrink-0"></i>
        <div>
          <p className="text-xs font-semibold text-[#92400E] dark:text-[#FCD34D]">Escrow Protected</p>
          <p className="text-xs text-[#B45309] dark:text-[#D97706] mt-0.5">$235.00 held until job completion</p>
        </div>
        <button className="ml-auto text-xs text-[#F59E0B] font-semibold cursor-pointer whitespace-nowrap">Learn more</button>
      </div>

      {/* Tab navigation */}
      <div className="mt-5">
        <div className="flex gap-1 bg-[#F3F4F6] dark:bg-[#1F2937] p-1 rounded-2xl mb-4">
          {(["overview", "transactions"] as WalletTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold capitalize transition-all duration-200 cursor-pointer whitespace-nowrap ${
                tab === t
                  ? "bg-white dark:bg-[#1e3a8a]/40 text-[#194DDC] dark:text-[#6B9EFF] shadow-sm"
                  : "text-[#6B7280] dark:text-[#9CA3AF]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <div className="space-y-3 pb-6">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Total Earned", value: "$3,420", icon: "ri-arrow-down-circle-line", color: "text-[#16A34A]" },
                { label: "Total Spent", value: "$1,235", icon: "ri-arrow-up-circle-line", color: "text-[#EF4444]" },
                { label: "This Month", value: "$515", icon: "ri-calendar-line", color: "text-[#194DDC] dark:text-[#6B9EFF]" },
                { label: "Pending", value: "$235", icon: "ri-time-line", color: "text-[#F59E0B]" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white dark:bg-[#1F2937] rounded-2xl p-4 border border-[#E5E7EB]/60 dark:border-[#374151]/60">
                  <div className="flex items-center gap-2 mb-2">
                    <i className={`${stat.icon} ${stat.color} text-base`}></i>
                    <span className="text-xs text-[#9CA3AF]">{stat.label}</span>
                  </div>
                  <p className="text-lg font-black text-[#111827] dark:text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white dark:bg-[#1F2937] rounded-2xl p-4 border border-[#E5E7EB]/60 dark:border-[#374151]/60">
              <h3 className="text-sm font-bold text-[#111827] dark:text-white mb-3">Recent Transactions</h3>
              {mockTransactions.slice(0, 3).map((tx) => (
                <div key={tx.id} className="flex items-center gap-3 py-2.5 border-b border-[#F3F4F6] dark:border-[#374151] last:border-0">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-full ${colorMap[tx.color]} flex-shrink-0`}>
                    <i className={`${tx.icon} text-sm`}></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#374151] dark:text-[#D1D5DB] truncate">{tx.label}</p>
                    <p className="text-[10px] text-[#9CA3AF]">{tx.date}</p>
                  </div>
                  <span className={`text-sm font-bold whitespace-nowrap ${tx.amount > 0 ? "text-[#16A34A]" : "text-[#EF4444]"}`}>
                    {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "transactions" && (
          <div className="bg-white dark:bg-[#1F2937] rounded-2xl border border-[#E5E7EB]/60 dark:border-[#374151]/60 mb-6 overflow-hidden">
            {mockTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center gap-3 px-4 py-3.5 border-b border-[#F3F4F6] dark:border-[#374151] last:border-0">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${colorMap[tx.color]} flex-shrink-0`}>
                  <i className={`${tx.icon} text-base`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#374151] dark:text-[#D1D5DB] truncate">{tx.label}</p>
                  <p className="text-xs text-[#9CA3AF] mt-0.5">{tx.date}</p>
                </div>
                <span className={`text-sm font-bold whitespace-nowrap ${tx.amount > 0 ? "text-[#16A34A]" : "text-[#EF4444]"}`}>
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      </div>{/* max-w-3xl */}
      {/* Withdraw modal */}
      {showWithdraw && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowWithdraw(false)} />
          <div className="relative w-full max-w-sm bg-white dark:bg-[#1F2937] rounded-t-3xl p-6">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#E5E7EB] dark:bg-[#374151] rounded-full" />
            <h3 className="text-lg font-bold text-[#111827] dark:text-white mt-2 mb-4">Withdraw Funds</h3>
            <p className="text-xs text-[#9CA3AF] mb-1">Available: <strong>${balance.toFixed(2)}</strong></p>
            <div className="relative mb-4">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-black text-[#9CA3AF]">$</span>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder="0.00"
                className="w-full h-14 pl-9 pr-4 text-2xl font-black text-[#111827] dark:text-white bg-[#F8FAFC] dark:bg-[#111827] border-2 border-[#E5E7EB] dark:border-[#374151] focus:border-[#194DDC] rounded-xl outline-none transition-colors"
              />
            </div>
            <div className="flex gap-2 mb-4">
              {[50, 100, 200, 500].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setWithdrawAmount(String(amt))}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#F3F4F6] dark:bg-[#374151] text-[#374151] dark:text-[#D1D5DB] hover:bg-[#E5E7EB] cursor-pointer whitespace-nowrap"
                >
                  ${amt}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowWithdraw(false)}
              className="w-full h-12 bg-[#194DDC] dark:bg-[#1e3a8a] text-white font-bold rounded-xl cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors"
            >
              Confirm Withdrawal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

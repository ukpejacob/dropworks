import { useState } from "react";
import { ALL_SKILL_SUGGESTIONS } from "@/mocks/jobs";

interface SkillsEditorModalProps {
  skills: string[];
  onClose: () => void;
  onSave: (skills: string[]) => void;
}

export default function SkillsEditorModal({ skills, onClose, onSave }: SkillsEditorModalProps) {
  const [currentSkills, setCurrentSkills] = useState<string[]>([...skills]);
  const [search, setSearch] = useState("");
  const [customInput, setCustomInput] = useState("");

  const filtered = ALL_SKILL_SUGGESTIONS.filter(
    (s) =>
      s.toLowerCase().includes(search.toLowerCase()) &&
      !currentSkills.includes(s)
  );

  const removeSkill = (skill: string) => {
    setCurrentSkills((prev) => prev.filter((s) => s !== skill));
  };

  const addSkill = (skill: string) => {
    if (!currentSkills.includes(skill)) {
      setCurrentSkills((prev) => [...prev, skill]);
    }
    setSearch("");
  };

  const addCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !currentSkills.includes(trimmed)) {
      setCurrentSkills((prev) => [...prev, trimmed]);
    }
    setCustomInput("");
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#1F2937] rounded-t-3xl sm:rounded-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F3F4F6] dark:border-[#374151]">
          <div>
            <h2 className="text-base font-black text-[#111827] dark:text-white">Edit Skills</h2>
            <p className="text-xs text-[#9CA3AF] mt-0.5">{currentSkills.length} skills added</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-[#F3F4F6] dark:bg-[#374151] rounded-full cursor-pointer"
          >
            <i className="ri-close-line text-[#6B7280] dark:text-[#9CA3AF] text-base"></i>
          </button>
        </div>

        <div className="px-5 py-4 max-h-[75vh] overflow-y-auto flex flex-col gap-4">
          {/* Current skills */}
          <div>
            <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide mb-2">Your Skills</p>
            {currentSkills.length === 0 ? (
              <p className="text-sm text-[#9CA3AF] italic">No skills added yet</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {currentSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 bg-[#EEF2FF] dark:bg-[#1e3a8a]/30 border border-[#C7D2FE] dark:border-[#1e3a8a] rounded-full text-xs font-semibold text-[#194DDC] dark:text-[#6B9EFF]"
                  >
                    {skill}
                    <button
                      onClick={() => removeSkill(skill)}
                      className="w-4 h-4 flex items-center justify-center bg-[#194DDC]/10 hover:bg-[#EF4444]/10 rounded-full cursor-pointer transition-colors group"
                    >
                      <i className="ri-close-line text-[10px] text-[#194DDC] group-hover:text-[#EF4444] transition-colors"></i>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Search suggestions */}
          <div>
            <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide mb-2">Add from List</p>
            <div className="relative mb-3">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center pointer-events-none">
                <i className="ri-search-line text-[#9CA3AF] text-sm"></i>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search skills..."
                className="w-full h-10 pl-9 pr-3 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {filtered.slice(0, 15).map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-full text-xs font-medium text-[#374151] dark:text-[#D1D5DB] cursor-pointer hover:border-[#194DDC] hover:text-[#194DDC] hover:bg-[#EEF2FF] dark:hover:border-[#6B9EFF] dark:hover:text-[#6B9EFF] transition-all"
                >
                  <i className="ri-add-line text-[10px]"></i>
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Custom skill */}
          <div>
            <p className="text-xs font-semibold text-[#6B7280] dark:text-[#9CA3AF] uppercase tracking-wide mb-2">Add Custom Skill</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustom()}
                placeholder="e.g. Piano Tuning"
                className="flex-1 h-10 px-3 bg-[#F8FAFC] dark:bg-[#111827] border border-[#E5E7EB] dark:border-[#374151] rounded-xl text-sm text-[#111827] dark:text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#194DDC] transition-colors"
              />
              <button
                onClick={addCustom}
                disabled={!customInput.trim()}
                className="h-10 px-4 bg-[#194DDC] text-white font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 pb-6 pt-3 flex gap-2 border-t border-[#F3F4F6] dark:border-[#374151]">
          <button
            onClick={onClose}
            className="flex-1 h-11 border border-[#E5E7EB] dark:border-[#374151] text-[#374151] dark:text-[#D1D5DB] font-semibold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#F8FAFC] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onSave(currentSkills); onClose(); }}
            className="flex-1 h-11 bg-[#194DDC] text-white font-bold rounded-xl text-sm cursor-pointer whitespace-nowrap hover:bg-[#1542c0] transition-colors"
          >
            Save Skills
          </button>
        </div>
      </div>
    </div>
  );
}

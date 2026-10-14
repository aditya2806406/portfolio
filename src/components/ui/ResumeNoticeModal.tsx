import React from 'react'
import { X, FileText, Mail, ArrowUpRight } from 'lucide-react'
import { Button } from './Button'

interface ResumeNoticeModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ResumeNoticeModal: React.FC<ResumeNoticeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080A10]/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-md p-6 rounded-2xl bg-[#151B2A] border border-[#2A364F] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close resume notice"
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#A4ADBF] hover:text-[#F4F6FC] hover:bg-[#1C2337] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#65E5FF]/10 border border-[#65E5FF]/20 text-[#65E5FF]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 id="modal-title" className="text-base font-bold text-[#F4F6FC]">
              Curriculum Vitae / Resume
            </h3>
            <span className="text-[11px] font-mono text-[#8175FF]">Document Status: In Final Review</span>
          </div>
        </div>

        <p className="text-sm text-[#A4ADBF] leading-relaxed mb-6">
          The verified PDF curriculum vitae is currently being updated with the latest 2026 engineering projects, publications, and certifications.
        </p>

        <div className="p-3.5 rounded-xl bg-[#101522] border border-[#1E2638] text-xs text-[#A4ADBF] space-y-1 mb-6">
          <p className="font-semibold text-[#F4F6FC]">Request directly:</p>
          <p>You can request an expedited copy directly via email at:</p>
          <p className="font-mono text-[#65E5FF]">contact@adityaprakash.dev</p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            asAnchor
            href="mailto:contact@adityaprakash.dev?subject=Resume%20Request%20-%20Aditya%20Prakash"
            variant="primary"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Mail className="w-4 h-4" />
            <span>Send Email Request</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

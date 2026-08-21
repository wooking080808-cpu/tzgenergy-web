'use client';

import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  // 占位：注册好 WhatsApp 后改为 +86XXXXXXXXXX
  const phone = '+86XXXXXXXXXX';
  const msg = encodeURIComponent("Hi, I'm interested in your energy storage products. Please send me more information.");
  const waUrl = `https://wa.me/${phone.replace(/[^\d]/g, '')}?text=${msg}`;

  return (
    <>
      {open && (
        <div className="fixed bottom-24 end-6 z-40 bg-white rounded-2xl shadow-2xl border border-slate-200 w-72 p-4 animate-in fade-in">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                <MessageCircle size={20} />
              </div>
              <div>
                <div className="font-semibold text-sm">Chat on WhatsApp</div>
                <div className="text-xs text-slate-500">Reply within 24h</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={18}/></button>
          </div>
          <p className="text-sm text-slate-600 mb-3">Hi! 👋 Send us a message and we'll respond as soon as possible.</p>
          <a href={waUrl} target="_blank" rel="noopener noreferrer"
             className="block w-full text-center py-2.5 bg-[#25D366] hover:bg-[#1ebe5b] text-white rounded-lg font-medium text-sm transition">
            Start Chat
          </a>
        </div>
      )}

      <button onClick={() => setOpen(!open)}
        aria-label="WhatsApp Chat"
        className="fixed bottom-6 end-6 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5b] text-white shadow-lg flex items-center justify-center transition hover:scale-110">
        <MessageCircle size={28} />
      </button>
    </>
  );
}

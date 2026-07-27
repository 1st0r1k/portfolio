export function IgsuCrmArchitecture() {
  return (
    <svg
      viewBox="0 0 800 380"
      role="img"
      aria-label="IGSU CRM architecture diagram"
      className="h-auto w-full"
    >
      <defs>
        <marker id="igsu-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9a8f7f" />
        </marker>
      </defs>

      {/* Browser */}
      <rect x="20" y="40" width="180" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="110" y="75" textAnchor="middle" fill="#f2ede4" fontSize="14" fontFamily="ui-monospace, monospace">
        Admin / Staff Browser
      </text>

      {/* Next.js App */}
      <rect x="320" y="40" width="180" height="70" rx="6" fill="#1a1712" stroke="#f5a623" strokeWidth="1.5" />
      <text x="410" y="68" textAnchor="middle" fill="#f2ede4" fontSize="14" fontWeight="bold" fontFamily="ui-monospace, monospace">
        Next.js App
      </text>
      <text x="410" y="86" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">
        App Router · NextAuth
      </text>

      {/* PostgreSQL */}
      <rect x="600" y="40" width="180" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="690" y="75" textAnchor="middle" fill="#f2ede4" fontSize="14" fontFamily="ui-monospace, monospace">
        PostgreSQL
      </text>

      {/* Bitrix24 CRM */}
      <rect x="320" y="200" width="180" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="410" y="235" textAnchor="middle" fill="#f2ede4" fontSize="14" fontFamily="ui-monospace, monospace">
        Bitrix24 CRM
      </text>

      {/* Google Sheets */}
      <rect x="320" y="300" width="180" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="410" y="335" textAnchor="middle" fill="#f2ede4" fontSize="14" fontFamily="ui-monospace, monospace">
        Google Sheets
      </text>

      {/* Arrows */}
      <line x1="200" y1="70" x2="316" y2="70" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#igsu-arrow)" />

      <line x1="500" y1="70" x2="596" y2="70" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#igsu-arrow)" />
      <text x="548" y="58" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">
        Prisma
      </text>

      <line x1="410" y1="196" x2="410" y2="114" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#igsu-arrow)" markerStart="url(#igsu-arrow)" />
      <text x="530" y="160" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">
        OAuth two-way sync
      </text>

      <line x1="410" y1="296" x2="410" y2="264" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#igsu-arrow)" />
      <text x="565" y="285" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">
        Streaming CSV import (50k+ rows)
      </text>
    </svg>
  )
}

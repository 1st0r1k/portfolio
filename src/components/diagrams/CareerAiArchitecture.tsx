export function CareerAiArchitecture() {
  return (
    <svg
      viewBox="0 0 800 320"
      role="img"
      aria-label="CareerAI architecture diagram"
      className="h-auto w-full"
    >
      <defs>
        <marker id="careerai-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9a8f7f" />
        </marker>
      </defs>

      {/* Job Sources */}
      <rect x="20" y="30" width="180" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="110" y="55" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">Job Sources</text>
      <text x="110" y="73" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">(5+ sites)</text>

      {/* User Resume */}
      <rect x="20" y="220" width="180" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="110" y="255" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">User Resume</text>

      {/* Ingestion Pipeline */}
      <rect x="270" y="30" width="200" height="60" rx="6" fill="#1a1712" stroke="#f5a623" strokeWidth="1.5" />
      <text x="370" y="65" textAnchor="middle" fill="#f2ede4" fontSize="13" fontWeight="bold" fontFamily="ui-monospace, monospace">
        Ingestion Pipeline
      </text>

      {/* PostgreSQL + pgvector */}
      <rect x="270" y="140" width="200" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="370" y="163" textAnchor="middle" fill="#f2ede4" fontSize="12" fontFamily="ui-monospace, monospace">PostgreSQL +</text>
      <text x="370" y="181" textAnchor="middle" fill="#f2ede4" fontSize="12" fontFamily="ui-monospace, monospace">pgvector</text>

      {/* LLM Matching */}
      <rect x="540" y="140" width="200" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="640" y="175" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">LLM Matching</text>

      {/* Telegram Bot / Web App */}
      <rect x="540" y="30" width="200" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="640" y="55" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">Telegram Bot</text>
      <text x="640" y="73" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">Web App</text>

      {/* Arrows */}
      <line x1="200" y1="60" x2="266" y2="60" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#careerai-arrow)" />
      <line x1="370" y1="90" x2="370" y2="136" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#careerai-arrow)" />
      <line x1="200" y1="235" x2="636" y2="200" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#careerai-arrow)" />
      <line x1="470" y1="170" x2="536" y2="170" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#careerai-arrow)" />
      <line x1="640" y1="136" x2="640" y2="94" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#careerai-arrow)" />
    </svg>
  )
}

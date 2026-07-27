export function MsbArchitecture() {
  return (
    <svg
      viewBox="0 0 800 320"
      role="img"
      aria-label="MSB architecture diagram"
      className="h-auto w-full"
    >
      <defs>
        <marker id="msb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9a8f7f" />
        </marker>
      </defs>

      {/* Platforms */}
      <rect x="20" y="20" width="140" height="50" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="90" y="50" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">Telegram</text>

      <rect x="20" y="95" width="140" height="50" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="90" y="125" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">VK</text>

      <rect x="20" y="170" width="140" height="50" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="90" y="200" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">Max</text>

      {/* Platform Adapters */}
      <rect x="240" y="95" width="180" height="60" rx="6" fill="#1a1712" stroke="#f5a623" strokeWidth="1.5" />
      <text x="330" y="130" textAnchor="middle" fill="#f2ede4" fontSize="13" fontWeight="bold" fontFamily="ui-monospace, monospace">
        Platform Adapters
      </text>

      {/* Internal Message Model */}
      <rect x="460" y="95" width="200" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="560" y="120" textAnchor="middle" fill="#f2ede4" fontSize="12" fontFamily="ui-monospace, monospace">
        Internal Message
      </text>
      <text x="560" y="138" textAnchor="middle" fill="#f2ede4" fontSize="12" fontFamily="ui-monospace, monospace">
        Model
      </text>

      {/* Redis Streams */}
      <rect x="460" y="205" width="200" height="60" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="560" y="240" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">
        Redis Streams
      </text>

      {/* PostgreSQL */}
      <rect x="580" y="20" width="180" height="50" rx="6" fill="#1a1712" stroke="#9a8f7f" />
      <text x="670" y="50" textAnchor="middle" fill="#f2ede4" fontSize="13" fontFamily="ui-monospace, monospace">PostgreSQL</text>

      {/* Arrows: platforms <-> adapters */}
      <line x1="160" y1="45" x2="236" y2="105" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#msb-arrow)" markerStart="url(#msb-arrow)" />
      <line x1="160" y1="120" x2="236" y2="122" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#msb-arrow)" markerStart="url(#msb-arrow)" />
      <line x1="160" y1="195" x2="236" y2="145" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#msb-arrow)" markerStart="url(#msb-arrow)" />

      {/* Adapters -> internal model */}
      <line x1="420" y1="125" x2="456" y2="125" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#msb-arrow)" />

      {/* internal model -> redis streams */}
      <line x1="560" y1="155" x2="560" y2="201" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#msb-arrow)" />
      <text x="610" y="182" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">queue</text>

      {/* redis streams -> adapters (route & filter) */}
      <line x1="456" y1="225" x2="330" y2="159" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#msb-arrow)" />
      <text x="380" y="250" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">
        route &amp; filter
      </text>

      {/* adapters -> postgres */}
      <line x1="380" y1="91" x2="600" y2="66" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#msb-arrow)" />
      <text x="500" y="70" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">
        config · RBAC
      </text>
    </svg>
  )
}

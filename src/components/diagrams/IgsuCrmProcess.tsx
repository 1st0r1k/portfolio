export function IgsuCrmProcess() {
  return (
    <svg
      viewBox="0 0 1000 320"
      role="img"
      aria-label="IGSU CRM admissions funnel process diagram (BPMN)"
      className="h-auto w-full"
    >
      <defs>
        <marker id="bpmn-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#9a8f7f" />
        </marker>
      </defs>

      {/* Start event */}
      <circle cx="30" cy="150" r="16" fill="#1a1712" stroke="#9a8f7f" strokeWidth="1.5" />

      {/* Task: Submit application */}
      <rect x="70" y="125" width="150" height="50" rx="8" fill="#1a1712" stroke="#9a8f7f" />
      <text x="145" y="155" textAnchor="middle" fill="#f2ede4" fontSize="12" fontFamily="ui-monospace, monospace">
        Submit application
      </text>

      {/* Gateway: Documents complete? */}
      <polygon points="270,115 305,150 270,185 235,150" fill="#1a1712" stroke="#f5a623" strokeWidth="1.5" />
      <text x="270" y="205" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">
        Documents complete?
      </text>

      {/* Task: Request missing documents (No branch, loop back) */}
      <rect x="190" y="240" width="180" height="50" rx="8" fill="#1a1712" stroke="#9a8f7f" />
      <text x="280" y="270" textAnchor="middle" fill="#f2ede4" fontSize="12" fontFamily="ui-monospace, monospace">
        Request missing docs
      </text>

      {/* Task: Review & verify */}
      <rect x="350" y="125" width="150" height="50" rx="8" fill="#1a1712" stroke="#9a8f7f" />
      <text x="425" y="155" textAnchor="middle" fill="#f2ede4" fontSize="12" fontFamily="ui-monospace, monospace">
        Review &amp; verify
      </text>

      {/* Task: Generate contract */}
      <rect x="530" y="125" width="150" height="50" rx="8" fill="#1a1712" stroke="#9a8f7f" />
      <text x="605" y="155" textAnchor="middle" fill="#f2ede4" fontSize="12" fontFamily="ui-monospace, monospace">
        Generate contract
      </text>

      {/* Task: Sign contract */}
      <rect x="710" y="125" width="150" height="50" rx="8" fill="#1a1712" stroke="#9a8f7f" />
      <text x="785" y="155" textAnchor="middle" fill="#f2ede4" fontSize="12" fontFamily="ui-monospace, monospace">
        Sign contract
      </text>

      {/* End event */}
      <circle cx="950" cy="150" r="16" fill="#1a1712" stroke="#f5a623" strokeWidth="3" />
      <text x="950" y="195" textAnchor="middle" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">
        Enrolled
      </text>

      {/* Flow arrows */}
      <line x1="46" y1="150" x2="66" y2="150" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#bpmn-arrow)" />
      <line x1="220" y1="150" x2="231" y2="150" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#bpmn-arrow)" />

      {/* No branch: gateway -> request missing docs -> back to gateway */}
      <line x1="270" y1="185" x2="270" y2="236" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#bpmn-arrow)" />
      <text x="285" y="222" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">No</text>
      <path d="M 370 240 C 420 220, 420 190, 300 155" fill="none" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#bpmn-arrow)" />

      {/* Yes branch: gateway -> review & verify -> generate contract -> sign contract -> end */}
      <line x1="305" y1="150" x2="346" y2="150" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#bpmn-arrow)" />
      <text x="320" y="130" fill="#9a8f7f" fontSize="11" fontFamily="ui-monospace, monospace">Yes</text>
      <line x1="500" y1="150" x2="526" y2="150" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#bpmn-arrow)" />
      <line x1="680" y1="150" x2="706" y2="150" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#bpmn-arrow)" />
      <line x1="860" y1="150" x2="931" y2="150" stroke="#9a8f7f" strokeWidth="1.5" markerEnd="url(#bpmn-arrow)" />
    </svg>
  )
}

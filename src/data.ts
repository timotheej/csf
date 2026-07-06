export type SealLevel = 0 | 1 | 2 | 3 | 4

export interface Objective {
  id: string
  name: string
  /** Weight of the objective in the overall framework, in percent. */
  weight: number
  /** Titles of the 5 SEAL levels (index = level). */
  levels: [string, string, string, string, string]
  /** Description shown when the corresponding level is selected. */
  descriptions: [string, string, string, string, string]
}

export interface Assessment {
  /** Currently assessed SEAL level per objective id. */
  levels: Record<string, SealLevel>
  /** Minimum required SEAL level per objective id. */
  minimums: Record<string, SealLevel>
}

export const OBJECTIVES: Objective[] = [
  {
    id: 'SOV-1',
    name: 'Strategic Sovereignty',
    weight: 15,
    levels: [
      'Foreign Capital Control',
      'Nominal Local Presence',
      'European Anchoring Under Influence',
      'Predominantly European Governance',
      'Total Capital independence',
    ],
    descriptions: [
      'Ownership and strategic decisions are fully controlled by non-European entities.',
      'The company has a registered office in the EU, but majority shareholding and decision-making power remain outside the EU.',
      'European entity with significant EU shareholding, but strategic decisions can still be influenced from outside the EU.',
      'Majority European shareholding and governance; only limited minority influence from outside the EU.',
      'Capital, governance and strategic decision-making are entirely European and independent.',
    ],
  },
  {
    id: 'SOV-2',
    name: 'Legal & Jurisdictional Sovereignty',
    weight: 10,
    levels: [
      'Extraterritorial Legal Subjugation',
      'Surface-Level Contractual Compliance',
      'Conditional Legal Protection',
      'Advanced Jurisdictional Immunity',
      'Absolute Extraterritorial Impermeability',
    ],
    descriptions: [
      'Services and data are fully exposed to foreign jurisdictions.',
      'Contracts reference EU law, but the provider remains subject to extraterritorial legislation in practice.',
      'Legal safeguards limit foreign access to data, subject to specific conditions and exceptions.',
      'Robust legal structure shielding services from most extraterritorial claims.',
      'Services and data are legally immune to any non-European jurisdiction.',
    ],
  },
  {
    id: 'SOV-3',
    name: 'Data & AI Sovereignty',
    weight: 10,
    levels: [
      'Data and Processing Expatriation',
      'Simple Physical Location',
      'Partial Residential Control',
      'Cryptographic and Algorithmic Mastery',
      'Absolute Data and AI Sovereignty',
    ],
    descriptions: [
      'Data and processing are hosted and controlled outside Europe.',
      'Data is physically stored in Europe, without further guarantees on control or processing.',
      'Data in Europe, but dependence on proprietary non-European key management tools (KMS) or AI pipelines.',
      'European control of encryption keys and AI pipelines; residual dependencies are contained.',
      'Data, keys and AI models are fully under European control, end to end.',
    ],
  },
  {
    id: 'SOV-4',
    name: 'Operational Sovereignty',
    weight: 15,
    levels: [
      'Fully Offshored Operations',
      'Local First-Level Support',
      'Conditional Legal Protection',
      'Advanced Operational Independence',
      'Exclusive Operational Control',
    ],
    descriptions: [
      'Operations, administration and support are performed entirely from outside Europe.',
      'First-level support is local, but administration and escalations depend on non-EU teams.',
      'European operations under contractual guarantees, with conditional foreign involvement.',
      'EU-based operations teams with near-total autonomy for daily operations.',
      'All operations are performed exclusively by European teams under European control.',
    ],
  },
  {
    id: 'SOV-5',
    name: 'Supply Chain Sovereignty',
    weight: 15,
    levels: [
      'Blind External Dependency',
      'Documentary Traceability',
      'Visibility with Critical Dependencies',
      'Diversification and Risk Control',
      'Secure Supply Autarky',
    ],
    descriptions: [
      'No visibility on the supply chain; critical dependencies are unknown or unmanaged.',
      'Suppliers and components are documented, but dependencies are not actively managed.',
      'Supply chain is mapped; critical non-European dependencies remain.',
      'Diversified sources, preference for European or neutral components. Dependency is controlled.',
      'Fully secured, European-controlled supply chain with no critical external dependency.',
    ],
  },
  {
    id: 'SOV-6',
    name: 'Technological Sovereignty',
    weight: 15,
    levels: [
      'Proprietary Lock-in (Black Box)',
      'Superficial Interoperability',
      'Restricted Technological Openness',
      'Transparency and Facilitated Reversibility',
      'Total Technological Independence',
    ],
    descriptions: [
      'Closed proprietary stack; no visibility, portability or reversibility.',
      'Standard APIs exist, but migration remains costly and technically constrained.',
      'Partially open technologies; reversibility is possible with significant effort.',
      'Open standards, documented architecture and supported migration paths.',
      'Fully open or sovereign stack. 100% auditable code, no constraints from an external vendor.',
    ],
  },
  {
    id: 'SOV-7',
    name: 'Security & Compliance Sovereignty',
    weight: 10,
    levels: [
      'Security Under Foreign Governance',
      'Passive Regulatory Compliance',
      'Active Security with Dependencies',
      'European Security Mastery',
      'Cyber Excellence and Strict Compliance',
    ],
    descriptions: [
      'Security operations and governance are controlled from outside Europe.',
      'Minimum regulatory requirements are met, without proactive security governance.',
      'Active security operations, but relying on non-European tools or teams.',
      'European SOC, regular audits, and compliance with advanced requirements (NIS2, DORA).',
      'Best-in-class European cybersecurity with strict, continuously audited compliance.',
    ],
  },
  {
    id: 'SOV-8',
    name: 'Environmental Sustainability',
    weight: 5,
    levels: [
      'Opacity and Energy Dependency',
      'Basic Energy Monitoring',
      'Legal Environmental Compliance',
      'Optimization and Green Transition',
      'Eco-Sovereignty and Total Resilience',
    ],
    descriptions: [
      'No transparency on energy usage; full dependency on carbon-intensive sources.',
      'Energy consumption is measured and reported, without reduction commitments.',
      'Environmental regulations are met; improvement efforts remain limited.',
      'Active optimization, renewable energy sourcing and transition plan in place.',
      'Eco-designed datacenters, 100% European renewable energy, and a mature circular economy policy for components.',
    ],
  },
]

export const DEFAULT_ASSESSMENT: Assessment = {
  levels: {
    'SOV-1': 1,
    'SOV-2': 0,
    'SOV-3': 2,
    'SOV-4': 3,
    'SOV-5': 3,
    'SOV-6': 4,
    'SOV-7': 3,
    'SOV-8': 4,
  },
  minimums: {
    'SOV-1': 1,
    'SOV-2': 1,
    'SOV-3': 1,
    'SOV-4': 1,
    'SOV-5': 1,
    'SOV-6': 1,
    'SOV-7': 1,
    'SOV-8': 1,
  },
}

/** Global score = mean of the 8 assessed levels (0..4). */
export function globalScore(a: Assessment): number {
  const values = OBJECTIVES.map((o) => a.levels[o.id] as number)
  return values.reduce((s, v) => s + v, 0) / values.length
}

/** Conformity = global score expressed as a fraction of the maximum level. */
export function conformity(a: Assessment): number {
  return globalScore(a) / 4
}

export const SEAL_BADGE_STYLES: Record<SealLevel, { bg: string; border: string; text: string }> = {
  0: { bg: '#fef2f2', border: '#ff6467', text: '#9f0712' },
  1: { bg: '#fefaf6', border: '#fb892d', text: '#853200' },
  2: { bg: '#fefce8', border: '#facc15', text: '#854d0e' },
  3: { bg: '#f0fdfa', border: '#00d5be', text: '#005f5a' },
  4: { bg: '#eaf1fb', border: '#2189f8', text: '#243b53' },
}

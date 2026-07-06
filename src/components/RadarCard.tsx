import { OBJECTIVES, type Assessment } from '../data'

interface RadarCardProps {
  assessment: Assessment
  activeId: string
}

const SIZE = 190
const CENTER = SIZE / 2
const RADIUS = 95
const RINGS = 4

/** Axis 0 (SOV-1) points up; axes proceed clockwise. */
function polar(axis: number, fraction: number): [number, number] {
  const angle = -Math.PI / 2 + (axis * 2 * Math.PI) / OBJECTIVES.length
  return [CENTER + RADIUS * fraction * Math.cos(angle), CENTER + RADIUS * fraction * Math.sin(angle)]
}

export default function RadarCard({ assessment, activeId }: RadarCardProps) {
  const points = OBJECTIVES.map((o, i) => polar(i, assessment.levels[o.id] / 4))
  const polygon = points.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ')

  return (
    <div className="rounded-lg border border-card-border bg-white p-5">
      <p className="text-[16px] leading-6 font-bold text-navy">Radar Analysis</p>
      <div className="mt-6 flex h-[254px] items-center justify-center">
        {/* Extra padding around the SVG leaves room for the labels */}
        <div className="relative" style={{ width: SIZE, height: SIZE }}>
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="overflow-visible"
          >
            {/* Grid rings */}
            {Array.from({ length: RINGS }, (_, ring) => {
              const fraction = (ring + 1) / RINGS
              const ringPoints = OBJECTIVES.map((_, i) => polar(i, fraction))
                .map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`)
                .join(' ')
              return <polygon key={ring} points={ringPoints} fill="none" stroke="#cbd2dc" strokeWidth={0.8} />
            })}
            {/* Spokes */}
            {OBJECTIVES.map((o, i) => {
              const [x, y] = polar(i, 1)
              return <line key={o.id} x1={CENTER} y1={CENTER} x2={x} y2={y} stroke="#cbd2dc" strokeWidth={0.8} />
            })}
            {/* Value polygon */}
            <polygon points={polygon} fill="#0073e6" fillOpacity={0.05} stroke="#0073e6" strokeWidth={1.5} />
            {/* Value dots — red when below the minimum required */}
            {OBJECTIVES.map((o, i) => {
              const [x, y] = points[i]
              const ok = assessment.levels[o.id] >= assessment.minimums[o.id]
              return (
                <circle
                  key={o.id}
                  cx={x}
                  cy={y}
                  r={3.4}
                  fill="white"
                  stroke={ok ? '#4aa82d' : '#fb2c36'}
                  strokeWidth={1.7}
                />
              )
            })}
          </svg>
          {/* Axis labels */}
          {OBJECTIVES.map((o, i) => {
            const [x, y] = polar(i, 1.22)
            const active = o.id === activeId
            return (
              <span
                key={o.id}
                className={`absolute flex h-5 -translate-x-1/2 -translate-y-1/2 items-center rounded-full px-1.5 text-[12px] leading-5 font-bold whitespace-nowrap ${
                  active ? 'bg-brand text-white' : 'bg-blue-light text-brand-dark'
                }`}
                style={{ left: x, top: y }}
              >
                {o.id}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}

interface ScoreCardProps {
  score: number
  conformity: number
}

function formatScore(score: number): string {
  return score.toLocaleString('fr-FR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })
}

function formatPercent(fraction: number): string {
  return `${(fraction * 100).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}%`
}

export default function ScoreCard({ score, conformity }: ScoreCardProps) {
  const size = 140
  const strokeWidth = 12
  const r = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * r

  return (
    <div className="rounded-lg border border-card-border bg-white p-5">
      <p className="text-[16px] leading-6 font-bold text-navy">Global Sovereignty Score</p>
      <div className="mt-10 flex items-center justify-center gap-8">
        <div className="relative size-[140px]">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
            <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e7eaef" strokeWidth={strokeWidth} />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="#0073e6"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - conformity)}
              className="transition-[stroke-dashoffset] duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[32px] leading-none font-bold text-brand">{formatScore(score)}</span>
            <span className="mt-1 text-[16px] leading-none font-medium text-navy">/4.00</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[24px] leading-6 font-extrabold text-brand">{formatPercent(conformity)}</span>
          <span className="text-[14px] leading-5 font-bold text-navy">Conformity</span>
        </div>
      </div>
    </div>
  )
}

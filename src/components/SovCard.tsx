import { SEAL_BADGE_STYLES, type Objective, type SealLevel } from '../data'
import { ExpandMoreIcon, InfoIcon } from '../icons'

interface SovCardProps {
  objective: Objective
  level: SealLevel
  minimum: SealLevel
  active: boolean
  onSelectLevel: (level: SealLevel) => void
  onSetMinimum: (level: SealLevel) => void
  onActivate: () => void
}

const LEVELS: SealLevel[] = [0, 1, 2, 3, 4]

export default function SovCard({
  objective,
  level,
  minimum,
  active,
  onSelectLevel,
  onSetMinimum,
  onActivate,
}: SovCardProps) {
  const badge = SEAL_BADGE_STYLES[level]
  const conform = level >= minimum

  return (
    <div
      onClick={onActivate}
      className={`rounded-lg bg-white px-6 pt-5 pb-6 ${
        active
          ? 'border-2 border-brand shadow-[0px_2px_4px_-2px_rgba(20,34,38,0.06),0px_4px_8px_-2px_rgba(20,34,38,0.1)]'
          : 'border border-border-default'
      }`}
    >
      {/* Card header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-6 items-center rounded-full bg-brand px-2 text-[14px] leading-5 font-bold text-white">
            {objective.id}
          </span>
          <span className="text-[16px] leading-6 font-bold text-navy-deep">{objective.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-6 items-center gap-0.5 rounded-md border border-border-default pr-1 pl-2 text-[14px] leading-5 font-bold text-navy">
            {objective.weight}%
            <ExpandMoreIcon size={20} />
          </span>
          <span
            className="grid size-5 place-items-center rounded-full"
            style={{ backgroundColor: conform ? '#e6f0e4' : '#fef2f2' }}
            title={conform ? 'Meets the minimum required level' : 'Below the minimum required level'}
          >
            <span
              className="size-[15px] rounded-full"
              style={{ backgroundColor: conform ? '#4aa82d' : '#fb2c36' }}
            />
          </span>
        </div>
      </div>

      {/* Seal level selector */}
      <div className="mt-8">
        <p className="text-[14px] leading-5 font-bold text-navy">Seal Levels</p>
        <div className="mt-2 flex h-[90px] overflow-hidden rounded-lg border border-border-default">
          {LEVELS.map((l) => {
            const selected = l === level
            return (
              <button
                key={l}
                type="button"
                onClick={() => onSelectLevel(l)}
                className={`flex flex-1 cursor-pointer flex-col items-center justify-center gap-2 px-2 py-[11px] not-last:border-r not-last:border-border-default ${
                  selected ? 'bg-brand text-white' : 'bg-white text-navy hover:bg-blue-light/60'
                }`}
              >
                <span className="text-[20px] leading-7 font-bold">{l}</span>
                <span className="text-center text-[12px] leading-4 font-semibold">{objective.levels[l]}</span>
              </button>
            )
          })}
        </div>

        {/* Current level summary */}
        <div className="mt-4 flex flex-col gap-2 rounded-lg bg-subtle p-4">
          <div className="flex items-center gap-2">
            <span
              className="flex items-center rounded-md border px-1.5 py-0.5 text-[12px] leading-5 font-bold"
              style={{ backgroundColor: badge.bg, borderColor: badge.border, color: badge.text }}
            >
              SEAL-{level}
            </span>
            <span className="text-[14px] leading-5 font-bold text-navy">{objective.levels[level]}</span>
          </div>
          <p className="text-[12px] leading-4 font-medium text-navy">{objective.descriptions[level]}</p>
        </div>
      </div>

      {/* Minimum required slider */}
      <div className="mt-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-1">
            <p className="text-[14px] leading-5 font-bold text-navy">Minimum Required</p>
            <span title="The minimum SEAL level your organisation requires for this objective.">
              <InfoIcon size={16} />
            </span>
          </div>
          <p className="text-[16px] leading-4 font-semibold text-[#181d27]">{minimum}</p>
        </div>
        <div className="mt-4">
          <div className="relative">
            <div className="rounded-full border border-border-default bg-[#f5f5f5] p-0.5">
              <div className="relative h-2">
                <div
                  className="h-2 rounded-full bg-brand transition-[width] duration-200"
                  style={{ width: `${(minimum / 4) * 100}%` }}
                />
              </div>
            </div>
            {/* Handle */}
            <span
              className="pointer-events-none absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0px_2px_4px_rgba(20,34,38,0.06),0px_4px_8px_rgba(20,34,38,0.1)] transition-[left] duration-200"
              style={{
                left: `calc(${(minimum / 4) * 100}% + ${(0.5 - minimum / 4) * 16}px)`,
                background: 'linear-gradient(135deg, #0984ff 16%, #0073e6 100%)',
              }}
            />
            <input
              type="range"
              min={0}
              max={4}
              step={1}
              value={minimum}
              aria-label={`Minimum required SEAL level for ${objective.name}`}
              onChange={(e) => onSetMinimum(Number(e.target.value) as SealLevel)}
              className="absolute inset-x-0 top-1/2 h-6 w-full -translate-y-1/2 cursor-pointer opacity-0"
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[12px] leading-3 font-semibold text-navy">
            <span>SEAL 1</span>
            <span>SEAL 4</span>
          </div>
        </div>
      </div>
    </div>
  )
}

import logoAtos from '../assets/logo-atos.svg'
import { ExpandMoreIcon, RefreshIcon, ShareIcon } from '../icons'

interface HeaderProps {
  onReset: () => void
  onExport: () => void
}

export default function Header({ onReset, onExport }: HeaderProps) {
  return (
    <header className="flex h-[72px] items-center justify-between bg-navy px-[120px]">
      <div className="flex items-center gap-[11px]">
        <img src={logoAtos} alt="Atos" className="h-[22px] w-[70px]" />
        <div className="h-8 w-px bg-white/24" />
        <div className="flex flex-col justify-center gap-0.5">
          <p className="text-[16px] leading-tight font-bold text-white">Cloud Sovereignty Evaluator</p>
          <p className="text-[12px] leading-tight font-medium text-white/88">
            European Commission Cloud Sovereignty Framework (CSF 1.2.1)
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-[#e7eaef]/24 bg-white/10 py-1.5 pr-2 pl-3 text-[14px] leading-5 font-semibold text-white hover:bg-white/20"
        >
          EN
          <ExpandMoreIcon size={16} color="white" />
        </button>
        <button
          type="button"
          onClick={onReset}
          className="flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-[#575887] bg-white/10 py-1.5 pr-3 pl-2 text-[14px] leading-5 font-semibold text-white shadow-[0px_1px_2px_0px_rgba(20,34,38,0.05)] hover:bg-white/20"
        >
          <RefreshIcon size={16} />
          Reset
        </button>
        <button
          type="button"
          onClick={onExport}
          className="flex h-8 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-black/8 bg-brand py-1.5 pr-3 pl-2 text-[14px] leading-5 font-semibold text-white shadow-[0px_1px_2px_0px_rgba(20,34,38,0.05)] hover:bg-[#0066cc]"
        >
          <ShareIcon size={16} />
          Export
        </button>
      </div>
    </header>
  )
}

import ctaPhoto from '../assets/cta-photo.jpg'
import ctaDeco from '../assets/cta-deco.svg'
import { ArrowForwardIcon } from '../icons'

const STEPS = ['Share your evaluation', 'Get expert recommendations', 'Build your action plan']

export default function CtaCard() {
  return (
    <div className="relative flex h-[408px] flex-col justify-between overflow-hidden rounded-lg p-5">
      {/* Background photo + navy gradient overlay */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src={ctaPhoto} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(189deg, rgba(0, 0, 92, 0.4) 12.245%, rgb(0, 0, 92) 106.87%)',
          }}
        />
      </div>
      <img src={ctaDeco} alt="" aria-hidden className="absolute top-[20px] right-[26px] h-[64px] w-[82px]" />

      <div className="relative flex h-8 w-fit items-center gap-2 rounded-full border border-white/40 py-2 pr-3 pl-2">
        <span className="relative grid size-4 place-items-center">
          <span className="absolute size-4 rounded-full bg-[rgba(16,97,0,0.56)]" />
          <span className="relative size-2 rounded-full bg-[#7aea57]" />
        </span>
        <p className="text-[12px] leading-5 font-semibold text-white">Talk to an Atos expert</p>
      </div>

      <div className="relative flex flex-col gap-6">
        <p className="w-[220px] text-[20px] leading-[1.2] font-extrabold text-white">
          Unlock your sovereignty roadmap
        </p>
        <div className="flex flex-col">
          {STEPS.map((step, i) => (
            <div key={step}>
              {i > 0 && (
                <div className="flex h-5 items-center gap-2">
                  <span className="flex size-5 justify-center">
                    <span className="h-full w-px bg-white" />
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="grid size-5 place-items-center rounded-full border border-white">
                  <span className="text-[11px] font-semibold text-[#3dc7ff]">{i + 1}</span>
                </span>
                <p className="text-[14px] leading-5 font-semibold text-white">{step}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="flex h-10 w-full cursor-pointer items-center justify-center gap-1.5 rounded-md border border-black/8 bg-white py-2.5 pr-3 pl-4 text-[14px] leading-5 font-semibold text-[#2f313c] shadow-[0px_1px_2px_0px_rgba(20,34,38,0.05)] hover:bg-gray-50"
        >
          Start the conversation
          <ArrowForwardIcon size={20} />
        </button>
      </div>
    </div>
  )
}

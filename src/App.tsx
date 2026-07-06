import { useLayoutEffect, useRef, useState } from 'react'
import {
  DEFAULT_ASSESSMENT,
  OBJECTIVES,
  conformity,
  globalScore,
  type Assessment,
  type SealLevel,
} from './data'
import Header from './components/Header'
import CtaCard from './components/CtaCard'
import ScoreCard from './components/ScoreCard'
import RadarCard from './components/RadarCard'
import PrivacyCard from './components/PrivacyCard'
import SovCard from './components/SovCard'
import Footer from './components/Footer'
import heroBg from './assets/hero-bg.png'

function cloneAssessment(a: Assessment): Assessment {
  return { levels: { ...a.levels }, minimums: { ...a.minimums } }
}

export default function App() {
  const [assessment, setAssessment] = useState<Assessment>(() => cloneAssessment(DEFAULT_ASSESSMENT))
  const [activeId, setActiveId] = useState<string>(OBJECTIVES[0].id)

  // Sticky sidebar: scrolls with the page, then pins when its bottom reaches
  // the bottom of the viewport (negative sticky top = sidebar height overflow).
  const asideRef = useRef<HTMLElement>(null)
  const [stickyTop, setStickyTop] = useState(0)
  useLayoutEffect(() => {
    const el = asideRef.current
    if (!el) return
    const update = () => setStickyTop(Math.min(20, window.innerHeight - el.offsetHeight - 20))
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  const score = globalScore(assessment)
  const conf = conformity(assessment)

  const setLevel = (id: string, level: SealLevel) =>
    setAssessment((a) => ({ ...a, levels: { ...a.levels, [id]: level } }))

  const setMinimum = (id: string, level: SealLevel) =>
    setAssessment((a) => ({ ...a, minimums: { ...a.minimums, [id]: level } }))

  const reset = () => {
    setAssessment(cloneAssessment(DEFAULT_ASSESSMENT))
    setActiveId(OBJECTIVES[0].id)
  }

  const exportJson = () => {
    const payload = {
      framework: 'European Commission Cloud Sovereignty Framework (CSF 1.2.1)',
      exportedAt: new Date().toISOString(),
      globalScore: Number(score.toFixed(2)),
      conformity: `${(conf * 100).toFixed(1)}%`,
      objectives: OBJECTIVES.map((o) => ({
        id: o.id,
        name: o.name,
        weight: `${o.weight}%`,
        sealLevel: assessment.levels[o.id],
        sealLevelTitle: o.levels[assessment.levels[o.id]],
        minimumRequired: assessment.minimums[o.id],
        conform: assessment.levels[o.id] >= assessment.minimums[o.id],
      })),
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'cloud-sovereignty-evaluation.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen">
      <Header onReset={reset} onExport={exportJson} />

      <main className="relative">
        {/* Hero background band */}
        <img
          src={heroBg}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[159px] w-full object-cover"
        />

        <div className="relative mx-auto max-w-[1280px] px-10 pt-12 pb-12">
          {/* Hero */}
          <div className="flex flex-col gap-2">
            <h1 className="text-[40px] leading-[1.175] font-extrabold text-navy">
              Evaluate your Cloud Sovereignty
            </h1>
            <p className="max-w-[633px] text-[18px] leading-7 font-semibold text-navy">
              Assess your cloud provider against the 8 European sovereignty objectives and identify
              gaps to reach your target SEAL level.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="mt-10 flex gap-4">
            <aside
              ref={asideRef}
              style={{ top: stickyTop }}
              className="sticky flex w-[316px] shrink-0 flex-col gap-5 self-start"
            >
              <CtaCard />
              <ScoreCard score={score} conformity={conf} />
              <RadarCard assessment={assessment} activeId={activeId} />
              <PrivacyCard />
              <CtaCard />
            </aside>

            <div className="w-px shrink-0 bg-border-default" />

            <section className="flex min-w-0 flex-1 flex-col gap-6">
              {OBJECTIVES.map((o) => (
                <SovCard
                  key={o.id}
                  objective={o}
                  level={assessment.levels[o.id]}
                  minimum={assessment.minimums[o.id]}
                  active={o.id === activeId}
                  onSelectLevel={(l) => setLevel(o.id, l)}
                  onSetMinimum={(l) => setMinimum(o.id, l)}
                  onActivate={() => setActiveId(o.id)}
                />
              ))}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

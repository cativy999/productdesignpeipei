import { useState, useRef, useCallback, useEffect } from 'react'

// ─── All projects in one flat ordered list ────────────────────────────────────
const FLAT_PROJECTS = [
  { id: 'kore',           year: 2026, title: 'Kore',           platform: 'desktop dock app', image: '/images/project-kore.png',
    description: 'A minimal desktop dock application designed to keep your most-used tools one click away, reducing context-switching and keeping you in flow.' },
  { id: 'gather',         year: 2026, title: 'Gather',         platform: 'Desktop + mobile', image: '/images/project-gather.png',
    description: 'A collaborative platform that brings distributed teams together. Gather redesigns how people share context and make decisions across time zones.' },
  { id: 'meal-planning',  year: 2025, title: 'Meal Planning',  platform: 'mobile', image: '/images/project-meal-planning.avif',
    description: 'AI-Powered family meal planner\nTurn what\'s already in your kitchen into meals everyone will love. This app learns your family\'s tastes, dietary needs, and preferences — and gets smarter every week!' },
  { id: 'ai-planner',     year: 2025, title: 'AI Planner',     platform: 'mobile', image: '/images/project-ai-planner.avif',
    description: 'Spend less time planning, more time living\nTurn everyday activities, shopping, and home tasks into actionable plans. Let AI handle follow-ups, coordinate tasks, and notify you of results — so families can stay organized without getting overwhelmed.' },
  { id: 'family-superapp',year: 2025, title: 'Family Superapp',platform: 'mobile', image: '/images/project-family-superapp.avif',
    description: 'Designing clarity in an ambiguous, multi-feature product space\nA concept-to-demo product exploring how families plan, communicate, and collaborate in one place. Focused on creating structure, prioritization, and interaction design in a highly ambiguous product vision.' },
  { id: 'trip-guide',     year: 2024, title: 'Trip Guide',     platform: 'mobile', image: '/images/project-trip-guide.avif',
    description: 'A tool for travel enthusiasts to share and create guides.' },
  { id: 'trip-tool',      year: 2024, title: 'Trip Tool',      platform: 'mobile', image: '/images/project-trip-tool.avif',
    description: 'A centralized trip planning tool that helps users keep all their bookings in one place.' },
  { id: 'cable-crm',      year: 2024, title: 'Cable CRM',      platform: 'desktop', image: '/images/project-cable-crm.avif',
    description: 'Optimizing Cable CRM for Travel Operations and Support Teams\nUsers benefit from a modern, intuitive CRM interface designed to streamline workflows, enhance customer interactions, and simplify management tasks.' },
  { id: 'pcc',            year: 2023, title: 'Polynesian Cultural Center UX Redesign', platform: 'mobile', image: '/images/project-pcc.avif',
    description: 'Seamless journeys, personalized experiences: Elevate your theme park adventure with our user-centered design.' },
  { id: 'loopedin',       year: 2023, title: 'LoopedIn',       platform: 'mobile', image: '/images/project-loopedin.png',
    description: 'A community app that helps neighbors stay informed and connected through local events, alerts, and shared resources.' },
]

const YEARS = [2026, 2025, 2024, 2023]
const CARD_WIDTH = 520 + 32
const MOBILE_CARD_WIDTH = 260 + 16

const YEAR_START_INDEX = {}
YEARS.forEach(y => { YEAR_START_INDEX[y] = FLAT_PROJECTS.findIndex(p => p.year === y) })

const SIDEBAR_PROJECTS = [
  { label: 'Kore  (desktop dock app)',   year: 2026, id: 'kore' },
  { label: 'Gather  (Desktop + mobile)', year: 2026, id: 'gather' },
  { label: 'Meal Planning (mobile)',     year: 2025, id: 'meal-planning' },
  { label: 'AI Planner  (mobile)',       year: 2025, id: 'ai-planner' },
  { label: 'Family Superapp  (mobile)',  year: 2025, id: 'family-superapp' },
  { label: 'Trip Guide  (mobile)',       year: 2024, id: 'trip-guide' },
  { label: 'Trip Tool (mobile)',         year: 2024, id: 'trip-tool' },
  { label: 'Cable CRM (desktop)',        year: 2024, id: 'cable-crm' },
  { label: 'Polynesian Cultural Center UX Redesign (mobile)', year: 2023, id: 'pcc' },
  { label: 'LoopedIn (mobile)',          year: 2023, id: 'loopedin' },
  { label: 'and more..',                 year: null,  id: null },
]

const WORK_EXP = [
  { company: 'Panasonic Well',              period: 'Aug 2025 to Feb 2026' },
  { company: 'TravelPass Group',            period: 'Feb 2023 to 2025' },
  { company: 'Polynesian Culture Center',   period: 'Jan–Mar 2023' },
  { company: 'PLACE',                       period: 'Oct 2021 to Feb 2023' },
  { company: 'Freelance Projects',          period: '2020–2023' },
]

const PROFILE_IMG  = '/images/Pei Pei profile pic.png'
const CARD_BACK_IMG = '/images/peipeicard.png'

// ─── Icons ────────────────────────────────────────────────────────────────────
function EmailIcon() {
  return (
    <svg width="18" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2 7l10 7 10-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function GlobeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3c-2.5 3-4 5.8-4 9s1.5 6 4 9M12 3c2.5 3 4 5.8 4 9s-1.5 6-4 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="7" cy="8" r="1.2" fill="currentColor" />
      <line x1="7" y1="11" x2="7" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 11v7M11 14c0-2 8-3 8 2v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function BriefcaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="8" width="20" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="2" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 3v13M7 11l5 5 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function ChatIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ArrowLeftIcon() {
  return (
    <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
      <path d="M9 2L2 10L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ArrowRightIcon() {
  return (
    <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
      <path d="M2 2L9 10L2 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="w-full bg-black text-white">

      {/* ── Infinite marquee ── */}
      {(() => {
        const half = 'PEI PEI WANG PEI PEI WANG PEI PEI WANG PEI PEI WANG PEI PEI WANG PEI PEI WANG '
        const cls = 'flex-none whitespace-nowrap text-[100px] lg:text-[150px] font-black uppercase text-white'
        return (
          <div className="overflow-hidden w-full pt-10 pb-2">
            <div className="marquee-track">
              <span className={cls}>{half}</span>
              <span className={cls}>{half}</span>
            </div>
          </div>
        )
      })()}

      {/* ── Design / Experiences ── */}
      <div className="py-6 flex items-baseline gap-2 justify-center">
        <span className="text-[32px] lg:text-[42px] text-[#888] font-light italic tracking-tight">Design</span>
        <span className="text-[36px] lg:text-[48px] text-white leading-tight"
          style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700 }}>
          Experiences
        </span>
      </div>

      {/* ── Footer columns ── */}
      <div className="px-8 lg:px-12 pb-14 flex flex-col lg:flex-row gap-8 lg:gap-6 border-t border-white/10 pt-8">

        {/* Company + dates — mobile: first + left-aligned; desktop: centered in row */}
        <div className="flex-none lg:mx-auto flex flex-col lg:order-2">
          {WORK_EXP.map((w, i) => (
            <div key={i} className="flex items-baseline mb-[10px]" style={{ gap: '16px' }}>
              <p className="text-[13px] font-bold text-white">{w.company}</p>
              <p className="text-[12px] text-[#666]">{w.period}</p>
            </div>
          ))}
        </div>

        {/* Contact — mobile: second; desktop: first in row */}
        <div className="flex-none lg:w-[180px] lg:order-1">
          <p className="text-[9px] font-semibold text-[#555] tracking-[2px] uppercase mb-1">Email</p>
          <p className="text-[11px] font-medium text-white mb-5 uppercase">IVORYIVY333@GMAIL.COM</p>
          <p className="text-[9px] font-semibold text-[#555] tracking-[2px] uppercase mb-1">Location</p>
          <p className="text-[11px] font-medium text-white uppercase">LOS ANGELES</p>
        </div>

        {/* Social */}
        <div className="flex-none lg:w-[130px] flex flex-col items-start lg:order-3">
          <p className="text-[9px] font-semibold text-[#555] tracking-[2px] uppercase mb-2">Social</p>
          <a href="https://www.linkedin.com/in/pei-pei-wang-58a94b9b/" target="_blank" rel="noopener noreferrer"
            className="text-[12px] font-bold text-white uppercase u-link">
            LinkedIn
          </a>
        </div>

        {/* Sections */}
        <div className="flex-none lg:w-[160px] flex flex-col items-start gap-1 lg:order-4">
          <p className="text-[9px] font-semibold text-[#555] tracking-[2px] uppercase mb-1">Sections</p>
          {['About', 'Work', 'Contact'].map(s => (
            <a key={s} href="#" className="text-[12px] font-bold text-white uppercase u-link">{s}</a>
          ))}
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="text-[12px] font-bold text-white uppercase u-link">
            Download Resume
          </a>
        </div>

      </div>
    </footer>
  )
}

// ─── Desktop Project Card ─────────────────────────────────────────────────────
function ProjectCard({ project, isActive, index = 0 }) {
  const lines = project.description.split('\n')
  const headline = lines.length > 1 ? lines[0] : null
  const body = lines.length > 1 ? lines.slice(1).join('\n') : lines[0]
  return (
    <div className="project-card card-enter flex-none w-[520px] flex flex-col gap-3"
      style={{ scrollSnapAlign: 'start', '--card-delay': `${200 + index * 55}ms` }}>
      <div className="w-full aspect-[906/654] bg-[#f0f0f0] overflow-hidden rounded-sm relative">
        <img src={project.image} alt={project.title}
          className={`project-card-img absolute inset-0 w-full h-full object-cover${isActive ? ' is-active' : ''}`}
          onError={(e) => { e.target.style.display = 'none' }} />
      </div>
      <div className="px-2.5 pt-1 pb-2 max-w-[400px]">
        <p className="font-medium text-[11px] text-black mb-1.5">
          {project.title}&nbsp;&nbsp;<span className="text-gray-400">({project.platform})</span>
        </p>
        {headline && <p className="font-semibold text-[11px] text-black mb-1 leading-snug">{headline}</p>}
        <p className="font-medium text-[11px] text-black leading-relaxed">{body}</p>
      </div>
    </div>
  )
}

// ─── Mobile Project Card ──────────────────────────────────────────────────────
function MobileCard({ project, index = 0 }) {
  const lines = project.description.split('\n')
  const headline = lines.length > 1 ? lines[0] : null
  const body = lines.length > 1 ? lines.slice(1).join('\n') : lines[0]
  return (
    <div className="project-card card-enter flex-none w-[260px] flex flex-col gap-2"
      style={{ scrollSnapAlign: 'start', '--card-delay': `${200 + index * 45}ms` }}>
      <div className="w-full aspect-[906/654] bg-[#f0f0f0] overflow-hidden rounded-sm relative">
        <img src={project.image} alt={project.title}
          className="project-card-img absolute inset-0 w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none' }} />
      </div>
      <div className="pt-0.5">
        <p className="font-medium text-[10px] text-black mb-1">
          {project.title}&nbsp;&nbsp;<span className="text-gray-400">({project.platform})</span>
        </p>
        {headline && <p className="font-semibold text-[10px] text-black mb-0.5 leading-snug">{headline}</p>}
        <p className="font-medium text-[10px] text-black leading-relaxed line-clamp-3">{body}</p>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  const [cardIndex, setCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const carouselRef = useRef(null)

  // Auto-flip back to photo after 15 s
  useEffect(() => {
    if (!isFlipped) return
    const t = setTimeout(() => setIsFlipped(false), 15000)
    return () => clearTimeout(t)
  }, [isFlipped])
  const mobileCarouselRef = useRef(null)

  const activeYear = FLAT_PROJECTS[cardIndex]?.year ?? 2026

  function scrollToIndex(idx, smooth = true) {
    const clamped = Math.max(0, Math.min(idx, FLAT_PROJECTS.length - 1))
    setCardIndex(clamped)
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: clamped * CARD_WIDTH, behavior: smooth ? 'smooth' : 'auto' })
    }
    if (mobileCarouselRef.current) {
      mobileCarouselRef.current.scrollTo({ left: clamped * MOBILE_CARD_WIDTH, behavior: smooth ? 'smooth' : 'auto' })
    }
  }

  function handleYearTab(year) { scrollToIndex(YEAR_START_INDEX[year]) }

  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return
    const idx = Math.round(carouselRef.current.scrollLeft / CARD_WIDTH)
    setCardIndex(Math.max(0, Math.min(idx, FLAT_PROJECTS.length - 1)))
  }, [])

  const handleMobileScroll = useCallback(() => {
    if (!mobileCarouselRef.current) return
    const idx = Math.round(mobileCarouselRef.current.scrollLeft / MOBILE_CARD_WIDTH)
    setCardIndex(Math.max(0, Math.min(idx, FLAT_PROJECTS.length - 1)))
  }, [])

  const SocialBar = ({ className = '', ...props }) => (
    <div className={`flex items-center justify-between ${className}`} {...props}>
      <span className="text-[11px] font-medium text-black">based in LA</span>
      <div className="flex items-center gap-[7px]">
        <a href="mailto:ivoryivy333@gmail.com" className="hover:opacity-60 transition-opacity" title="Email"><EmailIcon /></a>
        <a href="https://www.linkedin.com/in/pei-pei-wang-58a94b9b/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" title="LinkedIn"><LinkedInIcon /></a>
        <a href="https://gatherr-one.vercel.app/wards" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity" title="Website"><GlobeIcon /></a>
      </div>
    </div>
  )

  return (
    <div className="w-full bg-white font-sans">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');

        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; -ms-overflow-style: none; }

        .project-card-img { filter: grayscale(1); transition: filter 120ms ease; }
        .project-card-img.is-active { filter: grayscale(0); }
        @media (hover: none) { .project-card-img { filter: grayscale(0); } }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cascade {
          opacity: 0;
          animation: fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--delay, 0ms);
        }

        @keyframes cardIn {
          0%   { opacity: 0; transform: translateX(80px) translateY(28px) scale(0.88); filter: blur(6px); }
          55%  { opacity: 1; filter: blur(0); }
          100% { opacity: 1; transform: translateX(0) translateY(0) scale(1); filter: blur(0); }
        }
        .card-enter {
          opacity: 0;
          animation: cardIn 0.65s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: var(--card-delay, 0ms);
        }

        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 75s linear infinite;
        }

        /* ── Animated underline ── */
        .u-link {
          background-image: linear-gradient(currentColor, currentColor);
          background-repeat: no-repeat;
          background-size: 0% 1px;
          background-position: left bottom;
          transition: background-size 0.18s ease, color 0.18s ease;
        }
        .u-link:hover { background-size: 100% 1px; }

        /* ── Silver cursor ── */
        @media (pointer: fine) {
          * { cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='26' viewBox='0 0 22 26'%3E%3Cdefs%3E%3ClinearGradient id='sg' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%23ffffff'/%3E%3Cstop offset='35%25' stop-color='%23d4d4d4'/%3E%3Cstop offset='70%25' stop-color='%23909090'/%3E%3Cstop offset='100%25' stop-color='%23585858'/%3E%3C/linearGradient%3E%3ClinearGradient id='sh' x1='0' y1='0' x2='0.5' y2='1'%3E%3Cstop offset='0%25' stop-color='%23ffffff' stop-opacity='0.7'/%3E%3Cstop offset='100%25' stop-color='%23ffffff' stop-opacity='0'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpolygon points='2,1 2,21 8,15 11,24 14,23 11,14 19,14' fill='url(%23sg)' stroke='rgba(0,0,0,0.25)' stroke-width='0.6' stroke-linejoin='round'/%3E%3Cpolygon points='2,1 2,21 8,15 11,24 14,23 11,14 19,14' fill='url(%23sh)' stroke='none' stroke-linejoin='round'/%3E%3C/svg%3E") 2 1, auto !important; }
        }

        /* ── Flip card ── */
        .flip-card { perspective: 1200px; cursor: pointer; }
        .flip-card-inner {
          position: relative; width: 100%; height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .flip-card-inner.flipped { transform: rotateY(180deg); }
        .flip-card-front,
        .flip-card-back {
          position: absolute; inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border-radius: inherit;
          overflow: hidden;
        }
        .flip-card-back { transform: rotateY(180deg); }
      `}</style>


      {/* ── Top Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-[60px] bg-white border-b border-black/[0.07] flex items-center px-5 lg:px-8">
        <span className="text-[20px] lg:text-[34px] font-bold tracking-[-1.5px] lg:tracking-[-3.8px] text-black mr-auto leading-none">PEIPEI WANG</span>
        <div className="flex items-center gap-[20px] lg:gap-[40px]">
          <a href="#" className="text-black hover:opacity-60 transition-opacity lg:hover:opacity-100 lg:hover:text-black lg:transition-none">
            <span className="lg:hidden"><PersonIcon /></span>
            <span className="hidden lg:inline text-[11px] font-medium u-link">About</span>
          </a>
          <a href="#" className="text-black hover:opacity-60 transition-opacity lg:hover:opacity-100 lg:hover:text-black lg:transition-none">
            <span className="lg:hidden"><ChatIcon /></span>
            <span className="hidden lg:inline text-[11px] font-medium u-link">Contact</span>
          </a>
          <a href="#" className="text-black hover:opacity-60 transition-opacity lg:hover:opacity-100 lg:hover:text-black lg:transition-none">
            <span className="lg:hidden"><BriefcaseIcon /></span>
            <span className="hidden lg:inline text-[11px] font-medium u-link">Work</span>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="text-black hover:opacity-60 transition-opacity lg:hover:opacity-100 lg:hover:text-black lg:transition-none">
            <span className="lg:hidden"><DownloadIcon /></span>
            <span className="hidden lg:inline text-[11px] font-medium u-link">Download Resume</span>
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════
          DESKTOP layout (lg and up)
      ══════════════════════════════════════════ */}
      <div className="hidden lg:block">

        {/* Two-panel section — exactly one viewport tall */}
        <div className="flex mt-[60px]" style={{ height: 'calc(100vh - 60px)' }}>

          {/* Left sidebar */}
          <aside className="flex-none w-[440px] h-full bg-[#fdfdfd] flex flex-col pl-8 pr-[23px] pt-[26px] pb-[22px] overflow-y-auto z-40 border-r border-black/[0.04]">

            {/* Project list */}
            <div className="flex-none flex flex-col w-[195px]" style={{ gap: '7px' }}>
              {SIDEBAR_PROJECTS.map((p, i) => (
                <span
                  key={i}
                  className={`cascade text-[14px] font-medium leading-snug cursor-pointer transition-all ${
                    p.id === FLAT_PROJECTS[cardIndex]?.id ? 'text-black' : 'text-[#c1c1c1] hover:text-black u-link'}`}
                  style={{ '--delay': `${80 + i * 30}ms` }}
                  onClick={() => {
                    if (!p.id) return
                    const idx = FLAT_PROJECTS.findIndex(f => f.id === p.id)
                    if (idx >= 0) scrollToIndex(idx)
                  }}>
                  {p.label}
                </span>
              ))}
            </div>

            <div className="flex-1" />

            {/* Photo — flip card + label row */}
            <div className="cascade flex items-end gap-3 mt-5 mb-5" style={{ '--delay': '440ms' }}>
              <div className="flip-card flex-none rounded-2xl"
                style={{ aspectRatio: '609 / 712', width: '290px' }}
                onClick={() => setIsFlipped(f => !f)}>
                <div className={`flip-card-inner rounded-2xl${isFlipped ? ' flipped' : ''}`}>
                  <div className="flip-card-front bg-[#f0f0f0]">
                    <img src={PROFILE_IMG} alt="Pei Pei Wang"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      onError={(e) => { e.target.style.display = 'none' }} />
                  </div>
                  <div className="flip-card-back bg-[#e8e2da]">
                    <img src={CARD_BACK_IMG} alt="Pei Pei Card"
                      className="absolute inset-0 w-full h-full object-contain"
                      onError={(e) => { e.target.style.display = 'none' }} />
                  </div>
                </div>
              </div>
              {/* flipit label — outside, right of the card */}
              <img src="/images/flipit.png" alt="flip card"
                className="flex-none w-[82px] pointer-events-none select-none mb-6"
                style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.12))' }} />
            </div>

            {/* Social */}
            <SocialBar className="cascade flex-none" style={{ '--delay': '520ms' }} />
          </aside>

          {/* Right panel */}
          <main className="flex-1 flex flex-col h-full overflow-hidden relative">
            <div className="flex-none pl-[24px] pt-[26px] pb-0">
              <div className="cascade text-[34px] font-bold tracking-[-3.8px] text-black leading-none select-none"
                style={{ '--delay': '100ms' }}>{activeYear}</div>
            </div>
            <div ref={carouselRef} onScroll={handleScroll}
              className="flex-1 flex items-start gap-8 px-[24px] pt-[36px] pb-[140px] overflow-x-auto"
              style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
              {FLAT_PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} isActive={i === cardIndex} index={i} />)}
              <div className="flex-none w-[1px]" style={{ scrollSnapAlign: 'end' }} />
            </div>

            {/* Controls — absolute so they don't overlap footer */}
            <div className="absolute bottom-[36px] left-0 right-0 flex flex-col items-center gap-[18px] pointer-events-none">
              <div className="pointer-events-auto flex items-center gap-4">
                <button onClick={() => scrollToIndex(cardIndex - 1)} disabled={cardIndex === 0}
                  className="w-[44px] h-[44px] rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-20 transition-all">
                  <ArrowLeftIcon />
                </button>
                <button onClick={() => scrollToIndex(cardIndex + 1)} disabled={cardIndex === FLAT_PROJECTS.length - 1}
                  className="w-[44px] h-[44px] rounded-full flex items-center justify-center hover:bg-gray-100 disabled:opacity-20 transition-all">
                  <ArrowRightIcon />
                </button>
              </div>
              <div className="pointer-events-auto flex items-center gap-[21px]">
                {YEARS.map(year => (
                  <button key={year} onClick={() => handleYearTab(year)}
                    className={`h-[60px] px-2 text-[11px] font-medium tracking-[-1.32px] transition-opacity ${
                      year === activeYear ? 'text-black opacity-100' : 'text-black opacity-25 hover:text-black hover:opacity-100 u-link'}`}>
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>

        {/* Full-width footer */}
        <Footer />
      </div>

      {/* ══════════════════════════════════════════
          MOBILE layout (below lg)
      ══════════════════════════════════════════ */}
      <div className="lg:hidden flex flex-col min-h-screen pt-[60px]">
        <div className="flex flex-col px-5 pt-6 pb-4 bg-[#fdfdfd]">

          {/* Photo — flip card (mobile) */}
          <div className="cascade flip-card rounded-xl mt-4 mb-4 mx-auto"
            style={{ '--delay': '0ms', aspectRatio: '609 / 712', width: '260px' }}
            onClick={() => setIsFlipped(f => !f)}>
            <div className={`flip-card-inner rounded-xl${isFlipped ? ' flipped' : ''}`}>
              <div className="flip-card-front bg-[#f0f0f0]">
                <img src={PROFILE_IMG} alt="Pei Pei Wang"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  onError={(e) => { e.target.style.display = 'none' }} />
                <img src="/images/flipit.png" alt="flip card"
                  className="absolute bottom-3 right-2 w-[76px] pointer-events-none select-none"
                  style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.25))' }} />
              </div>
              <div className="flip-card-back bg-[#e8e2da]">
                <img src={CARD_BACK_IMG} alt="Pei Pei Card"
                  className="absolute inset-0 w-full h-full object-contain"
                  onError={(e) => { e.target.style.display = 'none' }} />
              </div>
            </div>
          </div>

          <div className="cascade text-[28px] font-bold tracking-[-2.5px] text-black leading-none mb-3 select-none"
            style={{ '--delay': '140ms' }}>
            {activeYear}
          </div>

          <div className="cascade" style={{ '--delay': '180ms' }}>
            <div ref={mobileCarouselRef} onScroll={handleMobileScroll}
              className="flex gap-4 overflow-x-auto pb-3"
              style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
              {FLAT_PROJECTS.map((p, i) => <MobileCard key={p.id} project={p} index={i} />)}
              <div className="flex-none w-4" />
            </div>
          </div>

          <div className="cascade flex items-center gap-4 mt-3 mb-5" style={{ '--delay': '220ms' }}>
            {YEARS.map(year => (
              <button key={year} onClick={() => handleYearTab(year)}
                className={`text-[11px] font-medium tracking-[-1px] transition-opacity ${
                  year === activeYear ? 'text-black opacity-100' : 'text-black opacity-25'}`}>
                {year}
              </button>
            ))}
          </div>

          <div className="flex flex-col mb-5" style={{ gap: '7px' }}>
            {SIDEBAR_PROJECTS.map((p, i) => (
              <span
                key={i}
                className={`cascade text-[13px] font-medium leading-snug cursor-pointer transition-colors ${
                  p.id === FLAT_PROJECTS[cardIndex]?.id ? 'text-black' : 'text-[#c1c1c1]'}`}
                style={{ '--delay': `${280 + i * 25}ms` }}
                onClick={() => {
                  if (!p.id) return
                  const idx = FLAT_PROJECTS.findIndex(f => f.id === p.id)
                  if (idx >= 0) scrollToIndex(idx)
                }}>
                {p.label}
              </span>
            ))}
          </div>

          <SocialBar className="cascade pb-6" style={{ '--delay': '580ms' }} />
        </div>

        <Footer />
      </div>

    </div>
  )
}

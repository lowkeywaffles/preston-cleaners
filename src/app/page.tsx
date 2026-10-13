"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Clock, CreditCard, Drop, Leaf, Lightning, MapPin, NavigationArrow, Phone, Scissors, Sun, TShirt, WashingMachine, CoatHanger } from "@phosphor-icons/react";
import { MagicCard } from "@/components/ui/magic-card";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, Wrap, flipTheme, type Hours } from "@/components/kit";
import { Faq, HoursTable, MapFrame, useDark, useStatus } from "@/components/blocks";
import { T, useLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const TEL = "tel:+19722392212", PHONE = "(972) 239-2212";
const DIR = "https://www.google.com/maps/dir/?api=1&destination=14760+Preston+Rd+Ste+100+Dallas+TX+75254";
const HOURS: Hours = { 0: null, 1: [7, 19], 2: [7, 19], 3: [7, 19], 4: [7, 19], 5: [7, 19], 6: [7, 17] };
const SERVICES = [
  { k: "s1", Icon: CoatHanger, cls: "md:col-span-7 md:row-span-2", big: true },
  { k: "s2", Icon: TShirt, cls: "md:col-span-5" },
  { k: "s3", Icon: WashingMachine, cls: "md:col-span-5" },
  { k: "s4", Icon: Scissors, cls: "md:col-span-4" },
  { k: "s5", Icon: Drop, cls: "md:col-span-4" },
  { k: "s6", Icon: Lightning, cls: "md:col-span-4" },
];
const PERKS = [["k1", Sun], ["k2", Clock], ["k3", Leaf], ["k4", CreditCard]] as const;
const LBL = { en: { lang: "Cambiar a español", theme: "Toggle dark mode" }, es: { lang: "Switch to English", theme: "Cambiar modo oscuro" } };

const btn = "inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-[15px] font-bold transition-[transform,background-color] duration-300 ease-spring hover:-translate-y-0.5 active:scale-[.97]";
const primary = cn(btn, "bg-navy text-white shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_14px_30px_-14px_rgba(26,42,74,.8)]");
const ghost = cn(btn, "bg-card text-ink shadow-[inset_0_0_0_1px_var(--line)]");
const eyebrow = "mb-3 block text-[13px] font-extrabold tracking-[.16em] text-tagtext uppercase";

/** Language: a perforated claim ticket that flips over, EN on the front, ES on the back. */
function Ticket() {
  const { lang, setLang } = useLang();
  const es = lang === "es";
  const face = "perf absolute inset-0 flex items-center justify-center gap-1 rounded-[5px] text-[13px] font-extrabold tracking-[.06em] text-[#3b1400] [backface-visibility:hidden] after:absolute after:inset-y-1 after:left-4 after:border-l-[1.5px] after:border-dashed after:border-[#3b1400]/45";
  return (
    <button type="button" onClick={() => setLang(es ? "en" : "es")} aria-label={LBL[es ? "es" : "en"].lang} className="relative h-10 w-[66px] flex-none cursor-pointer [perspective:260px]">
      <motion.span animate={{ rotateX: es ? 180 : 0 }} transition={{ type: "spring", stiffness: 220, damping: 16 }} className="absolute inset-0 [transform-style:preserve-3d]">
        <span className={cn(face, "bg-tag")}><span className="ms-2.5">EN</span><small className="text-[8px] opacity-70">No.1</small></span>
        <span className={cn(face, "bg-[#fff3ea] [transform:rotateX(180deg)]")}><span className="ms-2.5">ES</span><small className="text-[8px] opacity-70">No.2</small></span>
      </motion.span>
    </button>
  );
}

/** Theme: a hanger that swings; a white shirt by day, a navy suit jacket at night. */
function Hanger() {
  const { dark, setTheme } = useDark();
  const { lang } = useLang();
  const [swing, setSwing] = useState(0);
  return (
    <button type="button" aria-label={LBL[lang === "es" ? "es" : "en"].theme} aria-pressed={dark}
      onClick={e => { setSwing(s => s + 1); flipTheme(e.currentTarget, () => flushSync(() => setTheme(dark ? "light" : "dark"))); }}
      className="grid size-[46px] flex-none cursor-pointer place-items-center rounded-full bg-card shadow-[inset_0_0_0_1px_var(--line)]">
      <svg key={swing} viewBox="0 0 40 40" className={cn("size-[34px] overflow-visible [transform-origin:50%_8%]", swing && "swing")} aria-hidden="true">
        <path d="M20 4a3 3 0 1 1 3 3c-1 0-3 .5-3 2.5" fill="none" stroke="var(--soft)" strokeWidth="1.6" strokeLinecap="round" />
        <g className="transition-opacity duration-300" style={{ opacity: dark ? 0 : 1 }}><path d="M10 18l6-2 4 3 4-3 6 2 2 8-4 1v11H12V27l-4-1z" fill="#fff" stroke="#1a2a4a" strokeWidth="1.4" strokeLinejoin="round" /><path d="M20 19v19" stroke="#1a2a4a" strokeWidth="1" strokeDasharray="1.5 3" /></g>
        <g className="transition-opacity duration-300" style={{ opacity: dark ? 1 : 0 }}><path d="M10 18l6-2 4 8 4-8 6 2 2 8-4 1v11H12V27l-4-1z" fill="#24345e" stroke="#a8bcf0" strokeWidth="1.2" strokeLinejoin="round" /><path d="M18 17l2 7 2-7" fill="#fff" /><circle cx="20" cy="30" r="1" fill="#a8bcf0" /><circle cx="20" cy="34" r="1" fill="#a8bcf0" /></g>
      </svg>
    </button>
  );
}

const HOOK = <><path d="M60 0v14" stroke="#8e98aa" strokeWidth="3" /><path d="M60 14l42 22H18z" fill="none" stroke="#8e98aa" strokeWidth="3" strokeLinejoin="round" /></>;
const GARMENTS = [
  { vb: "0 0 120 230", tag: "#0418", art: <><path d="M14 40l26-8 20 14 20-14 26 8 8 40-18 4v130H24V84L6 80z" fill="#fff" stroke="#c9d0dc" strokeWidth="2" strokeLinejoin="round" /><path d="M60 46v168" stroke="#c9d0dc" strokeWidth="2" strokeDasharray="2 10" /><path d="M6 36h108v190H6z" fill="var(--bag)" /></> },
  { vb: "0 0 120 260", tag: "#0419", art: <><path d="M40 36h40l4 40 26 150H10L36 76z" fill="#ff7a45" /><path d="M40 36c6 14 34 14 40 0" fill="none" stroke="#c2501f" strokeWidth="2" /><path d="M36 76h48" stroke="#c2501f" strokeWidth="3" /><path d="M6 36h108v220H6z" fill="var(--bag)" /></> },
  { vb: "0 0 120 240", tag: "#0420", art: <><path d="M14 40l28-8 18 50 18-50 28 8 8 44-18 4v130H24V88L6 84z" fill="#1a2a4a" stroke="#0e1424" strokeWidth="2" strokeLinejoin="round" /><path d="M42 32l18 50 18-50" fill="#fff" /><path d="M54 40h12l-6 10z" fill="#ff7a45" /><circle cx="60" cy="120" r="3" fill="#8e98aa" /><circle cx="60" cy="146" r="3" fill="#8e98aa" /><path d="M6 36h108v200H6z" fill="var(--bag)" /></> },
];

/** The garment rail: three bagged pieces on hangers that swing a little as you scroll past. */
function Rail() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(".garment", { y: -40, opacity: 0, rotate: -6, stagger: 0.15, duration: 1.2, ease: "elastic.out(1, 0.6)", delay: 0.3, transformOrigin: "50% 0%" });
      gsap.to(".garment", { rotate: (i: number) => [4, -3, 5][i], transformOrigin: "50% 0%", ease: "none", scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: true } });
    });
  }, { scope: ref });
  return (
    <div ref={ref} className="relative aspect-[1.05]" aria-hidden="true">
      <div className="absolute inset-x-[4%] top-[8%] h-2 rounded bg-[linear-gradient(#c9d0dc,#8e98aa)] shadow-[0_3px_6px_var(--shadow)]" />
      {GARMENTS.map((g, i) => (
        <div key={g.tag} className="garment absolute top-[8%] w-[30%]" style={{ left: `${6 + i * 29}%` }}>
          <div className="sway" style={{ animationDelay: `${-2 * i}s` }}>
            <svg viewBox={g.vb} className="block h-auto w-full overflow-visible drop-shadow-[0_18px_18px_var(--shadow)]">{HOOK}{g.art}</svg>
            <span className="absolute right-[6%] bottom-[14%] -rotate-6 rounded-[3px] bg-tag px-1.5 py-1 text-[10px] font-extrabold text-[#3b1400]">{g.tag}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const t = useT();
  const status = useStatus(HOURS);

  return (
    <>
      <header className="pointer-events-none sticky top-3 z-40 px-4">
        <nav className="glass pointer-events-auto mx-auto flex h-[70px] max-w-[1160px] items-center justify-between gap-3 rounded-[20px] border border-line ps-3 pe-2.5 shadow-[inset_0_1px_0_var(--hi),0_20px_50px_-28px_var(--shadow)]">
          <a href="#top" className="flex min-w-0 items-center gap-2.5" aria-label="Preston Cleaners">
            <span className="grid size-11 flex-none place-items-center rounded-xl bg-navy"><CoatHanger size={24} color="#fff" /></span>
            <span className="min-w-0"><b className="block font-display text-[25px] leading-none font-normal max-sm:text-[20px]">Preston Cleaners</b><T k="logoSub" className="mt-0.5 block text-[11px] font-extrabold tracking-[.16em] text-soft uppercase max-sm:hidden" /></span>
          </a>
          <div className="flex items-center gap-1 text-[15px] font-semibold max-[900px]:hidden">
            {[["services", "navServices"], ["visit", "navVisit"]].map(([id, k]) => <a key={id} href={`#${id}`} className="rounded-xl px-4 py-2 text-soft transition-colors hover:bg-bg2 hover:text-ink" dangerouslySetInnerHTML={{ __html: t(k) }} />)}
          </div>
          <div className="flex flex-none items-center gap-3 max-sm:gap-2">
            <Ticket /><Hanger />
            <a href={TEL} className={cn(primary, "px-5 py-2.5 max-sm:hidden")}><Phone size={17} weight="bold" />{PHONE}</a>
          </div>
        </nav>
      </header>

      <main id="top">
        <section className="pinstripe relative overflow-hidden pt-16 pb-24 max-sm:pt-10">
          <Wrap className="grid grid-cols-[1.05fr_.95fr] items-center gap-12 max-[960px]:grid-cols-1">
            <div>
              <Reveal>
                <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-card px-3.5 py-1.5 text-sm font-bold shadow-[inset_0_0_0_1px_var(--line)]">
                  <i className={cn("size-2 rounded-full", status.open ? "bg-[#22a35a] shadow-[0_0_0_4px_rgba(34,163,90,.2)]" : "bg-[#9aa3b8]")} />{status.text || " "}
                </span>
              </Reveal>
              <Reveal delay={0.08}><T k="heroTitle" as="h1" className="mb-6 text-[clamp(56px,7.6vw,108px)] leading-[.95]" /></Reveal>
              <Reveal delay={0.16}><T k="heroLead" as="p" className="mb-9 max-w-[48ch] text-lg text-soft" /></Reveal>
              <Reveal delay={0.24} className="mb-8 flex flex-wrap gap-3">
                <a href={TEL} className={primary}><Phone size={18} weight="bold" /><T k="ctaCall" /></a>
                <a href={DIR} target="_blank" rel="noopener" className={ghost}><NavigationArrow size={18} weight="bold" /><T k="ctaDir" /></a>
              </Reveal>
              <Reveal delay={0.3} className="perf inline-flex items-center gap-3.5 rounded-xl bg-card py-3 ps-5 pe-6 shadow-[inset_0_0_0_1px_var(--line)]">
                <span className="grid size-10 flex-none place-items-center rounded-full bg-tag text-[#3b1400]"><Clock size={20} weight="bold" /></span>
                <T k="same" className="text-[13.5px] text-soft [&_b]:block [&_b]:text-[15px] [&_b]:text-ink" />
              </Reveal>
            </div>
            <Reveal delay={0.15} className="w-full max-w-[540px] justify-self-end max-[960px]:justify-self-center"><Rail /></Reveal>
          </Wrap>
        </section>

        <div className="bg-navy py-5 text-white" aria-hidden="true">
          <Marquee className="[--duration:26s] [--gap:3rem]">
            {["r1", "r2", "r3", "r4"].map(k => <span key={k} className="flex items-center gap-12 font-display text-[28px]"><T k={k} /><i className="size-2.5 rounded-sm bg-tag" /></span>)}
          </Marquee>
        </div>

        <section id="services" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-14 max-w-[720px]"><T k="svcEyebrow" className={eyebrow} /><T k="svcTitle" as="h2" className="mb-4 text-[clamp(46px,6vw,80px)]" /><T k="svcLead" as="p" className="max-w-[58ch] text-[17px] text-soft" /></Reveal>
            <div className="grid auto-rows-[minmax(210px,auto)] grid-cols-1 gap-4 md:grid-cols-12">
              {SERVICES.map(({ k, Icon, cls, big }, i) => (
                <Reveal key={k} delay={(i % 3) * 0.06} className={cn("bezel rounded-[24px] transition-transform duration-500 ease-silk hover:-translate-y-1", cls)}>
                  <MagicCard gradientSize={240} gradientColor="rgba(255,122,69,.1)" gradientFrom="#ff7a45" gradientTo="#1a2a4a" className="h-full rounded-[19px] [&>div:last-child]:h-full">
                    <div className={cn("relative flex h-full flex-col justify-between gap-8 p-7", big && "pinstripe bg-navy p-10 text-white")}>
                      <div className="flex items-start justify-between">
                        <span className={cn("grid place-items-center rounded-2xl", big ? "size-16 bg-white/10" : "size-12 bg-bg2 text-navy dark:text-[#a8bcf0]")}><Icon size={big ? 32 : 24} weight="duotone" /></span>
                        <span className={cn("perf rounded-[4px] px-3 py-1 font-display text-sm", big ? "bg-tag text-[#3b1400]" : "bg-bg2 text-soft")}>No. 0{i + 1}</span>
                      </div>
                      <div>
                        <T k={`${k}t`} as="h3" className={cn("mb-2", big ? "text-[clamp(48px,5vw,72px)]" : "text-[32px]")} />
                        <T k={`${k}p`} as="p" className={cn("max-w-[42ch] text-[15px]", big ? "text-[17px] text-white/70" : "text-soft")} />
                      </div>
                    </div>
                  </MagicCard>
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section className="bg-bg2 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12 max-w-[720px]"><T k="perkEyebrow" className={eyebrow} /><T k="perkTitle" as="h2" className="text-[clamp(46px,6vw,80px)]" /></Reveal>
            <div className="grid grid-cols-4 gap-4 max-[960px]:grid-cols-2 max-sm:grid-cols-1">
              {PERKS.map(([k, Icon], i) => (
                <Reveal key={k} delay={i * 0.06} className={cn("perf rounded-2xl bg-card px-7 py-8 shadow-[inset_0_0_0_1px_var(--line)]", i % 2 && "lg:translate-y-6")}>
                  <Icon size={30} weight="duotone" className="mb-6 text-tagtext" />
                  <T k={`${k}t`} as="b" className="mb-1.5 block font-display text-[28px] font-normal" />
                  <T k={`${k}p`} as="p" className="text-[15px] text-soft" />
                </Reveal>
              ))}
            </div>
          </Wrap>
        </section>

        <section id="visit" className="scroll-mt-24 py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="mb-12"><T k="visitEyebrow" className={eyebrow} /><T k="visitTitle" as="h2" className="text-[clamp(46px,6vw,80px)]" /></Reveal>
            <div className="grid grid-cols-[.9fr_1.1fr] gap-5 max-[960px]:grid-cols-1">
              <Reveal className="bezel rounded-[26px]">
                <div className="grid h-full content-start gap-5 rounded-[21px] bg-card p-8 shadow-[inset_0_1px_0_var(--hi)]">
                  <T k="hoursTitle" as="h3" className="text-[40px]" />
                  <HoursTable hours={HOURS} accent="text-tagtext" />
                  {([[TEL, Phone, PHONE, "callSub"], [DIR, MapPin, "14760 Preston Rd, Ste 100", null]] as const).map(([href, I, strong, sub]) => (
                    <a key={strong} href={href} target={sub ? undefined : "_blank"} rel="noopener" className="group flex items-start gap-3.5">
                      <span className="grid size-11 flex-none place-items-center rounded-xl bg-navy text-white transition-transform duration-300 ease-spring group-hover:scale-110"><I size={20} weight="bold" /></span>
                      <span><strong className="block">{strong}</strong>{sub ? <T k={sub} className="text-sm text-soft" /> : <span className="text-sm text-soft">Dallas, TX 75254</span>}</span>
                    </a>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={0.08} className="bezel min-h-[440px] overflow-hidden rounded-[26px]"><MapFrame q="14760+Preston+Rd+Ste+100,+Dallas,+TX+75254" className="min-h-[428px] rounded-[21px]" /></Reveal>
            </div>
          </Wrap>
        </section>

        <section className="bg-bg2 py-32 max-sm:py-20">
          <Wrap className="grid grid-cols-[.8fr_1.2fr] gap-14 max-[960px]:grid-cols-1">
            <Reveal><T k="faqEyebrow" className={eyebrow} /><T k="faqTitle" as="h2" className="text-[clamp(46px,6vw,76px)]" /></Reveal>
            <Faq ids={[1, 2, 3, 4]} accent="text-tagtext" />
          </Wrap>
        </section>

        <section className="py-32 max-sm:py-20">
          <Wrap>
            <Reveal className="pinstripe relative flex items-center justify-between gap-8 overflow-hidden rounded-[32px] bg-navy px-14 py-20 text-white max-[960px]:flex-col max-[960px]:items-start max-sm:px-7 max-sm:py-14">
              <div><T k="ctaTitle" as="h2" className="mb-3 text-[clamp(46px,6vw,84px)] [&_em]:text-tag" /><T k="ctaLead" as="p" className="text-lg text-white/70" /></div>
              <a href={TEL} className={cn(btn, "perf flex-none bg-tag px-8 py-4 text-lg text-[#3b1400]")}><Phone size={20} weight="bold" />{PHONE}</a>
            </Reveal>
          </Wrap>
        </section>
      </main>

      <footer className="pb-28 text-sm text-soft">
        <Wrap><div className="flex flex-wrap justify-between gap-3.5 border-t border-line pt-6"><span>© {new Date().getFullYear()} Preston Cleaners · 14760 Preston Rd, Ste 100, Dallas, TX 75254</span><a href={TEL}>{PHONE}</a></div></Wrap>
      </footer>
      <div className="glass fixed inset-x-3 bottom-3 z-30 hidden gap-2 rounded-2xl p-1.5 shadow-[inset_0_0_0_1px_var(--line)] max-sm:flex">
        <a href={TEL} className={cn(primary, "flex-1 py-3")}><T k="barCall" /></a>
        <a href={DIR} target="_blank" rel="noopener" className={cn(ghost, "flex-1 py-3")}><T k="barDir" /></a>
      </div>
    </>
  );
}

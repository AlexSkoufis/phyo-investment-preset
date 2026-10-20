"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Page-wide motion layer: Lenis smooth scrolling plus GSAP reveals driven by
// data attributes. Content is rendered in its final state on the server, so
// nothing depends on this running. With prefers-reduced-motion it does nothing.
export default function Motion() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const root = document.documentElement;
    root.classList.add("has-motion");

    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    window.__lenis = lenis;

    // In-page anchors scroll through Lenis so the easing matches.
    const onAnchorClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (hash.length < 2) return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -24, duration: 1.4 });
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };
    document.addEventListener("click", onAnchorClick);

    const cleanups = [];
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
      // Hero entrance
      const hero = document.querySelector("[data-hero]");
      if (hero) {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(hero.querySelectorAll(".line__inner"), { yPercent: 115, duration: 1.4, stagger: 0.12 }, 0.1)
          .from(hero.querySelectorAll("[data-hero-fade]"), { y: 24, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.5)
          .from(hero.querySelectorAll(".rings [data-draw]"), {
            strokeDashoffset: 1,
            duration: 2.4,
            stagger: 0.06,
            ease: "power3.inOut",
          }, 0);

        const rings = hero.querySelector(".rings__spin");
        if (rings) gsap.to(rings, { rotation: 360, duration: 120, repeat: -1, ease: "none", transformOrigin: "50% 50%" });

        // Rings drift with the pointer and sink on scroll.
        const visual = hero.querySelector("[data-hero-visual]");
        if (visual) {
          gsap.to(visual, {
            yPercent: 18,
            ease: "none",
            scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: true },
          });
          if (finePointer) {
            const inner = visual.querySelector(".rings");
            const xTo = gsap.quickTo(inner, "x", { duration: 1.2, ease: "power3.out" });
            const yTo = gsap.quickTo(inner, "y", { duration: 1.2, ease: "power3.out" });
            const onMove = (e) => {
              xTo((e.clientX / window.innerWidth - 0.5) * 36);
              yTo((e.clientY / window.innerHeight - 0.5) * 36);
            };
            hero.addEventListener("pointermove", onMove);
            cleanups.push(() => hero.removeEventListener("pointermove", onMove));
          }
        }
      }

      // Section headings: masked line reveal
      gsap.utils.toArray("[data-split]").forEach((el) => {
        if (el.closest("[data-hero]")) return;
        gsap.from(el.querySelectorAll(".line__inner"), {
          yPercent: 115,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          y: 40,
          autoAlpha: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Counters count up from zero to the server-rendered value.
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const state = { v: 0 };
        gsap.to(state, {
          v: end,
          duration: 2,
          ease: "power2.out",
          delay: el.closest("[data-hero]") ? 0.8 : 0,
          onUpdate: () => (el.textContent = Math.round(state.v)),
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        });
      });

      // Principles: earlier cards recede as the next one stacks over them.
      const cards = gsap.utils.toArray("[data-stack-card]");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.firstElementChild, {
          scale: 0.92,
          autoAlpha: 0.35,
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
        });
      });

      // Process timeline line draws with scroll.
      gsap.utils.toArray("[data-progress-line]").forEach((line) => {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: line.parentElement, start: "top 75%", end: "bottom 55%", scrub: true },
          },
        );
      });

      // Regional statement: words light up as you read.
      gsap.utils.toArray("[data-scrub-words]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".word"),
          { opacity: 0.18 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
      });

      gsap.utils.toArray("[data-speed]").forEach((el) => {
        gsap.to(el, {
          yPercent: Number(el.dataset.speed) * -100,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });

    // Magnetic buttons on precise pointers only.
    if (finePointer) {
      document.querySelectorAll("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
        const move = (e) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
        };
        const leave = () => {
          xTo(0);
          yTo(0);
        };
        el.addEventListener("pointermove", move);
        el.addEventListener("pointerleave", leave);
        cleanups.push(() => {
          el.removeEventListener("pointermove", move);
          el.removeEventListener("pointerleave", leave);
          gsap.set(el, { clearProps: "transform" });
        });
      });
    }

    // Fonts can shift layout after first paint.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
      root.classList.remove("has-motion");
    };
  }, []);

  return null;
}

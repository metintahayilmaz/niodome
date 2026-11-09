"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import Matter from "matter-js";
import Link from "@/components/common/LocalizedLink";
import styles from "./GravityContact.module.css";

type Props = { title?: string; description?: string; button?: string };

export default function GravityContact({ title, description, button }: Props) {
  const t = useTranslations("innerContent");
  const labels = useTranslations("gravityContact");
  const fieldRef = useRef<HTMLDivElement>(null);
  const items = labels.raw("items") as string[];

  useEffect(() => {
    const field = fieldRef.current;
    if (!field || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const chips = Array.from(field.querySelectorAll<HTMLElement>("[data-gravity-chip]"));
    let disposeWorld = () => {};
    let disposed = false;
    let visible = false;
    let frame = 0;
    let previous = 0;
    let engine: Matter.Engine | null = null;
    let bodies: Matter.Body[] = [];
    let active: { pointerId: number; body: Matter.Body; constraint: Matter.Constraint; x: number; y: number; time: number; vx: number; vy: number } | null = null;

    const release = () => {
      if (!active || !engine) return;
      const released = active;
      active = null;
      Matter.Composite.remove(engine.world, released.constraint);
      const moving = performance.now() - released.time < 120;
      Matter.Body.setVelocity(released.body, { x: moving ? released.vx : 0, y: moving ? released.vy : 0 });
      if (field.hasPointerCapture(released.pointerId)) field.releasePointerCapture(released.pointerId);
      field.removeAttribute("data-dragging");
    };
    const tick = (time: number) => {
      if (!engine || !visible || disposed) return;
      Matter.Engine.update(engine, previous ? Math.min(time - previous, 1000 / 60) : 1000 / 60);
      previous = time;
      bodies.forEach((body, index) => {
        chips[index].style.transform = `translate3d(${body.position.x - body.plugin.width / 2}px, ${body.position.y - body.plugin.height / 2}px, 0) rotate(${body.angle}rad)`;
      });
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!engine || !visible || disposed || frame) return;
      previous = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      previous = 0;
      release();
    };
    const build = () => {
      stop();
      disposeWorld();
      const width = field.clientWidth;
      const height = field.clientHeight;
      if (!width || !height || disposed) return;
      field.removeAttribute("data-ready");
      engine = Matter.Engine.create({ enableSleeping: true });
      engine.gravity.y = 1;
      const wall = 100;
      Matter.Composite.add(engine.world, [
        Matter.Bodies.rectangle(width / 2, height + wall / 2, width + wall * 2, wall, { isStatic: true }),
        Matter.Bodies.rectangle(-wall / 2, height / 2, wall, height * 3, { isStatic: true }),
        Matter.Bodies.rectangle(width + wall / 2, height / 2, wall, height * 3, { isStatic: true }),
        Matter.Bodies.rectangle(width / 2, -wall / 2, width + wall * 2, wall, { isStatic: true }),
      ]);
      bodies = chips.map((chip, index) => {
        const w = chip.offsetWidth;
        const h = chip.offsetHeight;
        const x = w / 2 + ((index + 0.5) / chips.length) * Math.max(0, width - w);
        const body = Matter.Bodies.rectangle(x, 35 + (index % 4) * 55, w, h, {
          restitution: 0.55, friction: 0.25, frictionAir: 0.015,
          plugin: { width: w, height: h },
        });
        Matter.Body.setAngle(body, (index % 3 - 1) * 0.15);
        return body;
      });
      Matter.Composite.add(engine.world, bodies);
      field.setAttribute("data-ready", "true");
      disposeWorld = () => {
        if (engine) { Matter.Composite.clear(engine.world, false); Matter.Engine.clear(engine); engine = null; }
      };
      start();
    };
    const position = (event: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const down = (event: PointerEvent) => {
      if (!engine || active || event.button !== 0) return;
      const chip = (event.target as Element).closest<HTMLElement>("[data-gravity-chip]");
      if (!chip) return;
      const body = bodies[chips.indexOf(chip)];
      if (!body) return;
      event.preventDefault();
      const point = position(event);
      Matter.Sleeping.set(body, false);
      const constraint = Matter.Constraint.create({
        pointA: point, bodyB: body,
        pointB: Matter.Vector.sub(point, body.position),
        length: 0, stiffness: 0.3, damping: 0.12,
      });
      Matter.Composite.add(engine.world, constraint);
      active = { pointerId: event.pointerId, body, constraint, ...point, time: event.timeStamp, vx: 0, vy: 0 };
      field.setPointerCapture(event.pointerId);
      field.setAttribute("data-dragging", "true");
    };
    const move = (event: PointerEvent) => {
      if (!active || event.pointerId !== active.pointerId) return;
      const point = position(event);
      const elapsed = Math.max(8, event.timeStamp - active.time);
      const limit = (value: number) => Math.max(-24, Math.min(24, value));
      active.vx = limit((point.x - active.x) * 16.667 / elapsed);
      active.vy = limit((point.y - active.y) * 16.667 / elapsed);
      active.constraint.pointA = point;
      active.x = point.x; active.y = point.y; active.time = event.timeStamp;
      Matter.Sleeping.set(active.body, false);
    };
    field.addEventListener("pointerdown", down);
    field.addEventListener("pointermove", move);
    field.addEventListener("pointerup", release);
    field.addEventListener("pointercancel", release);
    field.addEventListener("lostpointercapture", release);
    const visibility = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    });
    visibility.observe(field);
    let lastWidth = 0;
    const resize = new ResizeObserver(() => {
      if (field.clientWidth !== lastWidth) { lastWidth = field.clientWidth; build(); }
    });
    resize.observe(field);
    void document.fonts.ready.then(() => { if (!disposed) build(); });
    const onVisibility = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      disposed = true;
      stop(); disposeWorld(); visibility.disconnect(); resize.disconnect();
      field.removeEventListener("pointerdown", down);
      field.removeEventListener("pointermove", move);
      field.removeEventListener("pointerup", release);
      field.removeEventListener("pointercancel", release);
      field.removeEventListener("lostpointercapture", release);
      document.removeEventListener("visibilitychange", onVisibility);
      field.removeAttribute("data-ready");
    };
  }, [items]);

  return (
    <section className={styles.section} aria-label={title || t("projectCta")}>
      <div className={styles.copy}>
        <Link href="/contact" className={styles.eyebrow}>[ {button || t("write")} ]</Link>
        <h2><Link href="/contact">{title || t("projectCta")}</Link></h2>
        {description && <p>{description}</p>}
      </div>
      <div ref={fieldRef} className={styles.field} aria-label={labels("hint")}>
        {items.map(item => <span key={item} data-gravity-chip className={styles.chip}>{item}</span>)}
      </div>
      <p className={styles.hint}>{labels("hint")}</p>
    </section>
  );
}

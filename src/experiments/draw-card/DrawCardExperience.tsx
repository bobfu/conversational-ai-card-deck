"use client";

import Matter from "matter-js";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import type { CardSeries } from "@/data/cards";
import { getInspirationCards, type InspirationCard } from "./inspiration";
import styles from "./DrawCardExperience.module.css";

type DrawFilter = CardSeries | "all";
type MotionControlState = "idle" | "active" | "unsupported" | "denied";
type SensorPermissionResponse = "granted" | "denied";

type SensorPermissionConstructor = {
  requestPermission?: () => Promise<SensorPermissionResponse>;
};

type DragState = {
  lastX: number;
  lastY: number;
  lastTime: number;
};

function pickRandom<T>(items: T[], avoid?: T | null) {
  if (items.length === 0) return null;
  if (items.length === 1) return items[0];

  let next = items[Math.floor(Math.random() * items.length)];
  while (next === avoid) {
    next = items[Math.floor(Math.random() * items.length)];
  }
  return next;
}

function getCapsuleSize(card: InspirationCard, index: number) {
  const wordLength = card.words[0].length;
  const supportLength = card.words.slice(1).join("").length;
  const width = Math.min(238, Math.max(132, wordLength * 31 + supportLength * 4 + 76));
  const height = 62 + (index % 3) * 3;

  return { width, height };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getOpenCapsuleTarget(bounds: DOMRect, visualWidth: number, visualHeight: number) {
  const safeX = visualWidth / 2 + 18;
  const safeY = visualHeight / 2 + 18;

  return {
    x: clamp(bounds.width / 2, safeX, bounds.width - safeX),
    y: clamp(bounds.height * 0.46, safeY, bounds.height - safeY)
  };
}

function shakeCapsules(bodies: Record<string, Matter.Body>, strength = 1) {
  for (const [index, body] of Object.values(bodies).entries()) {
    if (body.isStatic) continue;

    const direction = index % 2 === 0 ? 1 : -1;
    const sideKick = ((index % 5) - 2) * 1.4 + direction * 2.4;

    Matter.Body.setVelocity(body, {
      x: body.velocity.x + sideKick * strength,
      y: body.velocity.y - (5.8 + (index % 4)) * strength
    });
    Matter.Body.setAngularVelocity(
      body,
      body.angularVelocity + direction * (0.12 + (index % 3) * 0.035) * strength
    );
  }
}

function pushCapsulesNearPoint(
  bodies: Record<string, Matter.Body>,
  x: number,
  y: number,
  velocityX: number,
  velocityY: number
) {
  const speed = Math.hypot(velocityX, velocityY);
  if (speed < 0.08) return;

  const radius = 190;
  const strength = clamp(speed / 18, 0.18, 1.6);

  for (const body of Object.values(bodies)) {
    if (body.isStatic) continue;

    const dx = body.position.x - x;
    const dy = body.position.y - y;
    const distance = Math.hypot(dx, dy);
    if (distance > radius) continue;

    const influence = (1 - distance / radius) * strength;
    Matter.Body.setVelocity(body, {
      x: body.velocity.x + velocityX * 0.12 * influence,
      y: body.velocity.y + velocityY * 0.12 * influence
    });
    Matter.Body.setAngularVelocity(
      body,
      body.angularVelocity + clamp(velocityX / 700, -0.18, 0.18) * influence
    );
  }
}

export function DrawCardExperience() {
  const [filter, setFilter] = useState<DrawFilter>("all");
  const [selected, setSelected] = useState<InspirationCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [motionControl, setMotionControl] = useState<MotionControlState>("idle");
  const pitRef = useRef<HTMLElement | null>(null);
  const tileRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const bodiesRef = useRef<Record<string, Matter.Body>>({});
  const engineRef = useRef<Matter.Engine | null>(null);
  const frameRef = useRef<number | null>(null);
  const dragStateRef = useRef<DragState | null>(null);
  const lastShakeRef = useRef(0);
  const lastMotionMagnitudeRef = useRef(0);

  const cards = useMemo(() => getInspirationCards(filter), [filter]);

  useEffect(() => {
    const pit = pitRef.current;
    if (!pit) return;
    const physicsPit = pit;

    let resizeTimer: number | null = null;

    function stopPhysics() {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      if (engineRef.current) {
        Matter.Composite.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }

      bodiesRef.current = {};
    }

    function startPhysics() {
      stopPhysics();

      const bounds = physicsPit.getBoundingClientRect();
      const width = Math.max(bounds.width, 320);
      const height = Math.max(bounds.height, 460);
      const wall = 100;
      const engine = Matter.Engine.create();
      const bodies: Record<string, Matter.Body> = {};

      engine.gravity.y = width < 560 ? 1.04 : 1.12;
      engine.positionIterations = 9;
      engine.velocityIterations = 7;

      const walls = [
        Matter.Bodies.rectangle(width / 2, height + wall / 2 - 8, width + wall * 2, wall, {
          isStatic: true,
          restitution: 0.72,
          friction: 0.58
        }),
        Matter.Bodies.rectangle(-wall / 2, height / 2, wall, height * 3, {
          isStatic: true,
          restitution: 0.62,
          friction: 0.48
        }),
        Matter.Bodies.rectangle(width + wall / 2, height / 2, wall, height * 3, {
          isStatic: true,
          restitution: 0.62,
          friction: 0.48
        })
      ];

      const capsuleBodies = cards.map((item, index) => {
        const node = tileRefs.current[item.card.id];
        const nodeWidth = node?.offsetWidth || getCapsuleSize(item, index).width;
        const nodeHeight = node?.offsetHeight || getCapsuleSize(item, index).height;
        const columnCount = Math.max(2, Math.floor(width / 150));
        const column = index % columnCount;
        const laneWidth = width / columnCount;
        const x = laneWidth * column + laneWidth / 2 + ((index % 3) - 1) * 18;
        const y = -220 - Math.floor(index / columnCount) * 74 - (index % 5) * 16;
        const body = Matter.Bodies.rectangle(x, y, nodeWidth, nodeHeight, {
          label: item.card.id,
          chamfer: { radius: nodeHeight / 2 },
          restitution: 0.84,
          friction: 0.46,
          frictionAir: 0.012,
          density: 0.0014
        });

        Matter.Body.setAngle(body, ((index % 7) - 3) * 0.16);
        Matter.Body.setVelocity(body, {
          x: ((index % 5) - 2) * 0.9,
          y: (index % 4) * 0.35
        });
        Matter.Body.setAngularVelocity(body, ((index % 6) - 2.5) * 0.026);
        bodies[item.card.id] = body;
        return body;
      });

      Matter.Composite.add(engine.world, [...walls, ...capsuleBodies]);
      engineRef.current = engine;
      bodiesRef.current = bodies;

      function renderPhysics() {
        Matter.Engine.update(engine, 1000 / 60);

        for (const item of cards) {
          const node = tileRefs.current[item.card.id];
          const body = bodies[item.card.id];
          if (!node || !body) continue;

          const visualWidth = node.offsetWidth;
          const visualHeight = node.offsetHeight;
          const x = body.position.x - visualWidth / 2;
          const y = body.position.y - visualHeight / 2;
          node.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${body.angle}rad)`;
        }

        frameRef.current = window.requestAnimationFrame(renderPhysics);
      }

      renderPhysics();
    }

    startPhysics();

    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(startPhysics, 180);
    });

    resizeObserver.observe(physicsPit);

    return () => {
      resizeObserver.disconnect();
      if (resizeTimer) window.clearTimeout(resizeTimer);
      stopPhysics();
    };
  }, [cards]);

  useEffect(() => {
    const engine = engineRef.current;
    const timers: number[] = [];

    if (engine) {
      if (selected && isFlipped) {
        engine.timing.timeScale = 0.08;
        timers.push(window.setTimeout(() => {
          engine.timing.timeScale = 0.26;
        }, 520));
        timers.push(window.setTimeout(() => {
          engine.timing.timeScale = 0.56;
        }, 1500));
        timers.push(window.setTimeout(() => {
          engine.timing.timeScale = 1;
        }, 2600));
      } else {
        engine.timing.timeScale = 1;
      }
    }

    for (const body of Object.values(bodiesRef.current)) {
      const shouldPin = body.label === selected?.card.id && isFlipped;

      Matter.Body.setStatic(body, shouldPin);

      if (shouldPin && pitRef.current) {
        const bounds = pitRef.current.getBoundingClientRect();
        const node = tileRefs.current[body.label];
        const visualWidth = node?.offsetWidth || 360;
        const visualHeight = node?.offsetHeight || 220;
        const target = getOpenCapsuleTarget(bounds, visualWidth, visualHeight);

        Matter.Body.setAngle(body, 0);
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(body, 0);
        Matter.Body.setPosition(body, target);
      }
    }

    return () => {
      for (const timer of timers) {
        window.clearTimeout(timer);
      }
    };
  }, [selected, isFlipped]);

  useEffect(() => {
    if (motionControl !== "active") return;

    function handleOrientation(event: DeviceOrientationEvent) {
      const engine = engineRef.current;
      if (!engine) return;

      const leftRight = typeof event.gamma === "number" ? event.gamma : 0;
      const frontBack = typeof event.beta === "number" ? event.beta : 0;

      engine.gravity.x = clamp(leftRight / 32, -0.9, 0.9);
      engine.gravity.y = clamp(0.96 + frontBack / 88, 0.42, 1.55);
    }

    function handleMotion(event: DeviceMotionEvent) {
      const engine = engineRef.current;
      if (!engine) return;

      const acceleration = event.acceleration || event.accelerationIncludingGravity;
      if (!acceleration) return;

      const x = acceleration.x || 0;
      const y = acceleration.y || 0;
      const z = acceleration.z || 0;
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const delta = Math.abs(magnitude - lastMotionMagnitudeRef.current);
      const now = window.performance.now();

      lastMotionMagnitudeRef.current = magnitude;

      if (delta < 7.5 || now - lastShakeRef.current < 240) return;
      lastShakeRef.current = now;

      const impulse = clamp(delta / 22, 0.26, 1.25);
      const pushX = clamp(x / 12, -1, 1);
      const lift = clamp(Math.abs(y) / 16, 0.18, 1);

      for (const body of Object.values(bodiesRef.current)) {
        if (body.isStatic) continue;

        Matter.Body.setVelocity(body, {
          x: body.velocity.x + pushX * 4.8 * impulse,
          y: body.velocity.y - lift * 3.4 * impulse
        });
      }
      shakeCapsules(bodiesRef.current, impulse * 0.48);
    }

    window.addEventListener("deviceorientation", handleOrientation);
    window.addEventListener("devicemotion", handleMotion);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation);
      window.removeEventListener("devicemotion", handleMotion);

      const engine = engineRef.current;
      if (engine) {
        engine.gravity.x = 0;
        engine.gravity.y = 1.12;
      }
    };
  }, [motionControl]);

  function drawRandomCard() {
    const next = pickRandom(cards, selected);
    if (!next) return;

    setSelected(next);
    setIsFlipped(true);
    window.setTimeout(() => {
      tileRefs.current[next.card.id]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest"
      });
    }, 80);
  }

  function chooseCard(card: InspirationCard) {
    const isSameCard = selected?.card.id === card.card.id;
    setSelected(card);
    setIsFlipped(isSameCard ? !isFlipped : true);
  }

  function updateFilter(nextFilter: DrawFilter) {
    setFilter(nextFilter);
    setSelected(null);
    setIsFlipped(false);
  }

  async function requestMotionControl() {
    if (typeof window === "undefined") return;

    const motionConstructor = window.DeviceMotionEvent as
      | (typeof DeviceMotionEvent & SensorPermissionConstructor)
      | undefined;
    const orientationConstructor = window.DeviceOrientationEvent as
      | (typeof DeviceOrientationEvent & SensorPermissionConstructor)
      | undefined;

    if (!motionConstructor && !orientationConstructor) {
      setMotionControl("unsupported");
      return;
    }

    try {
      const motionPermissionRequest =
        motionConstructor?.requestPermission?.() ?? Promise.resolve("granted");
      const orientationPermissionRequest =
        orientationConstructor?.requestPermission?.() ?? Promise.resolve("granted");
      const [motionPermission, orientationPermission] = await Promise.all([
        motionPermissionRequest,
        orientationPermissionRequest
      ]);

      if (motionPermission === "granted" && orientationPermission === "granted") {
        setMotionControl("active");
      } else {
        setMotionControl("denied");
      }
    } catch {
      setMotionControl("denied");
    }
  }

  async function shakeExperience() {
    shakeCapsules(bodiesRef.current, 1);

    if (motionControl !== "idle") return;
    await requestMotionControl();
  }

  function handlePointerDown(event: React.PointerEvent<HTMLElement>) {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    dragStateRef.current = {
      lastX: event.clientX - bounds.left,
      lastY: event.clientY - bounds.top,
      lastTime: window.performance.now()
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    const dragState = dragStateRef.current;
    if (!dragState) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const now = window.performance.now();
    const elapsed = Math.max(16, now - dragState.lastTime);
    const velocityX = ((x - dragState.lastX) / elapsed) * 16.67;
    const velocityY = ((y - dragState.lastY) / elapsed) * 16.67;

    pushCapsulesNearPoint(bodiesRef.current, x, y, velocityX, velocityY);
    dragStateRef.current = {
      lastX: x,
      lastY: y,
      lastTime: now
    };
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLElement>) {
    dragStateRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTyping || event.code !== "Space") return;

      event.preventDefault();
      shakeCapsules(bodiesRef.current, 1);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const motionButtonLabel =
    motionControl === "active"
      ? "摇一摇已开启"
      : motionControl === "unsupported"
        ? "摇一摇"
        : motionControl === "denied"
          ? "摇一摇"
          : "摇一摇";

  return (
    <main className={styles.experience}>
      <section className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Conversational AI Inspiration Draw</p>
          <h1>抽一张给自己的灵感词</h1>
          <p>
            灵感胶囊会落进现场，碰撞、反弹，再慢慢停下。选中一个词，打开它背后的资源卡。
          </p>

          <div className={styles.controls} aria-label="抽卡筛选">
            <button
              type="button"
              className={filter === "all" ? styles.active : ""}
              onClick={() => updateFilter("all")}
            >
              全部
            </button>
            <button
              type="button"
              className={filter === "build" ? styles.active : ""}
              onClick={() => updateFilter("build")}
            >
              Build
            </button>
            <button
              type="button"
              className={filter === "grow" ? styles.active : ""}
              onClick={() => updateFilter("grow")}
            >
              Grow
            </button>
          </div>
        </div>

        <div className={styles.drawPanel}>
          <button
            type="button"
            className={styles.drawButton}
            onClick={drawRandomCard}
          >
            随机抽一张
          </button>
          <p className={styles.drawHint}>
            点击或按空格摇动；桌面可拖拽搅动。
          </p>
          <button
            type="button"
            className={`${styles.motionButton} ${motionControl === "active" ? styles.motionActive : ""}`}
            onClick={shakeExperience}
          >
            {motionButtonLabel}
          </button>
        </div>
      </section>

      <section
        ref={pitRef}
        className={styles.wordGrid}
        aria-label="灵感词列表"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
      >
        {cards.map((item, index) => {
          const isSelected = selected?.card.id === item.card.id;
          const isOpen = isSelected && isFlipped;
          const seriesLabel = item.card.series === "grow" ? "Grow" : "Build";
          const toneClass =
            item.card.series === "grow" ? styles.growTone : styles.buildTone;
          const capsuleSize = getCapsuleSize(item, index);
          const capsuleStyle = {
            "--capsule-width": `${capsuleSize.width}px`,
            "--capsule-height": `${capsuleSize.height}px`
          } as CSSProperties;

          return (
            <button
              type="button"
              key={item.card.id}
              ref={(element) => {
                tileRefs.current[item.card.id] = element;
              }}
              className={`${styles.wordTile} ${toneClass} ${isOpen ? styles.open : ""}`}
              style={capsuleStyle}
              onClick={() => chooseCard(item)}
            >
              <span className={styles.capsuleShell}>
                <span className={styles.capsuleTop}>
                  <span className={styles.capsuleWord}>{item.words[0]}</span>
                  <span className={styles.capsuleIcon}>+</span>
                </span>
                <span className={styles.capsuleSupport}>
                  {item.words.slice(1).join(" / ")}
                </span>
                <span className={styles.capsuleContent}>
                  <span className={styles.seriesPill}>{seriesLabel}</span>
                  <strong>{item.card.title}</strong>
                  <em>{item.card.subtitle}</em>
                  <span>{item.prompt}</span>
                </span>
              </span>
            </button>
          );
        })}
      </section>
    </main>
  );
}

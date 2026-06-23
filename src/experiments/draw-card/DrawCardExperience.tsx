"use client";

import { useMemo, useRef, useState } from "react";
import type { CardSeries } from "@/data/cards";
import { getInspirationCards, type InspirationCard } from "./inspiration";
import styles from "./DrawCardExperience.module.css";

type DrawFilter = CardSeries | "all";

function pickRandom<T>(items: T[], avoid?: T | null) {
  if (items.length === 0) return null;
  if (items.length === 1) return items[0];

  let next = items[Math.floor(Math.random() * items.length)];
  while (next === avoid) {
    next = items[Math.floor(Math.random() * items.length)];
  }
  return next;
}

export function DrawCardExperience() {
  const [filter, setFilter] = useState<DrawFilter>("all");
  const [selected, setSelected] = useState<InspirationCard | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const tileRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const cards = useMemo(() => getInspirationCards(filter), [filter]);

  function drawRandomCard() {
    const next = pickRandom(cards, selected);
    if (!next) return;

    setSelected(next);
    setIsFlipped(true);
    window.setTimeout(() => {
      tileRefs.current[next.card.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
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

  return (
    <main className={styles.experience}>
      <section className={styles.stage}>
        <div className={styles.copy}>
          <p className={styles.kicker}>Conversational AI Inspiration Draw</p>
          <h1>抽一张给自己的灵感词</h1>
          <p>
            先被一个词吸引，再翻开它背后的资源卡。适合展会现场快速开启一次关于渴望、方向和行动的对话。
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
            点击下面任意关键词，它会在原地翻开。
          </p>
        </div>
      </section>

      <section className={styles.wordGrid} aria-label="灵感词列表">
        {cards.map((item) => {
          const isSelected = selected?.card.id === item.card.id;
          const shouldFlip = isSelected && isFlipped;
          const seriesLabel = item.card.series === "grow" ? "Grow" : "Build";

          return (
            <button
              type="button"
              key={item.card.id}
              ref={(element) => {
                tileRefs.current[item.card.id] = element;
              }}
              className={`${styles.wordTile} ${isSelected ? styles.selected : ""} ${shouldFlip ? styles.flipped : ""}`}
              onClick={() => chooseCard(item)}
            >
              <span className={styles.tileInner}>
                <span className={styles.tileFace}>
                  <span className={styles.seriesPill}>{seriesLabel}</span>
                  <span className={styles.tileWord}>{item.words[0]}</span>
                  <small>{item.words.slice(1).join(" / ")}</small>
                </span>

                <span className={`${styles.tileFace} ${styles.tileFront}`}>
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

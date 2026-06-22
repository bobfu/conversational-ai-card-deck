"use client";

import { useMemo, useState } from "react";
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

  const cards = useMemo(() => getInspirationCards(filter), [filter]);

  function drawRandomCard() {
    const next = pickRandom(cards, selected);
    if (!next) return;

    setIsFlipped(false);
    window.setTimeout(() => {
      setSelected(next);
      window.setTimeout(() => setIsFlipped(true), 80);
    }, selected ? 260 : 0);
  }

  function chooseCard(card: InspirationCard) {
    setSelected(card);
    setIsFlipped(false);
    window.setTimeout(() => setIsFlipped(true), 80);
  }

  function updateFilter(nextFilter: DrawFilter) {
    setFilter(nextFilter);
    setSelected(null);
    setIsFlipped(false);
  }

  const heroWords = selected?.words ?? ["好奇", "勇气", "超越"];
  const seriesLabel = selected?.card.series === "grow" ? "Grow" : "Build";

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

          <button
            type="button"
            className={`${styles.featuredCard} ${isFlipped ? styles.flipped : ""}`}
            onClick={() => selected && setIsFlipped((value) => !value)}
            aria-label={selected ? "翻动当前卡片" : "当前灵感卡"}
          >
            <span className={styles.cardFace}>
              <span className={styles.seriesPill}>
                {selected ? seriesLabel : "Draw"}
              </span>
              <span className={styles.wordCluster}>
                {heroWords.map((word) => (
                  <span key={word}>{word}</span>
                ))}
              </span>
              <span className={styles.tapHint}>点击翻开</span>
            </span>

            <span className={`${styles.cardFace} ${styles.cardFront}`}>
              {selected ? (
                <>
                  <span className={styles.seriesPill}>{seriesLabel}</span>
                  <strong>{selected.card.title}</strong>
                  <em>{selected.card.subtitle}</em>
                  <span>{selected.prompt}</span>
                </>
              ) : (
                <>
                  <span className={styles.seriesPill}>Ready</span>
                  <strong>让一个词先找到你</strong>
                  <em>选择下方词卡，或随机抽一张</em>
                  <span>翻开后会看到它连接的社区资源。</span>
                </>
              )}
            </span>
          </button>
        </div>
      </section>

      <section className={styles.wordGrid} aria-label="灵感词列表">
        {cards.map((item) => {
          const isSelected = selected?.card.id === item.card.id;

          return (
            <button
              type="button"
              key={item.card.id}
              className={`${styles.wordTile} ${isSelected ? styles.selected : ""}`}
              onClick={() => chooseCard(item)}
            >
              <span>{item.words[0]}</span>
              <small>{item.words.slice(1).join(" / ")}</small>
            </button>
          );
        })}
      </section>
    </main>
  );
}

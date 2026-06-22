"use client";

import JSZip from "jszip";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CardArtwork,
  DeckCard,
  exportCardElementToPng,
  formatCardImageName
} from "@/components/DeckCard";
import {
  cardsByLocale,
  type CardLocale,
  type CardSeries
} from "@/data/cards";
import styles from "./page.module.css";

type Filter = "all" | CardSeries;

interface ZipProgress {
  locale: CardLocale;
  completed: number;
  total: number;
  currentFile: string;
  phase: "rendering" | "zipping";
}

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [locale, setLocale] = useState<CardLocale>("zh");
  const [iconNames, setIconNames] = useState<string[]>([]);
  const [zipLocale, setZipLocale] = useState<CardLocale | null>(null);
  const [zipProgress, setZipProgress] = useState<ZipProgress | null>(null);
  const [exportLocale, setExportLocale] = useState<CardLocale | null>(null);
  const cancelZipRef = useRef(false);
  const exportRefs = useRef<Record<CardLocale, Record<string, HTMLDivElement | null>>>({
    zh: {},
    en: {}
  });

  useEffect(() => {
    let isCurrent = true;

    async function loadIcons() {
      try {
        const response = await fetch("/api/icons", {
          cache: "no-store"
        });

        if (!response.ok) return;

        const payload = (await response.json()) as { icons?: string[] };

        if (isCurrent) {
          setIconNames(Array.isArray(payload.icons) ? payload.icons : []);
        }
      } catch {
        if (isCurrent) {
          setIconNames([]);
        }
      }
    }

    loadIcons();

    return () => {
      isCurrent = false;
    };
  }, []);

  const availableIcons = useMemo(() => {
    return new Set(iconNames);
  }, [iconNames]);

  const visibleCards = useMemo(() => {
    const cards = cardsByLocale[locale];

    if (filter === "all") return cards;
    return cards.filter((card) => card.series === filter);
  }, [filter, locale]);

  const sequenceById = useMemo(() => {
    return new Map(
      cardsByLocale[locale].map((card, index) => [card.id, index + 1])
    );
  }, [locale]);

  const heroCopy = {
    zh: {
      title: "Build & Grow",
      body:
        "用一套可维护的网页组件批量生成 RTE 社区卡片。更新文字、链接和 SVG 图标，即可生成新的展会卡片。"
    },
    en: {
      title: "Build & Grow",
      body:
        "Generate RTE community cards from a maintainable web component. Update copy, links, and SVG icons to create new event-ready cards."
    }
  } satisfies Record<CardLocale, { title: string; body: string }>;

  const zipProgressPercent = zipProgress
    ? Math.round((zipProgress.completed / zipProgress.total) * 100)
    : 0;

  function waitForFrame() {
    return new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });
  }

  function cancelZipDownload() {
    cancelZipRef.current = true;
    setZipProgress((progress) =>
      progress
        ? {
          ...progress,
          currentFile:
            progress.locale === "zh"
              ? "正在取消..."
              : "Cancelling..."
        }
        : progress
    );
  }

  async function handleDownloadZip(targetLocale: CardLocale) {
    if (zipLocale) return;

    try {
      cancelZipRef.current = false;
      setZipLocale(targetLocale);
      setExportLocale(targetLocale);

      const zip = new JSZip();
      const cards = cardsByLocale[targetLocale];

      setZipProgress({
        locale: targetLocale,
        completed: 0,
        total: cards.length,
        currentFile: "",
        phase: "rendering"
      });
      await waitForFrame();
      await waitForFrame();

      for (const [index, card] of cards.entries()) {
        if (cancelZipRef.current) break;

        const element = exportRefs.current[targetLocale][card.id];
        const filename = formatCardImageName(card, targetLocale, index + 1);

        setZipProgress({
          locale: targetLocale,
          completed: index,
          total: cards.length,
          currentFile: filename,
          phase: "rendering"
        });
        await waitForFrame();

        if (!element) {
          setZipProgress({
            locale: targetLocale,
            completed: index + 1,
            total: cards.length,
            currentFile: filename,
            phase: "rendering"
          });
          continue;
        }

        const dataUrl = await exportCardElementToPng(element);
        if (cancelZipRef.current) break;

        const base64 = dataUrl.split(",")[1];

        zip.file(filename, base64, {
          base64: true
        });

        setZipProgress({
          locale: targetLocale,
          completed: index + 1,
          total: cards.length,
          currentFile: filename,
          phase: "rendering"
        });
      }

      if (cancelZipRef.current) return;

      setZipProgress({
        locale: targetLocale,
        completed: cards.length,
        total: cards.length,
        currentFile: `conversational-ai-cards-${targetLocale}.zip`,
        phase: "zipping"
      });
      await waitForFrame();

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `conversational-ai-cards-${targetLocale}.zip`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error("Failed to download card ZIP", error);
    } finally {
      cancelZipRef.current = false;
      setZipLocale(null);
      setZipProgress(null);
      setExportLocale(null);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div>
          <p className={styles.kicker}>Conversational AI Card Deck</p>
          <h1>{heroCopy[locale].title}</h1>
          <p>{heroCopy[locale].body}</p>
        </div>

        <a
          className={styles.githubLink}
          href="https://github.com/bobfu/conversational-ai-card-deck"
          target="_blank"
          rel="noreferrer"
          aria-label="Open GitHub repository"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.52 2.87 8.35 6.84 9.71.5.09.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.37 9.37 0 0 1 12 6.96c.85 0 1.7.12 2.5.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.48-.01 2.82 0 .27.18.59.69.49A10.09 10.09 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
          </svg>
          <span>GitHub</span>
        </a>
      </section>

      <div className={styles.toolbar}>
        <button
          type="button"
          className={filter === "all" ? styles.active : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          type="button"
          className={filter === "build" ? styles.active : ""}
          onClick={() => setFilter("build")}
        >
          Build
        </button>
        <button
          type="button"
          className={filter === "grow" ? styles.active : ""}
          onClick={() => setFilter("grow")}
        >
          Grow
        </button>

        <div className={styles.toolbarDivider} />

        <button
          type="button"
          className={locale === "zh" ? styles.active : ""}
          onClick={() => setLocale("zh")}
        >
          中文
        </button>
        <button
          type="button"
          className={locale === "en" ? styles.active : ""}
          onClick={() => setLocale("en")}
        >
          English
        </button>

        <div className={styles.toolbarDivider} />

        <button
          type="button"
          className={styles.zipButton}
          disabled={zipLocale !== null}
          onClick={() => handleDownloadZip("zh")}
        >
          {zipLocale === "zh" ? "打包中文..." : "下载中文 ZIP"}
        </button>
        <button
          type="button"
          className={styles.zipButton}
          disabled={zipLocale !== null}
          onClick={() => handleDownloadZip("en")}
        >
          {zipLocale === "en" ? "Packing English..." : "Download English ZIP"}
        </button>
      </div>

      {zipProgress ? (
        <div className={styles.zipProgress} role="status" aria-live="polite">
          <div className={styles.zipProgressHeader}>
            <strong>
              {zipProgress.phase === "zipping"
                ? zipProgress.locale === "zh"
                  ? "正在压缩 ZIP"
                  : "Compressing ZIP"
                : zipProgress.locale === "zh"
                  ? "正在生成卡片"
                  : "Rendering cards"}
            </strong>
            <span>
              {zipProgress.completed} / {zipProgress.total}
            </span>
          </div>
          <div className={styles.zipProgressTrack}>
            <div
              className={styles.zipProgressBar}
              style={{ width: `${zipProgressPercent}%` }}
            />
          </div>
          <div className={styles.zipProgressFooter}>
            <p>{zipProgress.currentFile}</p>
            <button
              type="button"
              onClick={cancelZipDownload}
              disabled={zipProgress.phase === "zipping"}
            >
              {zipProgress.locale === "zh" ? "取消" : "Cancel"}
            </button>
          </div>
        </div>
      ) : null}

      <section className={styles.grid}>
        {visibleCards.map((card) => (
          <DeckCard
            key={card.id}
            card={card}
            locale={locale}
            sequence={sequenceById.get(card.id) || 0}
            availableIcons={availableIcons}
          />
        ))}
      </section>

      <div className={styles.exportStage} aria-hidden="true">
        {exportLocale
          ? cardsByLocale[exportLocale].map((card) => (
            <CardArtwork
              key={`${exportLocale}-${card.id}`}
              card={card}
              locale={exportLocale}
              availableIcons={availableIcons}
              elementRef={(element) => {
                exportRefs.current[exportLocale][card.id] = element;
              }}
            />
          ))
          : null}
      </div>
    </main>
  );
}

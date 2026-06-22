"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { QRCodeSVG } from "qrcode.react";
import type { CardItem, CardLocale } from "@/data/cards";
import styles from "./DeckCard.module.css";

interface DeckCardProps {
  card: CardItem;
  locale: CardLocale;
  sequence: number;
  availableIcons: ReadonlySet<string>;
}

interface CardArtworkProps {
  card: CardItem;
  locale: CardLocale;
  availableIcons: ReadonlySet<string>;
  elementRef?: (element: HTMLDivElement | null) => void;
}

export async function exportCardElementToPng(element: HTMLElement) {
  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  return toPng(element, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "transparent",
    filter: (node) => {
      if (node instanceof HTMLImageElement) {
        return node.complete && node.naturalWidth > 0;
      }

      return true;
    }
  });
}

export function CardArtwork({
  card,
  locale,
  availableIcons,
  elementRef
}: CardArtworkProps) {
  const isLongTitle = card.title.length > 14;
  const isLongIntro = card.intro.length > 85;
  const hasIcon = availableIcons.has(card.icon);

  return (
    <div
      ref={elementRef}
      className={[
        styles.card,
        card.series === "build" ? styles.build : styles.grow,
        locale === "en" ? styles.english : ""
      ].join(" ")}
    >
      <div className={styles.cardText}>
        <h1
          className={[
            styles.cardTitle,
            isLongTitle ? styles.longTitle : ""
          ].join(" ")}
        >
          {card.title}
        </h1>

        <p className={styles.cardSubtitle}>{card.subtitle}</p>
      </div>

      <p
        className={[
          styles.cardIntro,
          isLongIntro ? styles.longIntro : ""
        ].join(" ")}
      >
        {card.intro}
      </p>

      {hasIcon ? (
        <img
          className={styles.cardIcon}
          src={`/icons/cards/${card.icon}.svg`}
          alt=""
          aria-hidden="true"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.removeAttribute("src");
          }}
        />
      ) : null}

      <div className={styles.cardQrFrame}>
        <div className={styles.cardQr}>
          <QRCodeSVG
            value={card.url}
            size={118}
            bgColor="#ffffff"
            fgColor="#111111"
            level="M"
            includeMargin={false}
          />
        </div>
      </div>
    </div>
  );
}

export function formatCardImageName(
  card: CardItem,
  locale: CardLocale,
  sequence: number
) {
  return `${String(sequence).padStart(2, "0")}-${card.series}-${card.id}-${locale}.png`;
}

export function DeckCard({
  card,
  locale,
  sequence,
  availableIcons
}: DeckCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const downloadLabel = locale === "en" ? "Download PNG" : "下载 PNG";
  const downloadingLabel = locale === "en" ? "Generating..." : "生成中...";

  async function handleDownload() {
    if (!cardRef.current) return;

    try {
      setIsDownloading(true);

      const dataUrl = await exportCardElementToPng(cardRef.current);

      const link = document.createElement("a");
      link.download = formatCardImageName(card, locale, sequence);
      link.href = dataUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      link.remove();
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleDownloadClick() {
    try {
      await handleDownload();
    } catch (error) {
      console.error("Failed to download card PNG", error);
    }
  }

  return (
    <div className={styles.cardBlock}>
      <div className={styles.previewViewport}>
        <div className={styles.previewScaler}>
          <CardArtwork
            card={card}
            locale={locale}
            availableIcons={availableIcons}
            elementRef={(element) => {
              cardRef.current = element;
            }}
          />
        </div>
      </div>

      <div className={styles.cardMeta}>
        <div>
          <strong>{card.title}</strong>
          <span>{card.series}</span>
        </div>

        <button
          type="button"
          onClick={handleDownloadClick}
          disabled={isDownloading}
          className={styles.downloadButton}
        >
          {isDownloading ? downloadingLabel : downloadLabel}
        </button>
      </div>
    </div>
  );
}

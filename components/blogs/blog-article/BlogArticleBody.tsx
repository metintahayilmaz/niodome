"use client";

/**
 * BlogArticleBody — Sanity Portable Text body alanını Azurio'nun
 * blog tipografisiyle render eder.
 *
 * Desteklenen bloklar:
 *   - normal paragraph  → <p className="mxd-article__normal">
 *   - h2 / h3 / h4      → <h2> / <h3> / <h4>
 *   - blockquote        → .mxd-article__block.block-quote > blockquote
 *   - bullet list       → <ul>
 *   - number list       → <ol className="article-ol">
 *
 * Desteklenen işaretler (marks):
 *   - strong, em, code  → <strong> / <em> / <code>
 *   - link              → <a href target="_blank">
 *
 * ADIM 5B'de tam implementasyon; 5C'de image blokları eklenebilir.
 */

import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

// Azurio tipografi sınıflarıyla özel bileşenler
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <div className="mxd-article__block">
        <p className="mxd-article__normal">{children}</p>
      </div>
    ),
    h2: ({ children }) => (
      <div className="mxd-article__block">
        <h2>{children}</h2>
      </div>
    ),
    h3: ({ children }) => (
      <div className="mxd-article__block">
        <h3>{children}</h3>
      </div>
    ),
    h4: ({ children }) => (
      <div className="mxd-article__block">
        <h4>{children}</h4>
      </div>
    ),
    blockquote: ({ children }) => (
      <div className="mxd-article__block block-quote">
        <blockquote>
          <p className="quote__text">{children}</p>
        </blockquote>
      </div>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <div className="mxd-article__block">
        <ul>{children}</ul>
      </div>
    ),
    number: ({ children }) => (
      <div className="mxd-article__block">
        <ol className="article-ol">{children}</ol>
      </div>
    ),
  },

  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },

  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ value, children }) => (
      <a
        href={value?.href ?? "#0"}
        target={value?.href?.startsWith("http") ? "_blank" : undefined}
        rel={value?.href?.startsWith("http") ? "noreferrer noopener" : undefined}
      >
        {children}
      </a>
    ),
  },
};

type Props = {
  body: unknown[] | null;
};

export default function BlogArticleBody({ body }: Props) {
  if (!body || body.length === 0) return null;

  return (
    <PortableText
      value={body as PortableTextBlock[]}
      components={components}
    />
  );
}

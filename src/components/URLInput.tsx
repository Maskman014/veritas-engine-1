"use client";

import React, { useRef, useState } from "react";
import styles from "@/styles/components.module.css";

interface URLInputProps {
  onAnalyze: (url: string) => void;
  loading: boolean;
}

export const URLInput: React.FC<URLInputProps> = ({ onAnalyze, loading }) => {
  const [url, setUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content.includes("http")) {
          const urlMatch = content.match(/https?:\/\/[^\s]+/);
          if (urlMatch) {
            setUrl(urlMatch[0]);
          }
        }
      };
      reader.readAsText(files[0]);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <form onSubmit={handleSubmit}>
        <div
          className={`${styles.dropZone} ${dragActive ? styles.active : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className={styles.dropZoneContent}>
            <span className={styles.icon}>??</span>
            <h2>Paste News URL or Drag & Drop</h2>
            <p>Analyze any news article for fake news in 3 seconds</p>

            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/news/article"
              className={styles.input}
              disabled={loading}
            />

            <button
              type="submit"
              className={styles.button}
              disabled={loading || !url.trim()}
            >
              {loading ? "?? ANALYZING..." : "? EXECUTE ANALYSIS"}
            </button>
          </div>
        </div>
      </form>

      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.pdf"
        style={{ display: "none" }}
      />
    </div>
  );
};

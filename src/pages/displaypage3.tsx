// DisplayPage3.js
import React from "react";
import useSWR from "swr";

import GridArtworks from "@/components/GridArtworks";
import LoadingPanel from "@/components/LoadingPanel";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

const DisplayPage3 = () => {
  // 最新のアートワークを取得
  const {
    data: latestArtworks,
    error,
    isLoading,
  } = useSWR("/artworks/latest", () => new ArtworkInteractor().getLatests(100));

  if (error) return <>エラーが発生しました！</>;
  if (isLoading) return <LoadingPanel />;

  // 新着アートワーク（最新の9作品まで）
  const latestArtworksLimited: ArtworkData[] = latestArtworks ? latestArtworks.slice(0, 9) : [];

  // 既存のアートワークを取得（新着でない作品、10作品目以降）
  const existingArtworks: ArtworkData[] = latestArtworks ? latestArtworks.slice(9) : [];

  return (
    <div>
      {/* 新着アートワークセクション */}
      <h2>新着アートワーク</h2>
      {latestArtworksLimited.length > 0 ? (
        <GridArtworks artworks={latestArtworksLimited} />
      ) : (
        <p>新着アートワークが見つかりませんでした。</p>
      )}

      {/* ラインセパレーター */}
      <hr style={{ margin: "20px 0" }} />

      {/* 既存のアートワークセクション */}
      <h2>既存のアートワーク</h2>
      {existingArtworks.length > 0 ? (
        <GridArtworks artworks={existingArtworks} />
      ) : (
        <p>既存のアートワークが見つかりませんでした。</p>
      )}
    </div>
  );
};

export default DisplayPage3;

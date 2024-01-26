// DisplayPage3.js
import React, { useEffect, useState } from "react";
import useSWR from "swr";

import GridArtworks from "@/components/GridArtworks";
import LoadingPanel from "@/components/LoadingPanel";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

const DisplayPage3 = () => {
  const [pageLoadTimestamp, setPageLoadTimestamp] = useState<number | null>(null);

  useEffect(() => {
    const loadTimestamp = new Date().getTime();
    setPageLoadTimestamp(loadTimestamp);
  }, []);

  const {
    data: latestArtworks,
    error,
    isLoading,
  } = useSWR("/artworks/latest", () => new ArtworkInteractor().getLatests(10, pageLoadTimestamp || undefined), {
    revalidateOnFocus: false,
  });

  if (error) return <>エラーが発生しました！</>;
  if (isLoading) return <LoadingPanel />;

  const allLatestArtworks: ArtworkData[] = latestArtworks || [];

  const newArtworks: ArtworkData[] = allLatestArtworks.filter(
    (artwork) => artwork.uploaded.getTime() > (pageLoadTimestamp || 0)
  );

  const existingArtworks: ArtworkData[] = allLatestArtworks.filter(
    (artwork) => artwork.uploaded.getTime() <= (pageLoadTimestamp || 0)
  );

  return (
    <div>
      {newArtworks.length > 0 && (
        <div>
          <h2>新着アートワーク</h2>
          <GridArtworks artworks={newArtworks} />
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      {existingArtworks.length > 0 && (
        <div>
          <h2>既存のアートワーク</h2>
          <GridArtworks artworks={existingArtworks} />
        </div>
      )}
    </div>
  );
};

export default DisplayPage3;

import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";

import GridArtworks from "@/components/GridArtworks";
import LoadingPanel from "@/components/LoadingPanel";
import ArtworkInteractor from "@/interactors/Artwork/Sample";

const DisplayPage2 = () => {
  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR("/artworks/latest", () => new ArtworkInteractor().getLatestArtworks(100));

  useEffect(() => {
    const fetchData = async () => {
      // コンポーネントがマウントされたときにデータを再取得
      const newData = await new ArtworkInteractor().getLatestArtworks(100);
      mutate("/artworks/latest", newData, false);
    };

    fetchData();
  }, []);

  if (error || artworks === null) return <>Error!</>;
  if (isLoading || artworks === undefined) return <LoadingPanel />;

  // ここで新着作品と既存の作品を分ける
  const latestArtworks = artworks.filter((artwork) => artwork.isNew === true);
  const existingArtworks = artworks.filter((artwork) => artwork.isNew === false || artwork.isNew === undefined);

  const imageUrl = "https://flowerillust.com/img/flower/flower1095.jpg";

  return (
    <>
      {/* 新着作品 */}
      <div>
        <h2>新着作品</h2>
        <hr style={{ borderTop: "2px solid blue", marginBottom: "10px" }} />
        {latestArtworks.length > 0 ? (
          <GridArtworks artworks={latestArtworks} />
        ) : (
          <p>
            <img src={imageUrl} alt='Sample' />
          </p>
        )}
      </div>

      {/* 既存の作品 */}
      <div>
        <h2>前回まで表示していた作品</h2>
        <hr style={{ borderTop: "2px solid blue", marginBottom: "10px" }} />
        {existingArtworks.length > 0 ? (
          <GridArtworks artworks={existingArtworks} />
        ) : (
          <p>No existing artworks available.</p>
        )}
      </div>
    </>
  );
};

export default DisplayPage2;

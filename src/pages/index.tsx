"use client";
import useSWR from "swr";

import GridArtworks from "@/components/GridArtworks";
import LoadingPanel from "@/components/LoadingPanel";
import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";

const IndexPage = () => {
  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR("/artworks/latest", () => new ArtworkInteractor().getLatests(100));

  if (error || artworks === null) return <>Error!</>;
  if (isLoading || artworks === undefined) return <LoadingPanel />;

  return <GridArtworks artworks={artworks} />;
};

export default IndexPage;

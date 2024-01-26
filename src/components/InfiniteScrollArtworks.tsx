import { useState, useEffect } from "react";

import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";
import { ArtworkData } from "@/interactors/Artwork/ArtworkTypes";

import GridArtworks from "./GridArtworks";
import InfiniteScrollCounter from "./InfiniteScrollCounter";
import LoadingPanel from "./LoadingPanel";

interface InfiniteScrollArtworksProps {
  fetchAmount: number;
}

const InfiniteScrollArtworks = ({ fetchAmount }: InfiniteScrollArtworksProps) => {
  const [artworks, setArtworks] = useState<ArtworkData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [canFetch, setCanFetch] = useState<boolean>(true);

  const fetchMoreArtworks = async () => {
    if (isFetching || !canFetch || !artworks) return;
    setIsFetching(true);

    const result = await new ArtworkInteractor().getLatests(fetchAmount, artworks[artworks.length - 1].id);
    if (!result || result.length < 1) {
      setCanFetch(false);
      return;
    }
    setArtworks((current) => current.concat(result));

    setIsFetching(false);
  };

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      const result = await new ArtworkInteractor().getLatests(fetchAmount);
      setIsLoading(false);
      if (!result) {
        setIsError(true);
      } else {
        setArtworks(result);
      }
    };
    fetcher();
  }, []);

  if (isError) return <>Error!</>;
  if (isLoading || artworks === undefined) return <LoadingPanel />;

  return (
    <>
      <GridArtworks artworks={artworks} />
      <InfiniteScrollCounter onCounterChange={fetchMoreArtworks} isLoading={isFetching} canLoading={canFetch} />
    </>
  );
};

export default InfiniteScrollArtworks;

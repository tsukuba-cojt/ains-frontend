import { Flex, Spinner } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface InfiniteScrollCounterProps {
  onCounterChange: () => Promise<void>;
  isLoading: boolean;
  canLoading: boolean;
}

const InfiniteScrollCounter = ({ onCounterChange, isLoading, canLoading }: InfiniteScrollCounterProps) => {
  const observedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (isLoading) return;
        if (entries[0].isIntersecting) {
          onCounterChange();
        }
      },
      { threshold: 1.0 }
    );
    const target = observedRef.current;

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [observedRef, onCounterChange, isLoading]);

  return (
    <>
      {canLoading ? (
        <Flex ref={observedRef} h='60px' w='full' justifyContent='center' alignItems='center'>
          {isLoading && <Spinner />}
        </Flex>
      ) : (
        <></>
      )}
    </>
  );
};

export default InfiniteScrollCounter;

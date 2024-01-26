import { DownloadIcon } from "@chakra-ui/icons";
import { Image, VStack, Text, AspectRatio } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback, useId, useState } from "react";

interface FileInputProps {
  dispatch: Dispatch<SetStateAction<File | null>>;
  label?: string;
  aspect?: number;
}

const ImageFileInput = ({ dispatch, label, aspect }: FileInputProps) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const formId = useId();

  const readAndSetFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        setDataUrl(!(reader.result instanceof ArrayBuffer) ? reader.result ?? "" : "");
        dispatch(file);
      });
      reader.readAsDataURL(file);
    },
    [label, dispatch]
  );

  return (
    <>
      {label && (
        <Text px='4' fontWeight='bold' fontSize='lg'>
          {label}
        </Text>
      )}
      <label
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
        htmlFor={`icon_file_${formId}`}
        onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDrop={(e) => {
          e.stopPropagation();
          e.preventDefault();
          const files = e.dataTransfer.files;
          if (files.length < 1) {
            dispatch(null);
          } else {
            readAndSetFile(files[0]);
          }
        }}
      >
        {dataUrl ? (
          <AspectRatio w='full' ratio={aspect || 1}>
            <Image src={dataUrl} alt='' />
          </AspectRatio>
        ) : (
          <AspectRatio w='full' ratio={aspect || 1}>
            <VStack py={10} gap={5}>
              <DownloadIcon boxSize={16} />
              <>ファイルを選択、またはドラッグ&ドロップ</>
            </VStack>
          </AspectRatio>
        )}
      </label>
      <input
        style={{ display: "none" }}
        id={`icon_file_${formId}`}
        type='file'
        accept='image/*'
        onChange={(e) => {
          const files = e.target.files;
          if (!files || files.length < 1) {
            dispatch(null);
          } else {
            readAndSetFile(files[0]);
          }
        }}
      />
    </>
  );
};

export default ImageFileInput;

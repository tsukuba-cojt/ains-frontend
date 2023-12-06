import { useToast } from "@chakra-ui/react";
import { ReactNode } from "react";

import OverlayMenu from "./OverlayMenu";

type UpdateFormData = {
  id: string;
  is_public: boolean;
};
type DeleteFormData = {
  id: string;
};

interface Interactor {
  update(data: UpdateFormData): Promise<boolean | null>;
  delete(data: DeleteFormData): Promise<boolean | null>;
}

interface DBData {
  id: string;
  is_public: boolean;
}

interface OverlayAdminMenuProps {
  data: DBData;
  interactor: Interactor;
  children: ReactNode;
}

const OverlayAdminMenu = ({ children, data, interactor }: OverlayAdminMenuProps) => {
  const toast = useToast();

  return (
    <OverlayMenu
      actions={[
        {
          name: data.is_public ? "非公開にする" : "公開する",
          action: async () => {
            const result = await interactor.update({
              id: data.id,
              is_public: !data.is_public,
            });
            if (result) {
              toast({
                title: `${data.is_public ? "非公開に" : "公開"}しました`,
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: "閲覧範囲の更新に失敗しました",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          },
        },
        {
          name: "削除する",
          action: async () => {
            const result = await interactor.delete({ id: data.id });
            if (result) {
              toast({
                title: "削除しました",
                status: "success",
                duration: 9000,
                isClosable: true,
              });
            } else {
              toast({
                title: "削除に失敗しました",
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }
          },
        },
      ]}
    >
      {children}
    </OverlayMenu>
  );
};

export default OverlayAdminMenu;

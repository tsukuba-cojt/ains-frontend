import { SettingsIcon } from "@chakra-ui/icons";
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface OverlayMenuAction {
  name: string;
  action: () => void | Promise<void>;
}

interface OverlayMenuProps {
  actions: OverlayMenuAction[];
  children: ReactNode;
}

const OverlayMenu = ({ children, actions }: OverlayMenuProps) => {
  const [showMenuButton, setShowMenuButton] = useState<boolean>(false);

  return (
    <Box position='relative' onMouseEnter={() => setShowMenuButton(true)} onMouseLeave={() => setShowMenuButton(false)}>
      <Menu>
        {showMenuButton ? (
          <MenuButton
            position='absolute'
            top='0.25rem'
            right='0.25rem'
            zIndex={5}
            as={IconButton}
            icon={<SettingsIcon />}
            opacity={0.8}
          />
        ) : null}
        <MenuList>
          {actions.map((action, i) => (
            <MenuItem key={i} onClick={action.action}>
              {action.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      {children}
    </Box>
  );
};

export default OverlayMenu;

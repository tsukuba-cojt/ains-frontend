import { CUIAutoComplete } from "chakra-ui-autocomplete";
import React from "react";
import useSWR from "swr";

import ArtworkInteractor from "@/interactors/Artwork/ArtworkInteractor";

export interface Item {
  label: string;
  value: string;
}
const countries = [
  { value: "ghana", label: "Ghana" },
  { value: "nigeria", label: "Nigeria" },
  { value: "kenya", label: "Kenya" },
  { value: "southAfrica", label: "South Africa" },
  { value: "unitedStates", label: "United States" },
  { value: "canada", label: "Canada" },
  { value: "germany", label: "Germany" },
];

export default function App() {
  const [pickerItems, setPickerItems] = React.useState(countries);
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  const searchKeyWords = "";

  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR(`/artworks/search_artwork?keywords=${searchKeyWords}`, () =>
    new ArtworkInteractor().fullTextSearch(100, searchKeyWords.split(/\s+/))
  );

  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  return (
    <CUIAutoComplete
      label='Choose preferred work locations'
      placeholder='Type a Country'
      onCreateItem={handleCreateItem}
      items={pickerItems}
      selectedItems={selectedItems}
      disableCreateItem={true}
      inputStyleProps={{ bg: "white.100", pt: "4" }}
      listStyleProps={{ bg: "black.100", pt: "4" }}
      listItemStyleProps={{ bg: "black.100", pt: "4", textColor: "red" }}
      onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
    />
  );
}

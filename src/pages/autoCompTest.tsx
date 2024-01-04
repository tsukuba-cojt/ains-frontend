import { CUIAutoComplete } from "chakra-ui-autocomplete";
import React from "react";

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
  const [selectedItems, setSelectedItems] = React.useState<Item[]>([]);

  /*
  const [pickerItems, setPickerItems] = React.useState(countries);

  const searchKeyWords = "かわいい";

  const {
    data: artworks,
    error,
    isLoading,
  } = useSWR(`/artworks/search_artwork?keywords=${searchKeyWords}`, () =>
    new ArtworkInteractor().fullTextSearch(10, searchKeyWords.split(/\s+/))
  );
  let pickerItems2: Array<Item> = [];

  if (error || artworks === null) {
  } else if (isLoading || artworks === undefined) {
  } else {
    artworks.forEach((d) => {
      console.log(d.name);
    });
    console.log("おわり");
    pickerItems2 = artworks.map((aData) => ({ value: aData.id, label: aData.name }));
  }
  */

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  return (
    <CUIAutoComplete
      label='Choose preferred work locations'
      placeholder='Type a Country'
      items={countries}
      selectedItems={selectedItems}
      disableCreateItem={true}
      inputStyleProps={{ bg: "white.100", pt: "4" }}
      listStyleProps={{ bg: "black.100", pt: "4" }}
      listItemStyleProps={{ bg: "black.100", pt: "4", textColor: "red" }}
      onSelectedItemsChange={(changes) => handleSelectedItemsChange(changes.selectedItems)}
    />
  );
}

import { Flex, FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList } from "@choc-ui/chakra-autocomplete";
import * as React from "react";

function App() {
  const countries = ["nigeria", "japan", "india", "united states", "south korea"];

  return (
    <Flex pt='48' justify='center' align='center' w='full'>
      <FormControl w='60'>
        <FormLabel>Olympics Soccer Winner</FormLabel>
        <AutoComplete openOnFocus>
          <AutoCompleteInput variant='filled' />
          <AutoCompleteList>
            {countries.map((country, cid) => (
              <AutoCompleteItem key={`option-${cid}`} value={country} textTransform='capitalize'>
                {country}
              </AutoCompleteItem>
            ))}
          </AutoCompleteList>
        </AutoComplete>
        <FormHelperText>Who do you support.</FormHelperText>
      </FormControl>
    </Flex>
  );
}

export default App;

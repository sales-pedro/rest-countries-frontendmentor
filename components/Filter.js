import React, { useState } from "react";

import {
  Flex,
  Input,
  IconButton,
  InputLeftElement,
  InputGroup,
  Spacer,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const Filter = ({ onChange, onSubmit }) => {
  const [query, setQuery] = useState("");
  const [value] = useState("default");
  console.log("filter query", query);

  return (
    <Flex
      mx={{ md: "20" }}
      mt="2rem"
      direction={{ base: "column", md: "row" }}
      justifyContent={{ md: "space-between" }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(query);
        }}
      >
        <InputGroup w="auto " mb={10} boxShadow="xl">
          <Input
            size="lg"
            placeholder="Search for a country"
            variant="ghost"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <InputLeftElement
            children={
              <IconButton
                aria-label="Search"
                icon={<SearchIcon />}
                bg="bg-white"
                color="gray.500"
              />
            }
          />
        </InputGroup>
      </form>

      <Spacer />

      <Select
        onChange={(e) => onChange(e.target.value)}
        value={value}
        w={{ base: "50%", md: "auto" }}
        mb={{ base: "20", md: "0" }}
        bg="bg-white"
        boxShadow="xl"
      >
        <option value="default" disabled>
          Select a region
        </option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </Select>
    </Flex>
  );
};

export default Filter;

//pages/index.js
import Head from "next/head";
import Link from "next/link";

import React, { useState } from "react";

import Header from "../components/Header";

import { getAllCountries, getQueryCountries, getQueryRegion } from "../lib/api";

import {
  Box,
  Container,
  Text,
  Image,
  Flex,
  Wrap,
  WrapItem,
  Input,
  IconButton,
  InputLeftElement,
  InputGroup,
  Spacer,
  Select,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export default function Home({ data }) {
  const [countries, setCountries] = useState(data);
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("default");

  const handleSubmit = async (e) => {
    await e.preventDefault();
    const res = await getQueryCountries(query);

    await setCountries(res);
    await setQuery("");
  };

  const handleSelect = async (e) => {
    const res = await getQueryRegion(e);
    setValue(e);
    await setCountries(res);
  };

  return (
    <div>
      <Head>
        <title> REST Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box overflow="hidden" bg="gray.100" minH="100vh">
        <Header />
        <Container maxW="8xl" mt="3rem">
          <Flex
            mx={{ md: "20" }}
            mt="2rem"
            direction={{ base: "column", md: "row" }}
            justifyContent={{ md: "space-between" }}
          >
            <form onSubmit={handleSubmit}>
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
                      onClick={handleSubmit}
                    />
                  }
                />
              </InputGroup>
            </form>

            <Spacer />

            <Select
              onChange={(e) => handleSelect(e.target.value)}
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

          <Wrap px="1rem" spacing={10} justify="center">
            {countries.map((country) => (
              <WrapItem
                maxW="sm"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="xl"
                key={country.alpha3Code}
                bg="white"
              >
                <Box>
                  <Link href={`/countries/${country.alpha3Code}`}>
                    <a>
                      <Image src={country.flag} alt={country.name} />
                    </a>
                  </Link>
                  <Box p={6}>
                    <Text mb={3} fontSize="xl" fontWeight="bold">
                      {country.name}
                    </Text>
                    <Flex>
                      <Text>
                        <b>Population:</b> {country.population}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text>
                        <b>Region:</b> {country.region}
                      </Text>
                    </Flex>
                    <Flex>
                      <Text>
                        <b>Capital:</b> {country.capital}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </Container>
      </Box>
    </div>
  );
}

export async function getServerSideProps() {
  const data = await getAllCountries();
  return {
    props: {
      data,
    },
  };
}

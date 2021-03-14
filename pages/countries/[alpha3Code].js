import { getCountryByCode } from "../../lib/api";
import Header from "../../components/Header";
import React from "react";
import {
  Box,
  Container,
  Text,
  Flex,
  Button,
  Image,
  SimpleGrid,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
//import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Countries({ country }) {
  return (
    <Box bg="gray.200" overflow="hidden" minH="100vh">
      <Head>
        <title>Country: {country.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Container maxW="8xl" mt="3rem" pb={{ base: "2rem", md: "0" }}>
        <Link href="/">
          <Button
            mb={{ base: "3rem", lg: "3rem" }}
            aria-label="Back to Homepage"
            leftIcon={<ArrowBackIcon />}
          >
            Back
          </Button>
        </Link>
        <Center mx="auto" justify="center">
          <Box
            key={country}
            maxW="6xl"
            display="flex"
            justifyContent="space-between"
            display={{ md: "flex" }}
          >
            <Box maxW={{ md: "50%" }} alignSelf="center">
              <Image src={country.flag} alt={country.name} />
            </Box>
            <Box
              px={{ base: "0", md: "3rem", lg: "6rem" }}
              pt={{ base: "2rem" }}
              alignContent="center"
              lineHeight={7}
            >
              <Text mb={3} fontSize="xl" fontWeight="bold">
                {country.name}
              </Text>

              <SimpleGrid
                columns={{ base: "1", md: "2" }}
                spacingX="40px"
                pb="3rem"
              >
                <Box mb={{ base: "2rem", md: "0" }}>
                  <Flex>
                    <Text>
                      <b>Native Name: </b>
                      {country.nativeName}
                    </Text>
                  </Flex>
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
                      <b>Sub Region: </b>
                      {country.subregion}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text>
                      <b>Capital:</b> {country.capital}
                    </Text>
                  </Flex>
                </Box>
                <Box>
                  <Flex>
                    <Text>
                      <b>Top Level Domain: </b>
                      {country.topLevelDomain}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text>
                      <b>Currencies: </b>
                      {country.currencies[0].name}
                    </Text>
                  </Flex>
                  <Flex>
                    <Text>
                      <b>Languages: </b>
                      {country.languages.map((language) => {
                        return <span>{language.name}, </span>;
                      })}
                    </Text>
                  </Flex>
                </Box>
              </SimpleGrid>

              <Wrap>
                <b>Border Countries: </b>
                {country.borders.map((border) => {
                  if (border.length) {
                    return (
                      <WrapItem>
                        <Link href={`/countries/${border}`}>
                          <a>
                            <Image
                              w="40px"
                              h="20px"
                              src={`https://restcountries.eu/data/${border}.svg`.toLowerCase()}
                              alt={border.name}
                            />
                          </a>
                        </Link>
                      </WrapItem>
                    );
                  }
                })}
              </Wrap>
            </Box>
          </Box>
        </Center>
      </Container>
    </Box>
  );
}

export async function getServerSideProps({ params }) {
  const country = await getCountryByCode(params.alpha3Code);

  return {
    props: {
      country,
    },
  };
}

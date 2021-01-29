import { getCountryByCode } from "../../lib/api";
import Header from '../../components/Header'
import React from "react";
import {
  Box,
  Text,
  Flex,
  Button,
  Image,
  Grid, 
  GridItem,
  Spacer,
} from "@chakra-ui/react";
//import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Countries({ country }) {
    
    return (
      <Box bg="gray.200" overflow="hidden"  minH="100vh">
        <Head>
          <title>Country: {country.name}</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <Header />
        
        <Box mt={{base: "2rem", md: "2rem", lg: "5rem"}} p={{base: "2rem"}} px={{sm: "2rem", lg: "10rem"}}>
          <Link href="/">
            <Button
              mb={{base: "3rem", lg:"5rem"}}
              aria-label="Back to Homepage"
              leftIcon={<ArrowBackIcon />}
            >Back</Button>
          </Link>
          
            <Box  key={country} 
                  maxW="6xl" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="space-between"
                  display={{ md: "flex"}}
                   
                >
              
              <Image src={country.flag} alt={country.name}/>
              <Spacer/>
              <Box p={{base: "0", lg:"6rem"}} pt={{base: 8}} alignContent="center" lineHeight={7}> 
                <Text mb={3} fontSize="xl"fontWeight="bold">{country.name}</Text>

                <Flex>
                  <Text><b>Native Name: </b>{country.nativeName}</Text>
                </Flex>
                <Flex>
                  <Text><b>Population:</b> {country.population}</Text>
                </Flex>
                <Flex>
                  <Text><b>Region:</b> {country.region}</Text>
                </Flex>
                <Flex>
                  <Text><b>Sub Region: </b>{country.subregion}</Text>
                </Flex>
                <Flex>
                  <Text><b>Capital:</b> {country.capital}</Text>
                </Flex>
                <Flex>
                  <Text><b>Top Level Domain: </b>{country.topLevelDomain}</Text>
                </Flex>
                <Flex>
                  <Text><b>Currencies: </b>{country.currencies[0].name}</Text>
                </Flex>
                <Flex>
                  <Text><b>Languages: </b>
                  {country.languages.map((language) => {
                  return (
                    <span>{language.name}</span>
                    )
                  })}
                  </Text>
                </Flex>

                <Flex>
                  <Text><b>Border Countries: </b>
                  {country.borders.map((border) => {
                  return (
                    <Link href={`/countries/${border}`}>
                      <a>{border}</a>
                    </Link>
                    )
                  })}
                  </Text>
                </Flex>
              </Box>
            </Box> 
          </Box>
      </Box> 
    )
  }

  export async function getServerSideProps({ params }) {
    const country = await getCountryByCode(params.alpha3Code);
    
    return {
      props: {
        country,
      },
    };
  }
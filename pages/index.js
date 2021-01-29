//pages/index.js
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

import Header from '../components/Header'

import { getAllCountries, getQueryCountries, getQueryRegion } from "../lib/api";

import {  Box,
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
          Menu,
          MenuButton,
          MenuList,
          Button,
          MenuItem,
          Spacer
        } from "@chakra-ui/react";
import { SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";

export default function Home({ data }) {
  
  const [countries, setCountries] = useState(data);
  const [query, setQuery] = useState("");
  const [value, setValue]= useState("");
  console.log(value, "Value fora do handleChange 1")
  console.log(countries)
  
  const handleSubmit = async (e) => {
    await e.preventDefault();
    const res = await getQueryCountries(query);
    console.log(query)
    await setCountries(res);
    await setQuery("");
  };
  
  const handleChange = async (e) =>{
    
    setValue(e)
    console.log(value, "value depois do setValue 2");
    const res = await getQueryRegion(value);
    console.log(value, "Value depois do getQuery 3");
    await setCountries(res);
    console.log(value, "Value depois do setCountries 4");
  }

  return (
    <div>
      <Head>
        <title> REST Countries</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box overflow="hidden" bg="gray.100" minH="100vh">
      <Header />
      <Container maxW="8xl">

        
        
        <Flex mx={20}>

        <form onSubmit={handleSubmit}>
            <InputGroup mb={10} boxShadow="xl">
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
                    bg="bg-transparent"
                    color="gray.500"

                    onClick={handleSubmit}
                  />
                }
              />
            </InputGroup>
          </form>

          <Spacer />

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              Filter by region
            </MenuButton>
            <MenuList>
              <MenuItem onClick={(e) => handleChange(e.target.value)} value="Africa">Africa</MenuItem>
              <MenuItem onClick={(e) => handleChange(e.target.value)} value="Americas">Americas</MenuItem>
              <MenuItem onClick={(e) => handleChange(e.target.value)} value="Asia">Asia</MenuItem>
              <MenuItem  onClick={(e) => handleChange(e.target.value)} value="Europe">Europe</MenuItem>
              <MenuItem  onClick={(e) => handleChange(e.target.value)} value="Oceania">Oceania</MenuItem>
            </MenuList>
          </Menu>
        </Flex>

      <Wrap px="1rem" spacing={10} justify="center">
     {
        countries.map((country) => (
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
                <Image src={country.flag} alt={country.name}/>
              </a>
            </Link>
            <Box p={6} > 
              <Text mb={3} fontSize="xl"fontWeight="bold">{country.name}</Text>
              <Flex>
                <Text><b>Population:</b> {country.population}</Text>
              </Flex>
              <Flex>
                <Text><b>Region:</b> {country.region}</Text>
              </Flex>
              <Flex>
                <Text><b>Capital:</b> {country.capital}</Text>
              </Flex>
            </Box>
          </Box>
          </WrapItem>
        ))
      }
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
      data
    },
  };
}

/*

        <select 
          name="value" 
          id="value" 
          value={value} 
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="select" >Filter by region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>

*/
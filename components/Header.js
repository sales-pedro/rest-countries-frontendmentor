import Link from "next/link";
import { Text, Box } from "@chakra-ui/react";

export default function Header() {
  return (
    <Box boxShadow="xl" w="100%">
      <Text
        fontWeight="bold"
        w="350px"
        p="2rem"
        textAlign="left"
        fontSize={["xl", "2xl", "3xl", "3xl"]}
      >
        <Link href="/" pointer>
          <a>Where in the world?</a>
        </Link>
      </Text>
    </Box>
  );
}

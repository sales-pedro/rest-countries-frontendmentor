import Link from 'next/link'
import { Text, Box } from "@chakra-ui/react";

export default function Header() {
    return(
        <Box boxShadow="xl">
        <Link href="/"><a>
            <Text
                fontWeight="bold"
                p="2rem"
                textAlign="left"
                fontSize={["xl", "2xl", "3xl", "3xl"]}
            >
                Where in the world?
            </Text>
        </a></Link>
        </Box>
    )
};
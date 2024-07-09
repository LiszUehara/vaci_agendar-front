import { Flex, FlexProps, HStack, IconButton, Text, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { FiMenu, FiMoon, FiSun } from "react-icons/fi"

interface IHeader extends FlexProps {
    onOpen: () => void
  }

export const Header = ({ onOpen, ...rest }: IHeader) => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
      <Flex
        ml={{ base: 0, md: 60 }}
        px={{ base: 4, md: 4 }}
        height="20"
        alignItems="center"
        bg={useColorModeValue('white', 'gray.900')}
        borderBottomWidth="1px"
        borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
        justifyContent={{ base: 'space-between', md: 'flex-end' }}
        {...rest}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="outline"
          aria-label="open menu"
          icon={<FiMenu />}
        />
  
        <Text
          display={{ base: 'flex', md: 'none' }}
          fontSize="2xl"
          fontFamily="monospace"
          fontWeight="bold">
          Vaci_Agendar
        </Text>
  
        <HStack spacing={{ base: '0', md: '6' }}>
          <IconButton size="lg" variant={"outline"} aria-label="change color mode" onClick={toggleColorMode} 
          icon={colorMode==='dark'? <FiSun/>: <FiMoon />} />
        </HStack>
      </Flex>
    )
  }
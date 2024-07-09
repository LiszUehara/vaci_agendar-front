import { Box, Flex, FlexProps, Icon } from "@chakra-ui/react"
import { IconType } from "react-icons"
import { Link } from "react-router-dom"

interface INavItemProps extends FlexProps {
    icon: IconType
    children: React.ReactNode
    href: string
  }
  
export const NavItem = ({ icon, children, href, ...rest }: INavItemProps) => {
    return (
      <Box
        as={Link}
        to={href}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'blue.600',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    )
  }
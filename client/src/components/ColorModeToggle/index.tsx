import { Button, useColorMode } from '@chakra-ui/react'
import React, { FC } from 'react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ColorModeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <header>
      <Button
        rightIcon={colorMode === 'light' ? <SunIcon /> : <MoonIcon />}
        onClick={toggleColorMode}
        variant="ghost"
        _hover={{ bg: 'none' }}
        _active={{ bg: 'none' }}
      ></Button>
    </header>
  )
}
export default ColorModeToggle

import { Flex } from '@chakra-ui/react'
import Slider from './HeroSlider'

export default function Hero() {
    return (
        <Flex
            w="100%"
            justifySelf="flex-end"
            pl={{ base: '0', md: '54px' }}
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
        >
            <Slider />
        </Flex>
    )
}

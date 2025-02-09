import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  Divider,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import {
  Package,
  Users,
  Heart,
  MessageCircle,
  Database,
  Monitor,
  Moon,
  Globe,
  Lightbulb,
  Code,
  Server,
  Layout,
  Layers,
  Goal,
} from "lucide-react";
import { GitHubLink } from "../components/GithubLink";

const TechItem = ({ icon, name, color }) => (
  <HStack
    p={4}
    bg={useColorModeValue("white", "gray.800")}
    borderRadius='lg'
    border='1px'
    borderColor={useColorModeValue("gray.200", "gray.700")}
    spacing={3}
    shadow='sm'
  >
    <Icon as={icon} fontSize={18} color={color} />
    <Text fontWeight='medium'>{name}</Text>
  </HStack>
);

const AboutPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const sectionBg = useColorModeValue("white", "gray.800");

  return (
    <Box bg={bgColor} py={16}>
      <Container maxW='4xl'>
        <VStack spacing={12} align='stretch'>
          <VStack spacing={4} textAlign='center'>
            <Heading as={"h1"} size='2xl' fontWeight='bold'>
              About the project
            </Heading>
            <Text
              fontSize='xl'
              color={useColorModeValue("gray.600", "gray.400")}
            >
              Create collections. Share. Connect.
            </Text>
            <GitHubLink>Github</GitHubLink>
            <Link href='https://bekzodisakov.vercel.app/' fontWeight='bold'>
              My portfolio
            </Link>
          </VStack>

          <Box p={8} bg={sectionBg} borderRadius='xl' shadow='lg'>
            <VStack spacing={6} align='stretch'>
              <HStack spacing={3}>
                <Icon as={Lightbulb} fontSize={20} color='yellow.500' />
                <Heading size='lg'>About</Heading>
              </HStack>
              <VStack spacing={3}>
                <Text>
                  This is a collections app where users can register and create
                  collections of their favorite items, such as coins, shoes,
                  books, or anything else they collect. Each collection includes
                  a name, an image, a list of items, and various other details
                  to make it more informative.
                </Text>
                <Text>
                  Users can interact by liking and commenting on collections and
                  individual items. However, commenting requires
                  registration—guests can only browse collections. Each user has
                  full control over their own collections, allowing them to
                  manage and update them as needed.
                </Text>
                <Text>
                  The app also features an admin system. Admins can be assigned
                  or blocked by other admins and have the ability to view and
                  edit user collections to maintain order and moderation.
                </Text>
              </VStack>
            </VStack>
          </Box>

          <Box p={8} bg={sectionBg} borderRadius='xl' shadow='lg'>
            <VStack spacing={6} align='stretch'>
              <HStack spacing={3}>
                <Icon as={Goal} fontSize={20} color='green.500' />
                <Heading size='lg'>Purpose</Heading>
              </HStack>
              <Text>
                I&apos;ve built this project to showcase my skills, experiment
                with new technologies, and explore different features I&apos;ve
                been learning. It serves as both a learning experience and a
                portfolio piece to demonstrate my abilities.
              </Text>
            </VStack>
          </Box>

          <Box p={8} bg={sectionBg} borderRadius='xl' shadow='lg'>
            <VStack spacing={8} align='stretch'>
              <HStack spacing={3}>
                <Icon as={Layout} fontSize={20} color='blue.500' />
                <Heading size='lg'>Key Features</Heading>
              </HStack>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                <VStack
                  p={4}
                  bg={cardBg}
                  borderRadius='lg'
                  border='1px'
                  borderColor={borderColor}
                  align='start'
                  spacing={3}
                >
                  <Icon as={Package} fontSize={18} color='purple.500' />
                  <Text fontWeight='bold'>Collection Management</Text>
                  <Text>
                    Create and organize collections of any type - books, coins,
                    shoes, and more
                  </Text>
                </VStack>

                <VStack
                  p={4}
                  bg={cardBg}
                  borderRadius='lg'
                  border='1px'
                  borderColor={borderColor}
                  align='start'
                  spacing={3}
                >
                  <Icon as={Users} fontSize={18} color='green.500' />
                  <Text fontWeight='bold'>Social Interaction</Text>
                  <Text>
                    Like and comment on collections in real-time using Socket.io
                  </Text>
                </VStack>

                <VStack
                  p={4}
                  bg={cardBg}
                  borderRadius='lg'
                  border='1px'
                  borderColor={borderColor}
                  align='start'
                  spacing={3}
                >
                  <Icon as={Globe} fontSize={18} color='blue.500' />
                  <Text fontWeight='bold'>Internationalization</Text>
                  <Text>
                    Multi-language support with i18next for global accessibility
                  </Text>
                </VStack>

                <VStack
                  p={4}
                  bg={cardBg}
                  borderRadius='lg'
                  border='1px'
                  borderColor={borderColor}
                  align='start'
                  spacing={3}
                >
                  <Icon as={Moon} fontSize={18} color='yellow.500' />
                  <Text fontWeight='bold'>Customization</Text>
                  <Text>
                    Light/Dark mode support and responsive design across all
                    devices
                  </Text>
                </VStack>
              </SimpleGrid>
            </VStack>
          </Box>

          <Box p={8} bg={sectionBg} borderRadius='xl' shadow='lg'>
            <VStack spacing={8} align='stretch'>
              <HStack spacing={3}>
                <Icon as={Code} fontSize={20} color='green.500' />
                <Heading size='lg'>Technology Stack</Heading>
              </HStack>

              <VStack spacing={6}>
                <Heading size='md' alignSelf='start'>
                  Frontend
                </Heading>
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} w='full'>
                  <TechItem icon={Code} name='TypeScript' color='blue.500' />
                  <TechItem icon={Layout} name='React' color='cyan.500' />
                  <TechItem icon={Monitor} name='Chakra UI' color='teal.500' />
                  <TechItem
                    icon={Package}
                    name='Redux Toolkit'
                    color='purple.500'
                  />
                  <TechItem
                    icon={MessageCircle}
                    name='Socket.io'
                    color='red.500'
                  />
                  <TechItem icon={Globe} name='i18next' color='green.500' />
                  <TechItem
                    icon={Layers}
                    name='Tanstack-query'
                    color='green.500'
                  />
                </SimpleGrid>

                <Divider />

                <Heading size='md' alignSelf='start'>
                  Backend
                </Heading>
                <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4} w='full'>
                  <TechItem icon={Server} name='Express' color='yellow.500' />
                  <TechItem icon={Database} name='MongoDB' color='green.500' />
                  <TechItem icon={Package} name='AWS S3' color='orange.500' />
                </SimpleGrid>
              </VStack>
            </VStack>
          </Box>

          <Box p={8} bg={sectionBg} borderRadius='xl' shadow='lg'>
            <VStack spacing={6} align='stretch'>
              <Heading size='lg'>Additional Features</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <HStack spacing={3}>
                  <Icon as={Heart} fontSize={18} color='red.500' />
                  <Text>Real-time likes and comments</Text>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={Database} fontSize={18} color='blue.500' />
                  <Text>Cloud image storage</Text>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={Users} fontSize={18} color='green.500' />
                  <Text>Role-based access control</Text>
                </HStack>
                <HStack spacing={3}>
                  <Icon as={Monitor} fontSize={18} color='purple.500' />
                  <Text>Responsive design</Text>
                </HStack>
              </SimpleGrid>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AboutPage;

import { useState } from 'react';
import {
  Box,
  Container,
  Input,
  VStack,
  Text,
  Heading,
  FormControl,
  FormLabel,
  Button,
  useBreakpointValue,
  Card,
  CardBody,
} from '@chakra-ui/react';

export default function Home() {
  const [currentDpy, setCurrentDpy] = useState('');
  const [stakedRapr, setStakedRapr] = useState('');
  const [raprReward, setRaprReward] = useState('');
  const [raprBalance, setRaprBalance] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const containerWidth = useBreakpointValue({ base: '95%', md: '70%', lg: '50%' });
  const padding = useBreakpointValue({ base: 4, md: 6, lg: 8 });

  const calculateMinimumDpy = () => {
    // Convert inputs to numbers
    const dpy = parseFloat(currentDpy) / 100; // Convert percentage to decimal
    const staked = parseFloat(stakedRapr);
    const reward = parseFloat(raprReward);
    const balance = raprBalance ? parseFloat(raprBalance) : 0; // Default to 0 if empty

    // Calculate current daily earnings
    const currentDailyEarnings = staked * dpy;

    // Total amount that would be staked after compounding
    const totalToStake = staked + reward + balance;

    // Calculate minimum DPY needed
    // New daily earnings must exceed current daily earnings by at least 0.1%
    const minimumDpy = (currentDailyEarnings * 1.001 / totalToStake) * 100;

    setResult(`Minimum required DPY: ${minimumDpy.toFixed(4)}%\nCurrent daily earnings: ${currentDailyEarnings.toFixed(4)} RAPR\nNew daily earnings at min DPY: ${(totalToStake * (minimumDpy/100)).toFixed(4)} RAPR`);
  };

  return (
    <Box minH="100vh" py={padding} px={4}>
      <Container maxW={containerWidth}>
        <Card
          bg="blackAlpha.400"
          borderColor="green.500"
          borderWidth="1px"
          borderRadius="xl"
          overflow="hidden"
          boxShadow="0 4px 6px rgba(0, 255, 0, 0.1)"
        >
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading
                textAlign="center"
                mb={6}
                fontSize={{ base: '2xl', md: '3xl' }}
              >
                RAPR DPY Calculator
              </Heading>
              
              <FormControl>
                <FormLabel>Your Current DPY (%)</FormLabel>
                <Input
                  type="number"
                  step="0.01"
                  value={currentDpy}
                  onChange={(e) => setCurrentDpy(e.target.value)}
                  placeholder="Enter your current DPY %"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Staked R-APR Amount</FormLabel>
                <Input
                  type="number"
                  value={stakedRapr}
                  onChange={(e) => setStakedRapr(e.target.value)}
                  placeholder="Enter staked R-APR amount"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Current R-APR Reward Amount</FormLabel>
                <Input
                  type="number"
                  value={raprReward}
                  onChange={(e) => setRaprReward(e.target.value)}
                  placeholder="Enter R-APR reward amount"
                />
              </FormControl>

              <FormControl>
                <FormLabel>R-APR Balance (Uncompounded)</FormLabel>
                <Input
                  type="number"
                  value={raprBalance}
                  onChange={(e) => setRaprBalance(e.target.value)}
                  placeholder="Enter unstaked R-APR balance"
                />
              </FormControl>

              <Button
                size="lg"
                onClick={calculateMinimumDpy}
                w="full"
                mt={4}
              >
                Calculate Minimum DPY
              </Button>

              {result && (
                <Box
                  p={4}
                  bg="blackAlpha.500"
                  borderRadius="lg"
                  border="1px"
                  borderColor="green.400"
                  backdropFilter="blur(8px)"
                >
                  <Text
                    fontSize={{ base: 'md', md: 'lg' }}
                    fontWeight="medium"
                    color="green.300"
                    whiteSpace="pre-line"
                  >
                    {result}
                  </Text>
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
}

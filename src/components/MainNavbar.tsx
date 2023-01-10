import React from 'react';
import { Box, Flex, HStack, Button } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router';

type MainNavprops = {
  handleLogout: () => void;
};

const MainNavbar: React.JSXElementConstructor<MainNavprops> = ({
  handleLogout,
}) => {
  const navigate = useNavigate();

  const accessToken: string | null = localStorage.getItem('accessToken');

  return (
    <>
      <Box bg={'#aab1eebb'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Box
              fontSize={30}
              fontWeight='bold'
              color='#8A2BE2'
              onClick={() => navigate('/')}
            >
              Articles
            </Box>
          </HStack>
          <Flex alignItems={'center'}>
            {accessToken ? (
              <Button
                variant={'solid'}
                colorScheme={'purple'}
                size={'sm'}
                mr={4}
                leftIcon={<ArrowBackIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : null}
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default MainNavbar;

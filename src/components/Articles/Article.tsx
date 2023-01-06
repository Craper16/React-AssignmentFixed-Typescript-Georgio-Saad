import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Text,
  Box,
  Heading,
  Stack,
  StackDivider,
} from '@chakra-ui/react';

const IMG_URL = 'https://static01.nyt.com/';

type ArticleProps = {
  title: string;
  abstract: string;
  content: string;
  images: { url: string }[];
  date: Date;
  author: string;
};

const Article: React.FC<ArticleProps> = ({
  title,
  abstract,
  content,
  images,
  date,
  author,
}) => {
  return (
    <Card
      background="#aab1eebb"
      p={5}
      margin={'28'}
    >
      {images.length > 0 ? <Image src={IMG_URL + images[0].url} /> : null}
      <CardHeader>
        <Heading
          size="lg"
          textAlign="center"
        >
          {title}
        </Heading>
        <CardBody>
          <Stack
            divider={<StackDivider />}
            spacing="4"
          >
            <Box>
              <Heading
                size="xs"
                textTransform="uppercase"
                textAlign='center'
              >
                {abstract}
              </Heading>
            </Box>
            <Box>
              <Text
                pt="2"
                fontSize="sm"
              >
                {content}
              </Text>
            </Box>
          </Stack>
        </CardBody>
        <CardFooter>
          <Text
            pt="2"
            fontSize="sm"
          >
            {`Published at: ${date.toString().split('T')[0]} ${author}`}
          </Text>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default Article;

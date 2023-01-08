import React, { useEffect, useState } from 'react';
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
  Button,
} from '@chakra-ui/react';

const IMG_URL = 'https://static01.nyt.com/';

const CONTENT_WORD_LIMIT = 300;

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
  const [hasMore, setHasMore] = useState(false);
  const [readMore, setReadMore] = useState(false);

  useEffect(() => {
    if (content.length > CONTENT_WORD_LIMIT) {
      setHasMore(true);
    }
  }, [content]);

  const handleReadMore = () => {
    setReadMore(!readMore);
  };

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
                textAlign="center"
              >
                {abstract}
              </Heading>
            </Box>
            <Box>
              {hasMore ? (
                <Text
                  pt="2"
                  fontSize="sm"
                >
                  {readMore
                    ? content
                    : content.substring(0, CONTENT_WORD_LIMIT) + '...'}
                </Text>
              ) : (
                <Text
                  pt="2"
                  fontSize="sm"
                >
                  {content}
                </Text>
              )}
              {hasMore && (
                <Button
                  variant="link"
                  onClick={handleReadMore}
                >
                  {!readMore ? 'Read More' : 'Collapse'}
                </Button>
              )}
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

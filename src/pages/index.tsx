import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Image {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface ImagesResponse {
  data: Array<Image>;
  after: any;
}

export default function Home(): JSX.Element {

  function loadNextPage(){
    fetchNextPage();
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    async ({ pageParam = null }) => {
      const response = await api.get<ImagesResponse>('/api/images',
        {
          params: {
            after: pageParam
          }
        })

      return response.data;
    },
    //,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: (lastPage: ImagesResponse) => {
        return lastPage.after ?? null;
      }
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages?.map(x => x.data).flat() ?? []

  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {
          isLoading ? (<Loading />)
            : isError ? (<Error />)
              : <CardList cards={formattedData} />
        }

        {
          hasNextPage
          &&
          <Button onClick={loadNextPage} mt="12">
            {
              isFetchingNextPage ? ("Carregando...") : ("Carregar mais")
            }
          </Button>
        }
      </Box>
    </>
  );
}

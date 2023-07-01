import {
  Box,
  Heading,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import CustomLink from "../../components/CustomLink";
import { useEffect } from "react";
import { fetchLatestItems } from "../../store/slices/latestItemsSlice";
import { useDispatch } from "react-redux";

const MainPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLatestItems(5));
    console.log("useEffect main page");
  });

  return (
    <Box>
      <Heading as='h2' fontSize='2xl' mb='2'>
        Latest item
      </Heading>
      <UnorderedList mb='6'>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
      </UnorderedList>

      <Heading as='h2' fontSize='2xl' mb='2'>
        Top 5 collections
      </Heading>
      <OrderedList mb='6'>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
        <ListItem>
          <CustomLink to='/links/143'>Custom Link</CustomLink>
        </ListItem>
      </OrderedList>

      <Heading as='h2' fontSize='2xl' mb='2'>
        Tags cloud
      </Heading>
    </Box>
  );
};

export default MainPage;

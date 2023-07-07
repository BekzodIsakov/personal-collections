import React from "react";
import {
  Box,
  Heading,
  Skeleton,
  Tag,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFetchAllTags } from "../hooks/tags";
import { useItemsFetchByTag } from "../hooks/items";
import CustomList from "./CustomList";

const TagsCloud = () => {
  const [selectedTagId, setSelectedTagId] = React.useState("");
  const { loading, errorMessage, tags, fetchTags } = useFetchAllTags();

  const {
    loading: itemsLoading,
    errorMessage: itemFetchErrorMessage,
    items,
    setItems,
    fetchItemsByTag,
  } = useItemsFetchByTag();

  function handleTagSelect(tagId) {
    if (tagId === selectedTagId) {
      setSelectedTagId("");
    } else {
      setSelectedTagId(tagId);
    }
  }

  const tagColor = useColorModeValue("BlackAlpha.50", "gray.700");

  React.useEffect(() => {
    if (selectedTagId) {
      fetchItemsByTag(selectedTagId);
    } else {
      setItems([]);
    }
  }, [selectedTagId]);

  console.log("TagCloud");
  console.log({ items });

  React.useEffect(() => {
    fetchTags();
  }, []);

  let tagElements = <Text>No tags</Text>;
  if (loading) {
    tagElements = (
      <>
        <Skeleton w={"70px"} />
        <Skeleton w={"50px"} />
        <Skeleton w={"100px"} />
      </>
    );
  } else if (tags.length) {
    tagElements = tags.map((tag) => (
      <WrapItem key={tag._id} boxShadow={selectedTagId === tag._id ? "lg" : ""}>
        <Tag
          onClick={() => handleTagSelect(tag._id)}
          cursor={"pointer"}
          color={tagColor}
          bg={
            selectedTagId === tag._id
              ? "blue.300"
              : selectedTagId
              ? "blue.50"
              : "blue.100"
          }
        >
          {tag.title}
        </Tag>
      </WrapItem>
    ));
  }

  return (
    <Box>
      <Heading as='h2' fontSize='2xl' mb='4'>
        Tags cloud
      </Heading>
      <Wrap border={"1px"} borderColor={"gray.300"} rounded={"md"} p='2' mb={5}>
        {tagElements}
      </Wrap>
      <CustomList
        loading={itemsLoading}
        list={items}
        errorMessage={errorMessage}
      />
    </Box>
  );
};

export default TagsCloud;

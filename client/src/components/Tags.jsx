import React from "react";
import { useTranslation } from "react-i18next";
import {
  Skeleton,
  Tag,
  Text,
  Wrap,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import { useFetchAllTags } from "@/hooks/tags";

const Tags = ({ onTagSelect, selectedTagId }) => {
  const { t } = useTranslation();
  const { loading, errorMessage, tags, fetchTags } = useFetchAllTags();
  const tagColor = useColorModeValue("BlackAlpha.50", "gray.700");

  React.useEffect(() => {
    fetchTags();
  }, []);

  if (loading) {
    return (
      <>
        <Skeleton w='70px' />
        <Skeleton w='50px' />
        <Skeleton w='100px' />
      </>
    );
  }

  if (errorMessage) {
    console.error(errorMessage);
    return <Text>{t("global.error")}</Text>;
  }

  if (tags.length) {
    return (
      <Wrap border='1px' borderColor='gray.300' rounded='md' p='2' mb='5'>
        {tags.map((tag) => {
          const isSelected = selectedTagId === tag._id;
          return (
            <WrapItem
              key={tag._id}
              boxShadow={isSelected ? "lg" : "sm"}
              translate=''
            >
              <Tag
                onClick={() => onTagSelect(tag._id)}
                cursor='pointer'
                color={isSelected ? "gray.50" : tagColor}
                bg={isSelected ? "blue.500" : "blue.100"}
              >
                {tag.title}
              </Tag>
            </WrapItem>
          );
        })}
      </Wrap>
    );
  } else {
    return <Text>{t("global.empty")}</Text>;
  }
};

export default Tags;

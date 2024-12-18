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
// import { useFetchAllTags } from "@/hooks/tags";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Tags = ({ onTagSelect, tagId }) => {
  const { t } = useTranslation();
  // const [tagId, setTagId] = useState(null);

  async function fetchTags() {
    try {
      const data = await axios.get(`${import.meta.env.VITE_URL}/tags`);
      return data;
    } catch (error) {
      return error;
    }
  }

  // const { loading, errorMessage, tags, fetchTags } = useFetchAllTags();
  const tagColor = useColorModeValue("BlackAlpha.50", "gray.700");

  const tags = useQuery({ queryKey: ["tags"], queryFn: fetchTags });

  React.useEffect(() => {
    fetchTags();
  }, []);

  if (tags.status === "loading") {
    return (
      <>
        <Skeleton w='70px' />
        <Skeleton w='50px' />
        <Skeleton w='100px' />
      </>
    );
  }

  if (tags.isError) {
    console.error(tags.error);
    return <Text>{t("global.error")}</Text>;
  }

  if (tags.data) {
    const data = tags.data.data;

    return (
      <Wrap border='1px' borderColor='gray.300' rounded='md' p='2' mb='5'>
        {data.map((tag) => {
          const isSelected = tagId === tag._id;
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

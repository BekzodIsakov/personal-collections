import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Heading } from "@chakra-ui/react";
import { CustomList, Tags } from "@/components";
// import { useItemsFetchByTag } from "@/hooks/items";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const TagsCloud = () => {
  const [tagId, setTagId] = React.useState(null);

  const { t } = useTranslation();

  function toggleSelectTag(id) {
    if (id === tagId) {
      setTagId(null);
    } else {
      setTagId(tagId);
    }
  }

  async function fetchItemsByTagId(id) {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_URL}/items?findBy=tags_${id}`
      );
      return data;
    } catch (error) {
      return error;
    }
  }

  const items = useQuery({
    queryKey: ["items"],
    queryFn: () => fetchItemsByTagId(tagId),
    // enabled: !!tagId,
  });

  // const {
  //   loading: itemsLoading,
  //   items,
  //   setItems,
  //   fetchItemsByTag,
  // } = useItemsFetchByTag();

  // React.useEffect(() => {
  //   if (selectedTagId) {
  //     fetchItemsByTag(selectedTagId);
  //   } else {
  //     setItems([]);
  //   }
  // }, [selectedTagId]);

  return (
    <Box>
      <Heading as='h2' fontSize='2xl' mb='4'>
        {t("main.tagsCloud")}
      </Heading>
      <Tags tagId={tagId} onTagSelect={toggleSelectTag} />
      {items?.data?.data && (
        <CustomList
          loading={items.status === "pending"}
          list={items?.data?.data}
          // errorMessage={errorMessage}
        />
      )}
    </Box>
  );
};

export default TagsCloud;

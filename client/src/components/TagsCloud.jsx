import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Heading } from "@chakra-ui/react";
import { CustomList, Tags } from "@/components";
import { useItemsFetchByTag } from "@/hooks/items";

const TagsCloud = () => {
  const [selectedTagId, setSelectedTagId] = React.useState("");

  const { t } = useTranslation();

  function toggleTagSelect(tagId) {
    if (tagId === selectedTagId) {
      setSelectedTagId("");
    } else {
      setSelectedTagId(tagId);
    }
  }

  const {
    loading: itemsLoading,
    items,
    setItems,
    fetchItemsByTag,
  } = useItemsFetchByTag();

  React.useEffect(() => {
    if (selectedTagId) {
      fetchItemsByTag(selectedTagId);
    } else {
      setItems([]);
    }
  }, [selectedTagId]);

  return (
    <Box>
      <Heading as='h2' fontSize='2xl' mb='4'>
        {t("main.tagsCloud")}
      </Heading>
      <Tags selectedTagId={selectedTagId} onTagSelect={toggleTagSelect} />
      <CustomList
        loading={itemsLoading}
        list={items}
        // errorMessage={errorMessage}
      />
    </Box>
  );
};

export default TagsCloud;

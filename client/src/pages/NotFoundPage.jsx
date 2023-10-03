import { useTranslation } from "react-i18next";
import { Box, Heading, Link, Text } from "@chakra-ui/react";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Box px='10' pt='10' textAlign='center'>
      <Heading as='h1' mb='7' size='xl'>
        <Text mb='3'>404</Text>
        <Text fontWeight={"normal"}>{t("notFoundPage.pageNotFound")}</Text>
      </Heading>
      <Link href='/' color='blue.400'>
        {t("notFoundPage.goToMainPage")}
      </Link>
    </Box>
  );
};

export default NotFoundPage;

import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

const GoBackButton = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  return (
    <Button
      leftIcon={<ChevronLeftIcon />}
      variant='link'
      colorScheme='blue'
      fontWeight='normal'
      mb='7'
      onClick={() => navigate(-1)}
    >
      {t("global.goBack")}
    </Button>
  );
};

export default GoBackButton;

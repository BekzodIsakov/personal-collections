import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import translations from "../utils/translations";
import { useI18n } from "../providers/i18nProvider";

const GoBackButton = () => {
  const navigate = useNavigate();

  const { selectedLanguage } = useI18n();

  return (
    <Button
      leftIcon={<ChevronLeftIcon />}
      variant='link'
      colorScheme='blue'
      fontWeight='normal'
      mb='7'
      onClick={() => navigate(-1)}
    >
      {translations[selectedLanguage]?.general.goBack}
    </Button>
  );
};

export default GoBackButton;

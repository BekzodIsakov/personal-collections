import React from "react";
import { useAuth } from "../../../providers/authProvider";
import { useI18n } from "../../../providers/i18nProvider";
import translations from "../../../utils/translations";

export const useNavData = () => {
  const [navData, setNavData] = React.useState([]);

  const { selectedLanguage } = useI18n();

  const { token, user } = useAuth();

  const publicNavItems = React.useMemo(
    () => [{ label: translations[selectedLanguage]?.nav.mainPage, to: "/" }],
    [selectedLanguage]
  );

  const authenticatedNavItems = React.useMemo(
    () => [{ label: translations[selectedLanguage]?.nav.myPage, to: "/me" }],
    [selectedLanguage]
  );

  const adminNavItems = React.useMemo(
    () => [
      { label: translations[selectedLanguage]?.nav.usersPage, to: "users" },
    ],
    [selectedLanguage]
  );

  React.useEffect(() => {
    let _navData = [...publicNavItems];
    if (token) {
      _navData = [...publicNavItems, ...authenticatedNavItems];

      if (user.isAdmin) {
        _navData = [
          ...publicNavItems,
          ...authenticatedNavItems,
          ...adminNavItems,
        ];
      }
    }
    setNavData(_navData);
  }, [user, token, publicNavItems, authenticatedNavItems, adminNavItems]);

  return {
    navData,
    setNavData,
  };
};

// Sample data
// [
//   {
//     label: "Learn design",
//     to: "/learning",
//   },
//   {
//     label: "Inspiration",
//     children: [
//       {
//         label: "Explore design work",
//         subLabel: "Trending design to inspire you",
//         to: "/trending",
//       },
//       {
//         label: "New & networthy",
//         subLabel: "Up-and-coming Designers",
//         to: "/new",
//       },
//     ],
//   }
// ];

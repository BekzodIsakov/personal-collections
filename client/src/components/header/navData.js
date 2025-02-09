import React from "react";
import { useAuth } from "../../providers/authProvider";
import { useTranslation } from "react-i18next";

export const useNavData = () => {
  const [navData, setNavData] = React.useState([]);

  const { t, i18n } = useTranslation();

  const { token, user } = useAuth();

  const publicNavItems = React.useMemo(
    () => [{ label: t("nav.mainPage"), to: "/" }, { label: t("nav.aboutPage"), to: "/about" }],
    [i18n.resolvedLanguage]
  );

  const authenticatedNavItems = React.useMemo(
    () => [{ label: t("nav.myPage"), to: "/me" }],
    [i18n.resolvedLanguage]
  );

  const adminNavItems = React.useMemo(
    () => [{ label: t("nav.usersPage"), to: "users" }],
    [i18n.resolvedLanguage]
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

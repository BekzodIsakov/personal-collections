import React from "react";
import { useAuth } from "../../../providers/authProvider";

export const useNavData = () => {
  const [navData, setNavData] = React.useState([]);

  const { token, user } = useAuth();

  const publicNavItems = React.useMemo(
    () => [{ label: "Main page", to: "/" }],
    []
  );

  const authenticatedNavItems = React.useMemo(
    () => [{ label: "My page", to: "/me" }],
    []
  );

  const adminNavItems = React.useMemo(
    () => [{ label: "Users page", to: "users" }],
    []
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
  }, [user]);

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

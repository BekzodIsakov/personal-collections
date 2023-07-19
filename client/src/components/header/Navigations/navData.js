import React from "react";
import { useAuth } from "../../../providers/authProvider";

export const useNavData = () => {
  const { token, user } = useAuth();

  const authenticatedNavItems = React.useMemo(
    () => [{ label: "My page", to: "/me" }],
    []
  );

  const adminNavItems = React.useMemo(
    () => [
      { label: "Admin page", to: `admin/${user.id}` },
      { label: "Users page", to: "users" },
    ],
    [user]
  );

  const [navData, setNavData] = React.useState([]);

  React.useEffect(() => {
    if (token) {
      const _navData = [...authenticatedNavItems];

      if (user.isAdmin) {
        _navData.push(...adminNavItems);
      }

      setNavData(_navData);
    }
  }, [user]);

  return {
    navData,
    setNavData,
  };
};

// export default [
//   {
//     label: "My page",
//     to: "/my-page",
//   },
//   ( ? {
//     label: "My page",
//     to: "/my-page",
//   })
// ];

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

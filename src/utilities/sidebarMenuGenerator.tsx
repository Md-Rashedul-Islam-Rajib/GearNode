
// import { TRoutePaths, TSidebarItem } from "@/types/global.types";
// import { NavLink } from "react-router";




// export const menuGenerator = (path: TRoutePaths[], role: string) => {
//   const routes = path.reduce((acc: TSidebarItem[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => {

//           if (child.name) {
//             return {
//               key: child.name,
//               label: (
//                 <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
//               ),
//             };
//           }
//         }),
//       });
//     }

//     return acc;
//   }, []);
//   return routes;
// };

"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/layout/nav-main";
import { NavProjects } from "@/layout/nav-projects";
import { TeamSwitcher } from "@/layout/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { CompanyMeta } from "@/lib/type/CommonType";
import { NavCRM } from "./crm-main";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { fetchUserProfile } from "@/lib/action/moreClub/User";

// This is sample data.

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  metadata: CompanyMeta;
};

export function AppSidebar({ metadata, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const session = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    dispatch(fetchUserProfile({ fetchForce: false }));
  }, [dispatch]);

  const data = {
    user: {
      name: `${session.data?.user?.userDetails?.first_name} ${session.data?.user?.userDetails?.last_name}`,
      email: `${session.data?.user?.userDetails?.email === ""
          ? session.data?.user?.userDetails?.phone_prefix +
          " " +
          session.data?.user?.userDetails?.phone_number
          : session.data?.user?.userDetails?.email
        }`,
      avatar: `${session.data?.user?.userDetails?.display_picture}`,
    },
    teams: [
      {
        name: "MOREDEALS CLUB",
        dark: metadata.white_logo,
        light: metadata.black_logo,
        plan: "",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: SquareTerminal,
        darkImage: "/images/svg/Home.svg",
        lightImage: "/images/svg/Home.svg",
      },
      // ...(user?.profile?.user_type === "BUSINESS"
      //   ? [
      //       {
      //         title: "Network",
      //         url: "#",
      //         icon: Bot,
      //         darkImage: "/images/svg/NetworkWhite.svg",
      //         lightImage: "/images/svg/NetworkYellow.svg",
      //         items: [
      //           {
      //             title: "Networks",
      //             url: "/networks",
      //             darkImage: "/images/svg/NetworkWhite..svg",
      //             lightImage: "/images/svg/NetworkYellow.svg",
      //           },
      //           {
      //             title: "Leads",
      //             url: "/dashboard/leads",
      //             darkImage: "/images/svg/leads.svg",
      //             lightImage: "/images/svg/leads.svg",
      //           },
      //         ],
      //       },
      //     ]
      //   : [
      //       {
      //         title: "Network",
      //         url: "/networks",
      //         darkImage:"/images/svg/NetworkWhite..svg",
      //         lightImage:"/images/svg/NetworkYellow.svg",
      //       },{
      //         title: "Leads", url: "/dashboard/leads",
      //         darkImage:"/images/svg/leads.svg",
      //         lightImage:"/images/svg/leads.svg"
      //       }, ]
      // ),
      {
        title: "Network",
        url: "/networks",
        darkImage: "/images/svg/NetworkWhite..svg",
        lightImage: "/images/svg/NetworkYellow.svg",
      },
      {
        title: "Offers",
        url: "/offers",
        icon: BookOpen,
        darkImage: "/images/svg/events.svg",
        lightImage: "/images/svg/events.svg",
      },

      {
        title: "Events",
        url: "/event",
        icon: BookOpen,
        darkImage: "/images/svg/events.svg",
        lightImage: "/images/svg/events.svg",
      },
      {
        title: "Transaction",
        url: "/transaction/user",
        icon: BookOpen,
        darkImage: "/images/svg/Transaction.svg",
        lightImage: "/images/svg/Transaction.svg",
      },
    ],

    navbusiness: [
      {
        title: "Business Profile",
        url: "/business/profile",
        icon: SquareTerminal,
        darkImage: "/images/svg/businessProfile.svg",
        lightImage: "/images/svg/businessProfile.svg",
      },
      // {
      //   title: "Manage Business Types",
      //   url: "/business/profile/update?tab=business-types",
      //   icon: SquareTerminal,
      //   darkImage:"/images/svg/Home.svg",
      //   lightImage:"/images/svg/Home.svg"
      // },
      {
        title: "Manage CRMs",
        url: "/business/crm/manage",
        icon: SquareTerminal,
        darkImage: "/images/svg/Home.svg",
        lightImage: "/images/svg/Home.svg",
      },
    ],

    projects: [
      {
        name: "MOREFOOD",
        url: "/morefood",
        // url: `${session.data?.user?.userDetails?.crm_link[0] as string}`,
        icon: Frame,
        darkImage: "/images/svg/morefood.svg",
        lightImage: "/images/svg/morefood.svg",
      },
      // {
      //   name: "MORESALONS",
      //   url: "#",
      //   icon: PieChart,
      //   darkImage:"/images/svg/moresaloonwhite.svg",
      //   lightImage:"/images/svg/moresaloonblack.svg"
      // },
      // {
      //   name: "STATION",
      //   url: "#",
      //   icon: Map,
      //   darkImage:"/images/svg/Home.svg",
      //   lightImage:"/images/svg/Home.svg"
      // },
      // {
      //   name: "MARKETPLACE",
      //   url: "#",
      //   icon: Map,
      //   darkImage:"/images/svg/Home.svg",
      //   lightImage:"/images/svg/Home.svg"
      // },
    ],
    crm: [
      ...(session?.data?.user?.userDetails?.crm_link?.restro_link
        ? [
          {
            name: "MOREFOOD CRM",
            url:
              session?.data?.user?.userDetails?.crm_link?.restro_link ?? "#",
            icon: Frame,
            darkImage: "/images/svg/morefood.svg",
            lightImage: "/images/svg/morefood.svg",
          },
        ]
        : []),
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props} className="">
      <SidebarHeader className="px-0 pb-4">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="hide-scroll-bar">
        <NavMain items={data.navMain} title="Dashboard" />
        {user?.profile?.user_type === "BUSINESS" && (
          <NavMain items={data.navbusiness} title="Business" />
        )}
        <NavProjects projects={data.projects} />
        {user?.profile?.user_type === "BUSINESS" &&
          session?.data?.user?.userDetails?.crm_link && (
            <NavCRM projects={data.crm} />
          )}
      </SidebarContent>
      <SidebarFooter className="py-4">
        <SidebarMenuButton
          asChild
          isActive={pathname === "/settings"}
          tooltip={"Setting"}
          className=""
        >
          <Link href={"/settings"} className="font-semibold">
            <Settings />
            <span>Settings</span>
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

import { ComponentType, SVGProps } from "react";

import { Bars, Bell, Envelope, Gear, House, Magnifier, Person } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";
import { ChartArea, User2 } from "lucide-react";
import { TbAsset } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { getSession } from "@/lib/session";

export default async function DashboardSideBar() {
    const session = await getSession()
    const user = session?.user;
    const role = user?.role || 'buyer'
    const daashboardItems = {
        seller: [
            { icon: ChartArea, label: "Overview", link: "/dashboard/seller" },
            { icon: TbAsset, label: "Products", link: "/dashboard/seller/products" },
            { icon: BiMoney, label: "Transaction", link: "/dashboard/seller/transaction", },
        ],

        buyer: [
            { icon: ChartArea, label: "Overview", link: "/dashboard/buyer" },
            { icon: TbAsset, label: "Products", link: "/dashboard/buyer/products" },
            { icon: BiMoney, label: "Transaction", link: "/dashboard/buyer/transaction", },
        ],

        admin: [
            { icon: ChartArea, label: "Overview", link: "/dashboard/buyer" },
            { icon: User2, label: "User Manage", link: "/dashboard/buyer/products" },
            { icon: BiMoney, label: "Transaction", link: "/dashboard/buyer/transaction", },
        ],
    };
    const navItems = daashboardItems[role]
    // const navItems = [
    //     { icon: House, label: "Home" },
    //     { icon: Magnifier, label: "Search" },
    //     { icon: Bell, label: "Notifications" },
    //     { icon: Envelope, label: "Messages" },
    //     { icon: Person, label: "Profile" },
    //     { icon: Gear, label: "Settings" },
    // ];

    return (
        <Drawer>
            <Button className={'hidden'} variant="secondary">
                <Bars />
                Menu
            </Button>
            <nav className="flex flex-col gap-1 ">
                <div className="p-3">
                    <Link href={'/'}>
                        <h2 className="font-extrabold text-2xl ">
                            Tech
                            <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text text-transparent">
                                Bazaar
                            </span>
                        </h2>
                    </Link>
                    <div className="text-sm">
                        <p>{user?.email}</p>
                        <p>{user?.role}</p>
                    </div>
                </div>
                {navItems.map((item) => (
                    <Link key={item.label} href={item.link}>
                        <button
                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                            type="button"
                        >
                            <item.icon className="size-5 text-muted" />
                            {item.label}
                        </button>
                    </Link>
                ))}
            </nav>
            <Drawer.Backdrop>
                <Drawer.Content placement="left">
                    <Drawer.Dialog>
                        <Drawer.CloseTrigger />
                        <Drawer.Header>
                            <Drawer.Heading>Navigation</Drawer.Heading>
                        </Drawer.Header>
                        <Drawer.Body>
                            <nav className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <Link key={item.label} href={item.link}>
                                        <button
                                            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                                            type="button"
                                        >
                                            <item.icon className="size-5 text-muted" />
                                            {item.label}
                                        </button>
                                    </Link>
                                ))}
                            </nav>
                        </Drawer.Body>
                    </Drawer.Dialog>
                </Drawer.Content>
            </Drawer.Backdrop>
        </Drawer>
    );
}
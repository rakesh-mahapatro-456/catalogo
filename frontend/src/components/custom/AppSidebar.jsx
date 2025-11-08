import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Users, PlusCircle, LogOut, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "../mode-toggle";
import { logout } from "@/store/feature/auth/authSlice.js";
import { toast } from "sonner";
import { LoaderThree } from "../../components/ui/loader";
import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);
  const { cart = [] } = useSelector((state) => state.cart);

  const items = [
    { title: "Products", url: "/home", icon: Users },
    //{ title: "Create Products", url: "/products/create", icon: PlusCircle },
  ];

  // Show loader if loading or user is not yet available
  if (loading || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoaderThree />
      </div>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-2"
            >
              <span className="text-2xl font-bold">CataLogo</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link to={item.url}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* 🛒 Cart button with badge */}
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/cart"}>
                  <Link
                    to="/cart"
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" />
                      <span>Cart</span>
                    </div>

                    {/* Badge showing total quantity of items in cart */}
                    {Array.isArray(cart) && cart.length > 0 && (
                      <Badge className="ml-2 bg-primary text-white rounded-full px-2 py-0 text-xs">
                        {cart.reduce((sum, item) => sum + item.qty, 0)}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* 🌗 Mode toggle */}
        <SidebarGroup>
          <ModeToggle />
        </SidebarGroup>
      </SidebarContent>

      {/* 👤 User dropdown */}
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 p-2 cursor-pointer">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">
                {user?.username || "User"}
              </span>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => {
                dispatch(logout());
                toast("Logout successful");
                navigate("/", { replace: true });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

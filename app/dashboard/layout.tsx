"use client"

import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Truck, 
  Users, 
  LogOut,
  Bell,
  Search,
  Menu,
  Building2,
  Tags,
  ImageIcon
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ReactNode, useState } from "react"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  const navItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Banners", href: "/dashboard/banners", icon: ImageIcon },
    { name: "Products", href: "/dashboard/products", icon: Package },
    { name: "Categories", href: "/dashboard/categories", icon: Tags },
    { name: "Customers", href: "/dashboard/customers", icon: Users },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-gray-50 flex-1">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="p-4 border-b border-gray-100">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-lg font-bold tracking-tighter text-gray-900">
                SRK<span className="text-primary">ADMIN</span>
              </span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase text-gray-400">Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton 
                        asChild 
                        isActive={pathname === item.href}
                        className={`w-full px-4 py-3 flex items-center gap-3 transition-colors ${
                          pathname === item.href 
                            ? "bg-primary/10 text-primary font-bold border-l-4 border-primary" 
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Link href={item.href}>
                          <item.icon className="w-5 h-5" />
                          <span>{item.name}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-gray-100">
            <Button variant="ghost" className="w-full justify-start gap-3 text-primary hover:bg-primary-muted hover:text-primary-hover">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </Button>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <div className="relative hidden md:block w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search orders, products..." 
                  className="pl-10 h-10 border-gray-200 focus-visible:ring-primary rounded-md"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative text-gray-500">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" alt="Admin" />
                      <AvatarFallback className="bg-primary text-white">AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">admin@srksteel.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-primary">Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6 md:p-8 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}


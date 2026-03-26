"use client"

import { 
  Settings, 
  Shield, 
  Bell, 
  Globe, 
  Database, 
  Save, 
  RefreshCcw, 
  FileCode,
  Lock,
  Eye,
  Menu,
  HardDrive,
  ArrowRight
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

export default function DashboardSettings() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-sans">System Configuration</h1>
          <p className="text-gray-500 mt-1">Manage global website settings, security, and industrial parameters.</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" className="rounded-none border-gray-200 flex items-center gap-2 h-12 px-6">
              <RefreshCcw className="w-4 h-4"/>
              Reset All
           </Button>
           <Button className="bg-primary hover:bg-red-700 text-white rounded-none h-12 px-8 font-bold flex items-center gap-2">
              <Save className="w-4 h-4"/>
              Apply Changes
           </Button>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white border border-gray-100 rounded-none w-full justify-start h-auto p-1 mb-6 gap-2">
          <TabsTrigger value="general" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] px-6 py-3 transition-colors h-11">
             General
          </TabsTrigger>
          <TabsTrigger value="seo" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] px-6 py-3 transition-colors h-11">
             SEO & Content
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] px-6 py-3 transition-colors h-11">
             Login & Security
          </TabsTrigger>
          <TabsTrigger value="database" className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-white font-bold uppercase tracking-widest text-[10px] px-6 py-3 transition-colors h-11">
             Data & Sync
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="rounded-none border-gray-100 shadow-sm bg-white overflow-hidden border-t-4 border-t-primary">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-gray-900">
                       <Globe className="w-5 h-5 text-primary"/>
                       Site Information
                    </CardTitle>
                    <CardDescription>Configure public-facing company details.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="space-y-2">
                       <Label htmlFor="site_name" className="text-xs font-bold uppercase text-gray-400">Company Name</Label>
                       <Input id="site_name" defaultValue="SRK Steel" className="rounded-none border-gray-200 h-11 transition-all focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="site_email" className="text-xs font-bold uppercase text-gray-400">Support Email</Label>
                       <Input id="site_email" defaultValue="sales@srksteel.com" className="rounded-none border-gray-200 h-11 transition-all focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                       <Label htmlFor="address" className="text-xs font-bold uppercase text-gray-400">Office Address</Label>
                       <Textarea id="address" defaultValue="123 Industrial Area, Phase 4, Steel City, SC 54321" className="rounded-none border-gray-200 min-h-[80px]" />
                    </div>
                 </CardContent>
              </Card>

              <Card className="rounded-none border-gray-100 shadow-sm bg-white overflow-hidden border-t-4 border-t-gray-900">
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-gray-900">
                       <HardDrive className="w-5 h-5 text-gray-900"/>
                       System Parameters
                    </CardTitle>
                    <CardDescription>Low-level site configurations.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-6">
                    <div className="flex items-center justify-between py-4 border-b border-gray-50">
                       <div className="space-y-0.5">
                          <div className="text-sm font-bold text-gray-900">Maintenance Mode</div>
                          <div className="text-xs text-gray-500 font-medium">Temporarily disable public access.</div>
                       </div>
                       <Switch className="bg-primary/20 data-[state=checked]:bg-primary" />
                    </div>
                    <div className="flex items-center justify-between py-4 border-b border-gray-50">
                       <div className="space-y-0.5">
                          <div className="text-sm font-bold text-gray-900">Catalogue Visibility</div>
                          <div className="text-xs text-gray-500 font-medium">Show pricing to non-industrial users.</div>
                       </div>
                       <Switch defaultChecked className="bg-primary/20 data-[state=checked]:bg-primary" />
                    </div>
                    <div className="flex items-center justify-between py-4">
                       <div className="space-y-0.5">
                          <div className="text-sm font-bold text-gray-900">High Contrast Mode</div>
                          <div className="text-xs text-gray-500 font-medium">Default to industrial visual standards.</div>
                       </div>
                       <Switch defaultChecked className="bg-primary/20 data-[state=checked]:bg-primary" />
                    </div>
                 </CardContent>
              </Card>
           </div>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
           <Card className="rounded-none border-gray-100 shadow-sm bg-white max-w-4xl mx-auto border-t-4 border-t-blue-600">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-gray-900">
                    <FileCode className="w-5 h-5 text-blue-600"/>
                    Search Engine Optimization
                 </CardTitle>
                 <CardDescription>Optimize visibility on search engines for steel-related keywords.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="meta_title" className="text-xs font-bold uppercase text-gray-400">Meta Title Prefix</Label>
                    <Input id="meta_title" defaultValue="SRK Steel | " className="rounded-none border-gray-200 h-11" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="meta_desc" className="text-xs font-bold uppercase text-gray-400">Global Meta Description</Label>
                    <Textarea id="meta_desc" defaultValue="Premier industrial steel solutions including TMT bars, structural beams, and custom fabrication services." className="rounded-none border-gray-200" />
                 </div>
                 <div className="pt-4">
                    <h4 className="text-xs font-bold uppercase text-gray-400 mb-4">Google Preview</h4>
                    <div className="border border-gray-100 p-6 bg-gray-50 space-y-2 max-w-md">
                        <div className="text-blue-600 text-lg hover:underline cursor-pointer">SRK Steel | Premium Industrial Solutions</div>
                        <div className="text-green-700 text-sm">https://srksteel.com/catalogue</div>
                        <div className="text-gray-500 text-xs">Explore high-quality TMT bars and structural steel products. ISO certified manufacturing and nationwide delivery available...</div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
           <Card className="rounded-none border-gray-100 shadow-sm bg-white max-w-2xl mx-auto border-t-4 border-t-red-700">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-gray-900">
                    <Lock className="w-5 h-5 text-red-700"/>
                    Admin Access Control
                 </CardTitle>
                 <CardDescription>Manage password policy and authentication methods.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                 <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                       <Label className="text-sm font-bold text-gray-900">Two-Factor Authentication</Label>
                       <p className="text-xs text-gray-500">Add an extra layer of security to your admin account.</p>
                       <Button variant="outline" className="rounded-none border-gray-200 w-fit h-11 font-bold">Enable 2FA</Button>
                    </div>
                    <div className="flex flex-col gap-2 pt-4">
                       <Label className="text-sm font-bold text-gray-900">Change Admin Password</Label>
                       <p className="text-xs text-gray-500">Update your account password regularly.</p>
                       <Button variant="outline" className="rounded-none border-gray-200 w-fit h-11 font-bold">Update Password</Button>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
        
        <TabsContent value="database" className="space-y-6">
           <Card className="rounded-none border-gray-100 shadow-sm bg-white max-w-3xl mx-auto border-t-4 border-t-green-600">
              <CardHeader>
                 <CardTitle className="flex items-center gap-2 text-lg font-bold uppercase tracking-wider text-gray-900">
                    <Database className="w-5 h-5 text-green-600"/>
                    External Data Integration
                 </CardTitle>
                 <CardDescription>Manage connections to ERP and inventory management systems.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                 <div className="flex items-center justify-between border-b border-gray-50 pb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-gray-100 flex items-center justify-center font-bold text-gray-400 tracking-tighter shadow-inner">API</div>
                       <div>
                          <div className="font-bold text-gray-900">Inventory Sync Endpoint</div>
                          <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">STATUS: CONNECTED</div>
                       </div>
                    </div>
                    <Button variant="ghost" size="icon"><Settings className="w-4 h-4"/></Button>
                 </div>
                 <div className="flex items-center justify-between pb-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 bg-gray-100 flex items-center justify-center font-bold text-gray-400 tracking-tighter shadow-inner">CRM</div>
                       <div>
                          <div className="font-bold text-gray-900">Customer Relationship Management</div>
                          <div className="text-xs text-gray-400 uppercase tracking-widest mt-1">STATUS: DISCONNECTED</div>
                       </div>
                    </div>
                    <Button variant="ghost" className="text-primary font-bold text-xs uppercase transition-all flex items-center gap-2">Connect <ArrowRight className="w-3 h-3"/></Button>
                 </div>
                 
                 <div className="pt-8 border-t border-gray-50">
                    <div className="p-4 bg-red-50/50 border border-red-100 space-y-4">
                       <h4 className="text-xs font-bold text-red-700 uppercase tracking-wider">Danger Zone</h4>
                       <div className="flex justify-between items-center">
                          <p className="text-xs text-red-600/80">Clear all local cache and rebuild the static site snapshot.</p>
                          <Button variant="outline" className="rounded-none border-red-200 text-red-700 font-bold text-xs uppercase h-10 px-6 hover:bg-red-700 hover:text-white transition-colors">Wipe Cache</Button>
                       </div>
                    </div>
                 </div>
              </CardContent>
           </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

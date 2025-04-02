import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { LayoutDashboard } from 'lucide-react'
import React from 'react'
import Menu from './menu'

const MenuDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <LayoutDashboard />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-[350px] max-h-[500px] overflow-hidden " 
        side="bottom" align="end"
      >
        <Card className="w-full dark:bg-background">
          <CardHeader>
            <CardTitle>Menu</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[400px] hide-scroll-bar overflow-y-auto ">
            <Menu />
          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MenuDropdown

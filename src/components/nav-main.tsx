import {NavLink} from 'react-router';
import {type Icon} from '@tabler/icons-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                to={item.url}
                end={item.url === '/dashboard'} // Only dashboard has exact match
                className={({isActive}) =>
                  isActive ? 'active-link' : 'inactive-link'
                }>
                {({isActive}) => (
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={`cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-primary to-primary/30 text-white hover:text-white'
                        : ''
                    }`}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

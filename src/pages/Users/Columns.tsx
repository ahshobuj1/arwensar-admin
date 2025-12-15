import type {ColumnDef} from '@tanstack/react-table';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {MoreHorizontal} from 'lucide-react';
import {formatDate} from '@/utils/formatDate';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import type {IUser} from './type';
import UserStatusCell from './UserStatusCell';

export const columns: ColumnDef<IUser>[] = [
  // 📧 Email
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({row}) => <div className="font-medium">{row.original.email}</div>,
  },

  // 🧑 Role
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({row}) => {
      const role = row.original.role;

      const color =
        role === 'ADMIN'
          ? 'bg-purple-600'
          : role === 'VENDOR'
          ? 'bg-blue-600'
          : 'bg-gray-500';

      return <Badge className={`${color} text-white`}>{role}</Badge>;
    },
  },

  // 🏢 Vendor / Company
  {
    header: 'Company',
    cell: ({row}) => {
      const vendor = row.original.vendor;

      if (!vendor) return <span className="text-muted-foreground">—</span>;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{vendor.companyName || 'N/A'}</span>
          <span className="text-xs text-muted-foreground">
            {vendor.businessEmail}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({row}) => (
      <UserStatusCell userId={row.original.id} status={row.original.status} />
    ),
  },

  // 🔐 Verified
  {
    accessorKey: 'isVerified',
    header: 'Verified',
    cell: ({row}) =>
      row.original.isVerified ? (
        <Badge className="bg-green-600 text-white">Yes</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
      ),
  },

  // 🔁 Password Change Required
  {
    accessorKey: 'needPasswordChange',
    header: 'Pwd Reset',
    cell: ({row}) =>
      row.original.needPasswordChange ? (
        <Badge className="bg-yellow-500 text-black">Required</Badge>
      ) : (
        <Badge variant="outline">No</Badge>
      ),
  },

  // 📅 Created At
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({row}) => <span>{formatDate(row.original.createdAt)}</span>,
  },

  // ⚙️ Actions
  {
    id: 'actions',
    header: 'Actions',
    cell: ({row}) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>

            {user.status === 'ACTIVE' ? (
              <DropdownMenuItem className="text-yellow-600">
                Suspend User
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem className="text-green-600">
                Activate User
              </DropdownMenuItem>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-destructive">
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

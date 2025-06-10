
import React from 'react';
import { MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ActionButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  customActions?: Array<{
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
    variant?: 'default' | 'destructive';
  }>;
}

export function ActionButtons({ onView, onEdit, onDelete, customActions = [] }: ActionButtonsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={onView}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </DropdownMenuItem>
        )}
        {customActions.length > 0 && (
          <>
            <DropdownMenuSeparator />
            {customActions.map((action, index) => (
              <DropdownMenuItem 
                key={index} 
                onClick={action.onClick}
                className={action.variant === 'destructive' ? 'text-red-600' : ''}
              >
                {action.icon && <span className="mr-2">{action.icon}</span>}
                {action.label}
              </DropdownMenuItem>
            ))}
          </>
        )}
        {onDelete && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete} className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

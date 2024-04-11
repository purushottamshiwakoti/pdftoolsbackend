import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateCommentStatus } from "@/actions/comment";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export type Comments = {
  id: string;
  fullName: string;
  email: string;
  comment: string;
  blog: {
    title: string;
  };
  isPublished: boolean;
};

const CommentCell: React.FC<{ row: any }> = ({ row }) => {
  const { id, isPublished } = row.original;
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const handleCheck = (value: boolean) => {
    startTransition(() => {
      updateCommentStatus(id, value).then((data) => {
        if (data?.success) {
          toast.success(data.success);
          router.refresh();
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  };

  return (
    <Switch
      checked={isPublished}
      onCheckedChange={() => handleCheck(!isPublished)}
      disabled={isPending}
    />
  );
};

export const columns: ColumnDef<Comments>[] = [
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "comment",
    header: "Comment",
  },
  {
    accessorKey: "blog.title",
    header: "Blog Title",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "isPublished",
    cell: CommentCell,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const comment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/blogs/comments/${comment.id}`}>View Comment</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

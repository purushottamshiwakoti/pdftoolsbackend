import { BackButton } from "@/components/common/back-button";
import prismadb from "@/lib/db";
import { redirect } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

async function getData(id: string) {
  try {
    const data = await prismadb.comment.findUnique({
      where: {
        id,
      },
      include: {
        blog: true,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
}

const ViewCommentPage = async ({ params }: { params: any }) => {
  const data = await getData(params.id);
  if (!data) {
    redirect("/blogs/comments");
  }
  console.log(data);
  return (
    <div>
      <div>
        <BackButton href="/blogs/comments" />
      </div>
      <div className="mt-10">
        <Card className="w-[40rem]">
          <CardHeader>
            <CardTitle>Commented by {data.fullName}</CardTitle>
            <CardDescription>Email {data.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-muted-foreground">Comment: {data.comment}</p>
              <div className="mt-3 space-y-4">
                <h1 className="text-muted-foreground">
                  Blog title: {data.blog.title}
                </h1>
                <div className="relative h-[20rem] w-[30rem]">
                  <Image
                    src={data.blog.image}
                    alt={data.blog.imageAlt}
                    fill
                    className="rounded-md"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewCommentPage;

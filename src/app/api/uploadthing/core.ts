import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    audio: { maxFileSize: "1MB", maxFileCount: 1 },
  })
    .middleware(async ({ req }) => {
      const user = await auth(req);

      console.log(req);

      if (!user) throw new Error("Unauthorized");


      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      return { uploadedBy: metadata.userId };
    }),

  mediaPost: f({
    image: { maxFileSize: "2MB", maxFileCount: 1 },
    audio: { maxFileSize: "2MB", maxFileCount: 1 },
  })
    .middleware(({ req }) => auth(req))
    .onUploadComplete((data) => console.log("file", data)),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

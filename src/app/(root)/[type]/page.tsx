import Card from "@/components/card";
import Sort from "@/components/sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import React from "react";

const Page = async ({ params }: { params: Promise<{ type: string }> }) => {
  const { type } = (await params) || "";

  const files = await getFiles();

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total: <span className="h5">0 MB</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden sm:block text-cyan-700">Sort by:</p>
            <Sort />
          </div>
        </div>
      </section>
      {/* render the files */}
      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};

export default Page;

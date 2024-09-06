import client from "@/tina/__generated__/databaseClient";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default async function Page() {
  const { data: posts } = await client.queries.postConnection();
  const { data } = await client.queries.articleConnection();

  return (
    <>
      <h1 className="text-2xl mt-4">Posts</h1>
      <div>
        {posts.postConnection.edges?.map((post) => (
          <div key={post?.node?.id}>
            <Link href={`/posts/${post?.node?._sys.filename}`}>
              {post?.node?._sys.filename}
            </Link>
          </div>
        ))}
      </div>
      <h1 className="text-2xl mt-4">Articles</h1>
      <div>
        {data.articleConnection.edges?.map((article) => (
          <div
            key={article?.node?.id}
            className="border rounded m-2 p-5 bg-slate-700"
          >
            <p className="text-xl font-bold">{article?.node?.title}</p>
            {article?.node?.blocks?.map((block) => (
              <div>
                {block?.description.children && (
                  <TinaMarkdown content={block.description} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

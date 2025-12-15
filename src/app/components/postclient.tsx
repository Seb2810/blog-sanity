/* eslint-disable @next/next/no-img-element */

"use client";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { useState } from "react";
import { SanityDocument } from "sanity";
import { Comments } from "./commentaires";
import { Post } from "../types/types";


const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

export default   function PostPageClient({
  post,
  postImageUrl,
}: {
  post: Post;
  postImageUrl: string |  undefined;
}) {
  const [commentCount, setCommentCount] = useState(0); // 🔹 compteur

 return (
  
    <div className="post-data">
    {/*<Link href="/">← Back to posts</Link>*/}
	<div className="ml-5">
       <p className="max-w-6xl mx-auto text-4xl  pt-2 md:pt-2 text-bold">{post.title}{" "}
        <span style={{ fontSize: "15px", color: "#6037deff" }}>
          ({commentCount} commentaires{commentCount > 1 ? "s" : ""})
        </span>
        </p> 
     </div>


	<div className="container w-full max-w-6xl ml-5 bg-white bg-cover mt-8 rounded" >
      {postImageUrl &&  <img  src={postImageUrl} alt="" width={800} height={600} />}
</div>
    
        <p className=" xl:ml-12 lg:ml-10 md:ml-8">Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
     <div className="container max-w-5xl  mt-5">
		
		<div className="mx-0 sm:mx-6  flex flex-col">
			
			<div className="bg-white w-full text-base sm:text-lg md:text-xl lg:text-2xl 
                    max-w-prose text-gray-800 leading-normal" >

        {Array.isArray(post.body) && <PortableText value={post.body} />}
    </div>
    </div>
    </div>

				
      {/* 🔹 Section des commentaires avec compteur dynamique */}
      <Comments postId={post._id} onCountChange={setCommentCount} />
      
    
    </div>
  );
}
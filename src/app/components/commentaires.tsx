/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import { CommentForm } from "./comment";

export function Comments({ postId , onCountChange  }: { postId: string , onCountChange?: (count: number) => void }) {
  const [comments, setComments] = useState<any[]>([]);
 const [loading, setLoading] = useState(true);
  // Chargement initial
  useEffect(() => {
    fetch(`/api/get-comment?postId=${postId}`)
       .then(res => res.json())
      .then(data => {
        setComments(data);
        setLoading(false);
        onCountChange?.(data.length); // 🔹 envoie le nombre au parent
      });
  }, [postId, onCountChange]);

  const handleCommentAdded = (newComment: any) => {
    
    console.log('newComment ---->  ' ,newComment)
   
    const updated = [newComment, ...comments];
  
    setComments(updated);
       
    console.log('comments--->  ', updated)
   
        console.log('comment updated --->', updated)
   
        onCountChange?.(updated.length); // 🔹 met à jour le nombre au parent
  };

  return (
    <section className="mt-8 flex flex-col text-base sm:text-lg md:text-xl lg:text-xl 
                    max-w-full text-gray-800 leading-normal" >
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length > 0 ? (
      <div className="flex flex-col p-5 ml-5 lg:py-11">
          {comments.map((comment: any , index) => (
          
             <div className={"bg-gray-100 p-5 mb-10"} key={comment._id|| index}>

            
                <div className="font-bold text-2xl mb-2">{comment.author}</div> 
           <p > {comment.createdAt
    ? new Date(comment.createdAt).toLocaleDateString()
    : "Date inconnue"}
            </p>
              <p className="my-3">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="ml-13">No comments yet. Be the first!</p>
      )}

      <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
    </section>
  );
}

import { Meteor } from 'meteor/meteor';
import React, { useEffect, useMemo, useState } from 'react';

export const Hello = () => {
  let [comments, setComments] = useState([])

  const getComments = async () => {
    Meteor.callAsync('get_comments').then(data => setComments(data)).catch(error => console.error(error))
  }

  useEffect(() => {
    getComments()
  },[])

  useMemo(() => {
    console.log(comments)
  }, [comments.length])

  return (
    <div>
      {comments.map((comment: any) => (
        <div className='' key={comment.id}>
          <div className='p-5 bg-gray-300 mb-5 rounded-xl relative'> 
            <div className='flex items-center'>
              <img className="rounded-xl" src={comment.from.picture.data.url}/>

              <div className='flex-col'>
                <p className='mx-2 mt-2 font-bold'>{comment.from.name}</p>
                <p className='mx-2 font-medium'>{new Date(Date.parse(comment.created_time)).toDateString()}</p>
              </div>
              <div className='bg-gray-400 px-[2px] py-7'/>

              <p className='m-2'>{comment.message}</p>
            </div>
            {comment.attachment && (comment.attachment.type == "photo" || comment.attachment.type == "sticker") ? 
            <img className='m-2 rounded-xl' src={comment.attachment.media.image.src}/>
            : 
            null }
            {comment.attachment && comment.attachment.type == "animated_image_video" ? 
            <video width="320" height="240" className='m-2 rounded-xl' autoPlay muted loop>
              <source src={comment.attachment.media.source} type="video/mp4"/>
              Your browser does not support the video tag.
            </video>
            : 
            null }
            {comment.reactions ? 
            <div className='absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-xl'> 
              {comment.reactions.data.map((reaction: any) => (
                <p key={reaction.id}>{reaction.type}</p>
              ))}
            </div>
            : 
            null}
          </div>
          {comment.comments ? 
            comment.comments.data.map((child: any) => (
            <div className='p-5 ml-20 bg-gray-300 mb-5 rounded-xl' key={child.id}> 
              <div className='flex items-center'>
                <img className="rounded-xl" src={child.from.picture.data.url}/>

                <div className='flex-col'>
                <p className='mx-2 mt-2 font-bold'>{child.from.name}</p>
                <p className='mx-2 font-medium'>{new Date(Date.parse(child.created_time)).toDateString()}</p>
                </div>
                <div className='bg-gray-400 px-[2px] py-7'/>

                <p className='m-2'>{child.message}</p>
              </div>
              {child.attachment && (child.attachment.type == "photo" || child.attachment.type == "sticker") ? 
              <img className='m-2 rounded-xl' src={child.attachment.media.image.src}/>
              : 
              null }
              {child.attachment && child.attachment.type == "animated_image_video" ? 
              <video width="320" height="240" className='m-2 rounded-xl' autoPlay muted loop>
                <source src={child.attachment.media.source} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>
              : 
              null }
              {child.reactions ? 
              <div className='absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-xl'> 
                {child.reactions.data.map((reaction: any) => (
                  <p key={reaction.id}>{reaction.type}</p>
                ))}
              </div>
              : 
              null}
            </div>
          ))
          : 
          null}
        </div>
      ))}
    </div>
  );
};

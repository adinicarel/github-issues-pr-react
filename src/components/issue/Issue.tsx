import React, { FC, useEffect, useState } from 'react'
import { IComment } from '../../types/IComment';
import { IssueItemProps } from '../../types/IssuesListType'
import { formatIsoDate } from '../../utils/dateFormatting';

const IssueItem:FC<IssueItemProps> = ( props ) => {

    const errorState = {status: false, message: ''};

    const [showModal, setShowModal] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [comments, setComments] = useState<IComment | any>([]);
    const [commentsError, setCommentsError] = useState(errorState);

    useEffect(() => {

        const controller = new AbortController();
   
    const fetchIssueComments = async () => {
      setIsLoading(true);
      
      const response = await fetch(`${props.issue?.url}/comments`, { 
        signal: controller.signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        }
       });
      
      if( response.status === 404) {
        
        setCommentsError(prevState => ({
          ...prevState,
          status:true,
          message: `Comments Not Found for issue number ${props.issue?.number}.`
          })); 
        return;
      } 
      
      const commentsData = await response.json();
      setComments(commentsData);
      setIsLoading(false);
      setCommentsError(errorState);
    }

    if(Number(props.issue?.comments)>0) fetchIssueComments();

    return () => controller.abort(); 

    },[props.issue?.comments, props.issue?.url, props.issue?.number])


  return (
    <article className="grid items-center justify-start p-3 gap-3 bg-slate-800 text-stone-100 
    rounded-md drop-shadow transition ease-in duration-150 hover:bg-slate-600 hover:text-stone-50 cursor-pointer" 
    onClick={() => setShowModal(true)}>
        <h3 className='text-center text-xl'>Issue title: {props.issue?.title}</h3>
        <ul>
            <li>{props.issue?.pull_request ? 'Type: pull request' : 'Type: issue'}</li>
            <li>Owner: {props.issue?.user?.login}</li>
            <li>{`Created: ${formatIsoDate(props.issue?.created_at as string)}`}</li>
            <li>Number of comments: {props.issue?.comments}</li>
            <li><ol>
                 {Number(props.issue?.labels?.length)>0 ? props.issue?.labels?.map(label =>(
                   <li key={label?.id}>Label name: {label?.name}</li> 
                 )) : <li>No label</li>
                }
                </ol>
            </li>
        </ul>
        {
        showModal ? (
            <section aria-hidden="true" className=' opacity-90 place-content-center
             overflow-x-hidden overflow-y-auto fixed z-30 inset-0.5 outline-none bg-fuchsia-100 text-stone-800 h-modal md:h-full md:inset-0' >
                <div className='flex px-4 w-full max-w-2xl h-full md:h-auto'>
                    <div className=' relative flex-col gap-7 justify-center bg-white py-10 px-20 border-l-emerald-300 border-4 rounded-lg' >
                        <h4 className='text-2xl'>{props.issue?.title}</h4>
                        <p>{props.issue?.body}</p>
                        <ol>
                        {
                            comments.length ? comments?.map((comment:IComment) => (
                            <li key={comment?.id} className="grid items-center gap-2">
                                <span>{`Comment by ${comment?.user?.login}`}</span>
                                <span>{`Commentary: ${comment?.body}`}</span>
                                <span>{`Commented on: ${formatIsoDate(comment?.created_at as string)}`}</span>
                            </li>
                        )) : <li>No comments yet</li>
                        }
                
                        </ol>
                        <div className='flex place-content-center'>
                            <button data-modal-toggle="default-modal" className='py-3 px-5 transition ease-in uppercase delay-50 bg-blue-300 hover:scale-110 hover:bg-indigo-400 duration-200 rounded-sm' 
                                   onClick={() => setShowModal(false)} 
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                
            </section>
            ) : null
        }
    </article>
    
  )
}

export default IssueItem
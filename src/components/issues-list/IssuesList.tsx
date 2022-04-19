import React, { FC, useEffect, useState } from 'react'
import { IssuesProps, Issue } from '../../types/IssuesListType'
import IssueItem from '../issue/Issue';

const IssuesList:FC<IssuesProps> = ( props ) => {

  return (
    <section className='flex items-stretch gap-4 flex-wrap'>
      {
        props.issues?.map((issue:Issue)=> (
          <IssueItem issue={issue} key={issue?.id} />
        ))
      }
    </section>
  )
}

export default IssuesList
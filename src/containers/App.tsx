import React, {useState, useEffect} from 'react'
import SearchInputs from '../components/search-input/SearchInputs'
import IssuesList from '../components/issues-list/IssuesList';
import { Input } from '../types/InputType';
import {Issue, IssuesProps } from '../types/IssuesListType';

function App() {

  const BASE_URL = 'https://api.github.com';

  /* const issueState= {
    title: '',
    owner: '',
    createdAt: '',
    numOfComments: 0,
    labels: [],
    typeOfIssue: '',
  } */

  const inputState = {
    name: '',
    repo: ''
  }

  const errorState = {
    status: false,
    message: ''
  }
  const [isLoading, setIsLoading] = useState(false);

  const [apiUser, setApiUser] = useState('');
  const [userError, setUserError] = useState(errorState);

  const [apiRepo, setApiRepo] = useState('');
  const [repoError, setRepoError] = useState(errorState);

  const [inputData, setInputData] = useState<Input>(inputState);

  const [issues, setIssues] = useState<Issue[] | null>([]);
  const [issuesError, setIssuesError] = useState(errorState);


  const handleFormSubmit = (inputs: Input) => {
    setInputData(inputs);
    return {
      data: inputs,
      success: true
    };
  }
  

  /*** FETCHING THE USERNAME, IF IT EXISTS */
  useEffect(()=> {
    const controller = new AbortController();
   
    const fetchUser = async () => {
      setIsLoading(true);
      
      const response = await fetch(`${BASE_URL}/users/${inputData.name}`, { 
        signal: controller.signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        }
       });
      
      if( response.status === 404) {
        console.log(response.statusText);
        setUserError(prevState => ({
          ...prevState,
          status:true,
          message: `User ${inputData.name} Not Found. Please type a valid Github username`
          })); 
        return;
      } 
      
      const userData = await response.json();
      setApiUser(userData.login);
      setIsLoading(false);
      setUserError(errorState);
    }

    if(inputData.name!=='') fetchUser();

    return () => controller.abort(); 
  },[inputData.name])
  

  /*** FETCHING THE GIVEN REPO IN THE PROVIDED USER'S LIST OF REPOS, IF IT EXISTS */
  useEffect(()=> {
    const controller = new AbortController();
   
    const fetchUserRepo = async (user:string) => {
      setIsLoading(true);
      
      const response = await fetch(`${BASE_URL}/repos/${user}/${inputData.repo}`, { 
        signal: controller.signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        }
       });
      
      if( !response.ok ) {
        setRepoError(prevState => ({
          ...prevState,
          status:true,
          message: `Repo ${inputData.repo} Not Found. Please type a valid Github repo for username ${apiUser}`
          })); 
        return;
      } 
      
      const repoData = await response.json();
      setApiRepo(repoData.name);
      setIsLoading(false);
      setRepoError(errorState);
    }

    if(apiUser!=='') fetchUserRepo(apiUser);

    return () => controller.abort(); 
  },[apiUser, inputData.repo])



  /*** FETCHING THE GIVEN REPO ISSUES */
  useEffect(()=> {
    const controller = new AbortController();
   
    const fetchRepoIssues = async (user:string, repo:string) => {
      setIsLoading(true);
      
      const response = await fetch(`${BASE_URL}/repos/${user}/${repo}/issues`, { 
        signal: controller.signal,
        headers: {
          Accept: 'application/vnd.github.v3+json',
        }
       });
      
      if( !response.ok ) {
        setIssuesError(prevState => ({
          ...prevState,
          status:true,
          message: `Issues Not Found for GitHub username ${apiUser} in the ${apiRepo} repository. Please, check out another Repo`
          })); 
        return;
      } 
      
      const issuesData = await response.json();
      
      setIssues(issuesData);
      setIsLoading(false);
      setIssuesError(errorState);
    }

    if(apiUser!=='' && apiRepo!=='') fetchRepoIssues(apiUser, apiRepo);

    return () => controller.abort(); 
  },[apiUser, apiRepo])
  

  return (
    <div className='container px-3 py-2 mx-auto'>
      <h1 className='text-2xl text-center'>GitHub issues and pull requests</h1>
      <SearchInputs onFormSubmit={handleFormSubmit} />
      {
        apiUser !== '' && userError.status && <h3>{userError.message}</h3>
      }
      {
        apiUser !== '' && !userError.status && repoError.status && <h3>{repoError.message}</h3>
      }
      { apiUser !== '' && !userError.status && !repoError.status && issuesError.status && (<h3>{issuesError.message}</h3>)}

      { !issuesError.status && issues && <IssuesList issues={issues} />}
    </div>
    
  )
}

export default App
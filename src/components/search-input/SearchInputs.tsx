import React, {FC, ChangeEvent, FormEvent, useState} from 'react'
import { IProps } from '../../types/InputType';


const SearchInputs:FC<IProps> = (props) => {

  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [repo, setRepo] = useState("");
  const [repoError, setRepoError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, data: {} });

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value);
        validateName(e.currentTarget.value);
    };

  const validateName = (value: string): string => {
    const error = value ? "" : "You must enter a valid Github username";
    setNameError(error);
    return error;
  };

  const handleRepoChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepo(e.currentTarget.value);
    validateRepo(e.currentTarget.value);
  };

  const validateRepo = (value: string): string => {
    const error = value ? "" : "You must enter a valid Github repo";
    setRepoError(error);
    return error;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nameValidationError = validateName(name);
    const repoValidationError = validateRepo(repo);
    if (nameValidationError === "" && repoValidationError === "") {
      const result = props.onFormSubmit({
        name,
        repo
      });
      setSubmitResult(result);
      setSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto py-4 grid gap-y-4 items-center ">
        <div className='inline-flex justify-center gap-x-4'>
            <label htmlFor="name_input">GitHub username</label>
            <input 
                type="text" 
                id='name_input' 
                value = {name}
                onChange = {handleNameChange} 
                placeholder='adinicarel' />
            <p className="error">{nameError}</p>
        </div>

        <div className='inline-flex justify-center gap-x-4'>
            <label htmlFor="repo_input">GitHub repo</label>
            <input 
                type="text" 
                id='repo_input' 
                value={repo} 
                onChange={handleRepoChange}
                placeholder='github-issues-pr-react' />
            <p className="error">{repoError}</p>
        </div>

        <div className="flex place-content-center">
            <button type="submit" disabled={name ==='' || repo ===''} 
            className="py-3 px-5 transition ease-in delay-50 bg-blue-300 hover:scale-110 hover:bg-indigo-400 duration-200 rounded-sm">
            Search
            </button>
      </div>
    </form>
  )
}

export default SearchInputs
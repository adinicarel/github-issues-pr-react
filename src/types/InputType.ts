export interface Input {
    name: string;
    repo: string;
}

export interface InputCheck {
    success: boolean;
    data: Input
  }
  
export interface IProps {
    onFormSubmit: (data: Input) => InputCheck;
  }
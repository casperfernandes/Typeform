import styled from 'styled-components';

const SubmitWrapper = styled.div`
  display: flex;
  color: white;
  align-items: center;

  button {
    min-height: 40px;
    font-size: 20px;
    font-weight: 700;
    color: white;
    font-weight: 700;
    padding: 6px 14px;
    background-color: #0077ff;
    border-radius: 4px;
    margin-right: 12px;
    border: 1px solid transparent;
    cursor: pointer;
  }

  .helperText {
    display: none;

    @media (min-width: 1024px) {
      display: block;
      font-size: 12px;
    }
  }
`;

function SubmitButton(props) {
  const { buttonText, helperText, handleSubmit } = props;

  if (buttonText || helperText) {
    return (
      <SubmitWrapper>
        {buttonText ? <button onClick={handleSubmit}>{buttonText}</button> : null}

        {helperText ? <span className="helperText">{helperText}</span> : null}
      </SubmitWrapper>
    );
  }

  return null;
}

export default SubmitButton;

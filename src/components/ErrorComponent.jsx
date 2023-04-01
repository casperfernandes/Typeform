import styled from 'styled-components';

const ErrorWrapper = styled.div`
  margin-top: 16px;

  .error {
    background-color: #f7e6e6;
    border-radius: 3px;
    color: #ffffff;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    min-height: 28px;
    padding: 4px 12px 4px 8px;
    color: #af0404;
  }
`;

function ErrorComponent(props) {
  const { message } = props;

  if (message) {
    return (
      <ErrorWrapper>
        <div className="error">
          <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>

          <span>{message}</span>
        </div>
      </ErrorWrapper>
    );
  }

  return null;
}

export default ErrorComponent;

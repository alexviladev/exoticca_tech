const ErrorPage = ({ status, message, stack }: Error) => {
  return (
    <div>
      <h2>Oops! Something went wrong.</h2>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ErrorPage;

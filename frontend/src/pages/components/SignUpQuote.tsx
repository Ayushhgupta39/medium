const SignUpQuote = ({ quote }: { quote: string; }) => {
  return (
    <blockquote>
      <p className="text-2xl font-semibold mb-4">
        “{quote}”
      </p>
      <footer className="text-sm font-medium text-gray-400">
        Jules Winnfield <br />
        CEO, Acme Inc
      </footer>
    </blockquote>
  );
};

export default SignUpQuote;

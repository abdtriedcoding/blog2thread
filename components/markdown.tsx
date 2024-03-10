import markdownit from "markdown-it";

type Props = {
  text: string;
};

const md = markdownit();

export default function Markdown({ text }: Props) {
  const htmlContent = md.render(text);
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>;
}

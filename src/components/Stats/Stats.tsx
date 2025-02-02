import { bookData } from "@/constants";
import Title from "@/ui/Title";
import Card from "./Card";

interface IProps {
  count: {
    totalBook: number;
    complatedBook: number;
    unReadBook: number;
    countReadBook: number;
  };
}

const Stats = ({ count }: IProps) => {
  return (
    <div className="flex flex-col gap-5 w-100">
      <Title>Dashboard</Title>
      <div className="flex gap-4 flex-col tablet:flex-row h-full w-full">
        {bookData.map((data, index) => {
          return <Card key={index} data={data} count={count} />;
        })}
      </div>
    </div>
  );
};

export default Stats;

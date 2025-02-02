interface IProps {
  title: string;
  subtitle?: string;
}

const InfoDetail = ({ title, subtitle }: IProps) => {
  return (
    <div className="mb-3 grid grid-cols-2 gap-1 mg-3">
      <div className="w-full">
        <p className="break-words font-semibold text-lg text-gray-900 dark:text-white capitalize">
          {title}
        </p>
        <p className="break-words font-medium text-sm text-gray-500 dark:text-gray-200 capitalize">
          {subtitle}
        </p>
      </div>
    </div>
  );
};

export default InfoDetail;

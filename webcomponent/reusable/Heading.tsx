interface HeadingProps {
  title: string;
  subtitle?: string;
}

export const Heading = ({ title, subtitle }: HeadingProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl ">{title}</h1>
      {subtitle && <p className="text-[#6D4C41]">{subtitle}</p>}
    </div>
  );
};

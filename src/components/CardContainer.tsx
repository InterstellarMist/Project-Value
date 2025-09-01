
export const CardContainer: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <div className={`rounded-2xl bg-white/80 p-4 border border-gray-300 ${className}`}>
      {children}
    </div>
  );
};

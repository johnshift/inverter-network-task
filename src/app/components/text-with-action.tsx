interface TextWithActionProps {
  text: string;
  action?: React.ReactNode;
  className?: string;
}

export const TextWithAction = ({ text, action, className }: TextWithActionProps) => {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <span className='font-mono text-xs break-all text-muted-foreground'>{text}</span>
      {action && <div className='shrink-0'>{action}</div>}
    </div>
  );
};

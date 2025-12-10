import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const size = 16;
const strokeWidth = 2;
const radius = (size - strokeWidth) / 2;
const circumference = 2 * Math.PI * radius;

interface Props {
  remainingSeconds: number;
  totalSeconds: number;
}

export const CooldownIndicator = ({ remainingSeconds, totalSeconds }: Props) => {
  const progress = remainingSeconds / totalSeconds;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className='flex items-center justify-center'>
          <svg
            width={size}
            height={size}
            className='-rotate-90'
            aria-label={`Cooldown: ${remainingSeconds}s remaining`}
          >
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill='none'
              stroke='currentColor'
              strokeWidth={strokeWidth}
              className='text-muted-foreground/30'
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill='none'
              stroke='currentColor'
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap='round'
              className='text-muted-foreground transition-[stroke-dashoffset] duration-1000 ease-linear'
            />
          </svg>
        </div>
      </TooltipTrigger>
      <TooltipContent side='bottom' className='text-xs'>
        Cooldown: {remainingSeconds}s
      </TooltipContent>
    </Tooltip>
  );
};

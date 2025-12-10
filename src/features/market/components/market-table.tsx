'use client';

import Image from 'next/image';
import { useState } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowDownWideNarrowIcon, ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  CoingeckoMarketDataItem,
  CoingeckoMarketDataResponse,
} from '@/features/market/schemas';
import { cn } from '@/lib/utils/index';

const RIGHT_ALIGNED_COLUMNS = [
  'current_price',
  'price_change_percentage_24h',
  'market_cap',
  'total_volume',
];

export const MarketTableSkeleton = () =>
  Array.from({ length: 10 }).map((_, i) => (
    <TableRow key={i}>
      <TableCell className='px-1 md:px-2'>
        <Skeleton className='h-4 w-24 md:h-5 md:w-32' />
      </TableCell>
      <TableCell className='px-1 md:px-2'>
        <Skeleton className='h-4 w-12 md:h-5 md:w-16' />
      </TableCell>
      <TableCell className='px-1 text-right md:px-2'>
        <Skeleton className='ml-auto h-4 w-16 md:h-5 md:w-20' />
      </TableCell>
      <TableCell className='px-1 text-right md:px-2'>
        <Skeleton className='ml-auto h-4 w-12 md:h-5 md:w-16' />
      </TableCell>
      <TableCell className='px-1 text-right md:px-2'>
        <Skeleton className='ml-auto h-4 w-20 md:h-5 md:w-24' />
      </TableCell>
      <TableCell className='px-1 text-right md:px-2'>
        <Skeleton className='ml-auto h-4 w-20 md:h-5 md:w-24' />
      </TableCell>
    </TableRow>
  ));

const columns: ColumnDef<CoingeckoMarketDataItem>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 180,
    minSize: 120,
    cell: ({ row }) => (
      <div className='flex items-center gap-1 md:gap-2'>
        <Image
          src={row.original.image}
          alt={row.original.name}
          width={20}
          height={20}
          className='size-4 shrink-0 md:size-5'
        />
        <span className='truncate text-xs md:text-sm'>{row.original.name}</span>
      </div>
    ),
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    size: 140,
    minSize: 80,
    cell: ({ row }) => (
      <span className='text-xs uppercase md:text-sm'>{row.original.symbol}</span>
    ),
  },
  {
    accessorKey: 'current_price',
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      const Icon = !sorted
        ? ArrowDownWideNarrowIcon
        : sorted === 'asc'
          ? ChevronUp
          : ChevronDown;
      return (
        <Button
          variant='ghost'
          className='group h-auto p-0 text-xs hover:bg-transparent md:text-sm'
          onClick={column.getToggleSortingHandler()}
        >
          <Icon
            className={cn(
              'size-3 md:size-4',
              !sorted && 'opacity-0 group-hover:opacity-100',
            )}
          />
          <span className='ml-0.5 md:ml-1'>Price</span>
        </Button>
      );
    },
    size: 140,
    cell: ({ row }) => (
      <span className='text-xs md:text-sm'>
        ${row.original.current_price.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'price_change_percentage_24h',
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      const Icon = !sorted
        ? ArrowDownWideNarrowIcon
        : sorted === 'asc'
          ? ChevronUp
          : ChevronDown;
      return (
        <Button
          variant='ghost'
          className='group h-auto p-0 text-xs hover:bg-transparent md:text-sm'
          onClick={column.getToggleSortingHandler()}
        >
          <Icon
            className={cn(
              'size-3 md:size-4',
              !sorted && 'opacity-0 group-hover:opacity-100',
            )}
          />
          <span className='ml-0.5 md:ml-1'>24h Change</span>
        </Button>
      );
    },
    size: 140,
    cell: ({ row }) => {
      const isUp = row.original.price_change_percentage_24h >= 0;
      const color = isUp ? 'text-green-500' : 'text-red-500';
      const Icon = isUp ? ChevronUp : ChevronDown;
      return (
        <span
          className={cn(
            'inline-flex items-center text-xs font-semibold md:text-sm',
            color,
          )}
        >
          <span className='w-3 md:w-4'>
            <Icon className='size-3 md:size-4' />
          </span>
          <span className='w-10 tabular-nums md:w-12'>
            {Math.abs(row.original.price_change_percentage_24h).toFixed(2)}%
          </span>
        </span>
      );
    },
  },
  {
    accessorKey: 'market_cap',
    header: ({ column }) => {
      const sorted = column.getIsSorted();
      const Icon = !sorted
        ? ArrowDownWideNarrowIcon
        : sorted === 'asc'
          ? ChevronUp
          : ChevronDown;
      return (
        <Button
          variant='ghost'
          className='group h-auto p-0 text-xs hover:bg-transparent md:text-sm'
          onClick={column.getToggleSortingHandler()}
        >
          <Icon
            className={cn(
              'size-3 md:size-4',
              !sorted && 'opacity-0 group-hover:opacity-100',
            )}
          />
          <span className='ml-0.5 md:ml-1'>Market Cap</span>
        </Button>
      );
    },
    size: 240,
    cell: ({ row }) => (
      <span className='text-xs md:text-sm'>
        ${row.original.market_cap.toLocaleString()}
      </span>
    ),
  },
  {
    accessorKey: 'total_volume',
    header: () => <span className='text-xs md:text-sm'>24h Volume</span>,
    size: 220,
    cell: ({ row }) => (
      <span className='text-xs md:text-sm'>
        ${row.original.total_volume.toLocaleString()}
      </span>
    ),
  },
];

interface Props {
  data: CoingeckoMarketDataResponse;
  isFetching?: boolean;
}

export const MarketTable = ({ data, isFetching }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className='space-y-4'>
      <div className='relative overflow-hidden rounded-md border'>
        {isFetching && (
          <div className='absolute top-2 right-2 z-10'>
            <Spinner className='size-4 text-muted-foreground' />
          </div>
        )}
        <Table className='min-w-[800px] md:table-fixed'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{
                      width: header.column.getSize(),
                      minWidth:
                        header.column.columnDef.minSize ?? header.column.getSize(),
                    }}
                    className={cn(
                      'px-1 md:px-2',
                      RIGHT_ALIGNED_COLUMNS.includes(header.column.id) && 'text-right',
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        'px-1 md:px-2',
                        RIGHT_ALIGNED_COLUMNS.includes(cell.column.id) && 'text-right',
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

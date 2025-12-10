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
      <TableCell>
        <Skeleton className='h-5 w-32' />
      </TableCell>
      <TableCell>
        <Skeleton className='h-5 w-16' />
      </TableCell>
      <TableCell className='text-right'>
        <Skeleton className='ml-auto h-5 w-20' />
      </TableCell>
      <TableCell className='text-right'>
        <Skeleton className='ml-auto h-5 w-16' />
      </TableCell>
      <TableCell className='text-right'>
        <Skeleton className='ml-auto h-5 w-24' />
      </TableCell>
      <TableCell className='text-right'>
        <Skeleton className='ml-auto h-5 w-24' />
      </TableCell>
    </TableRow>
  ));

const columns: ColumnDef<CoingeckoMarketDataItem>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <div className='flex items-center gap-2'>
        <Image src={row.original.image} alt={row.original.name} width={20} height={20} />
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    size: 140,
    cell: ({ row }) => <span className='uppercase'>{row.original.symbol}</span>,
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
          className='group h-auto p-0 hover:bg-transparent'
          onClick={column.getToggleSortingHandler()}
        >
          <Icon
            className={cn('size-4', !sorted && 'opacity-0 group-hover:opacity-100')}
          />
          Price
        </Button>
      );
    },
    size: 140,
    cell: ({ row }) => <span>${row.original.current_price.toLocaleString()}</span>,
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
          className='group h-auto p-0 hover:bg-transparent'
          onClick={column.getToggleSortingHandler()}
        >
          <Icon
            className={cn('size-4', !sorted && 'opacity-0 group-hover:opacity-100')}
          />
          24h Change
        </Button>
      );
    },
    size: 140,
    cell: ({ row }) => {
      const isUp = row.original.price_change_percentage_24h >= 0;
      const color = isUp ? 'text-green-500' : 'text-red-500';
      const Icon = isUp ? ChevronUp : ChevronDown;
      return (
        <span className={cn('inline-flex items-center font-semibold', color)}>
          <span className='w-4'>
            <Icon className='size-4' />
          </span>
          <span className='w-12 tabular-nums'>
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
          className='group h-auto p-0 hover:bg-transparent'
          onClick={column.getToggleSortingHandler()}
        >
          <Icon
            className={cn('size-4', !sorted && 'opacity-0 group-hover:opacity-100')}
          />
          Market Cap
        </Button>
      );
    },
    size: 240,
    cell: ({ row }) => <span>${row.original.market_cap.toLocaleString()}</span>,
  },
  {
    accessorKey: 'total_volume',
    header: '24h Volume',
    size: 220,
    cell: ({ row }) => <span>${row.original.total_volume.toLocaleString()}</span>,
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
        <Table className='table-fixed'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={
                      header.column.id !== 'name'
                        ? { width: header.getSize() }
                        : undefined
                    }
                    className={
                      RIGHT_ALIGNED_COLUMNS.includes(header.column.id) ? 'text-right' : ''
                    }
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
                      className={
                        RIGHT_ALIGNED_COLUMNS.includes(cell.column.id) ? 'text-right' : ''
                      }
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

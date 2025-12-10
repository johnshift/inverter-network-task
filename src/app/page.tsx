import Link from 'next/link';

import {
  ArrowRight,
  Code,
  Coins,
  History,
  Layers,
  Shield,
  Sparkles,
  Wallet,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-16 md:px-6 md:py-24'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-16 text-center'>
            <h1 className='mb-6 text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl'>
              Inverter Network Task
            </h1>
            <p className='mx-auto max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl'>
              A Next.js application for interacting with ERC-20 tokens on Ethereum and
              displaying cryptocurrency market data. Connect your wallet, mint tokens,
              view transaction history, and explore real-time market data.
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-3'>
            <Link
              href='/mint'
              className='group relative flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:border-input dark:bg-input/30'
            >
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <Wallet className='size-6' />
              </div>
              <h2 className='mb-2 text-xl font-semibold text-foreground'>Mint Token</h2>
              <p className='mb-4 flex-1 text-sm leading-6 text-muted-foreground'>
                Mint ERC-20 tokens on the Sepolia testnet. Connect your wallet and create
                tokens with custom names and symbols.
              </p>
              <Button variant='ghost' size='sm' className='w-fit group-hover:gap-2'>
                Mint Token
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>

            <Link
              href='/transactions'
              className='group relative flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:border-input dark:bg-input/30'
            >
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <History className='size-6' />
              </div>
              <h2 className='mb-2 text-xl font-semibold text-foreground'>Transactions</h2>
              <p className='mb-4 flex-1 text-sm leading-6 text-muted-foreground'>
                View your token transfer history. Track all ERC-20 token transfers for
                your connected wallet address.
              </p>
              <Button variant='ghost' size='sm' className='w-fit group-hover:gap-2'>
                View History
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>

            <Link
              href='/market'
              className='group relative flex flex-col rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md dark:border-input dark:bg-input/30'
            >
              <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                <Coins className='size-6' />
              </div>
              <h2 className='mb-2 text-xl font-semibold text-foreground'>Market Data</h2>
              <p className='mb-4 flex-1 text-sm leading-6 text-muted-foreground'>
                Explore real-time cryptocurrency market data with configurable refresh
                intervals and infinite scroll pagination.
              </p>
              <Button variant='ghost' size='sm' className='w-fit group-hover:gap-2'>
                View Market
                <ArrowRight className='size-4 transition-transform group-hover:translate-x-1' />
              </Button>
            </Link>
          </div>

          <div className='mt-16 space-y-12'>
            <section className='rounded-lg border bg-card p-8 shadow-sm dark:border-input dark:bg-input/30'>
              <div className='mb-6 flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <Layers className='size-5' />
                </div>
                <h2 className='text-2xl font-semibold text-foreground'>
                  Architecture Decisions
                </h2>
              </div>

              <div className='space-y-8'>
                <div>
                  <h3 className='mb-3 text-lg font-semibold text-foreground'>
                    Feature-Based Structure
                  </h3>
                  <p className='mb-4 text-sm leading-6 text-muted-foreground'>
                    The codebase follows a feature-based architecture pattern where each
                    feature is self-contained within its own directory. This structure
                    promotes clear separation of concerns, easier code navigation and
                    maintenance, better scalability as features grow, and reduced coupling
                    between features.
                  </p>
                  <div className='rounded-md bg-muted p-4 font-mono text-xs text-muted-foreground'>
                    <div>src/features/</div>
                    <div className='ml-4'>├── market/ # Market data feature</div>
                    <div className='ml-4'>├── token/ # Token minting feature</div>
                    <div className='ml-4'>└── wallet/ # Wallet connection feature</div>
                  </div>
                </div>

                <div>
                  <h3 className='mb-4 text-lg font-semibold text-foreground'>
                    Technology Choices
                  </h3>
                  <div className='grid gap-6 md:grid-cols-2'>
                    <div>
                      <h4 className='mb-2 font-medium text-foreground'>
                        Framework & Core
                      </h4>
                      <ul className='space-y-1.5 text-sm text-muted-foreground'>
                        <li>• Next.js 16 with App Router</li>
                        <li>• React 19</li>
                        <li>• TypeScript</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className='mb-2 font-medium text-foreground'>
                        Blockchain Integration
                      </h4>
                      <ul className='space-y-1.5 text-sm text-muted-foreground'>
                        <li>• Wagmi - React hooks for Ethereum</li>
                        <li>• Viem - TypeScript Ethereum library</li>
                        <li>• RainbowKit - Wallet connection UI</li>
                        <li>• Alchemy - Ethereum RPC provider</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className='mb-2 font-medium text-foreground'>
                        State Management & Data Fetching
                      </h4>
                      <ul className='space-y-1.5 text-sm text-muted-foreground'>
                        <li>• TanStack Query (React Query)</li>
                        <li>• @lukemorales/query-key-factory</li>
                        <li>• Zod - Schema validation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className='mb-2 font-medium text-foreground'>UI & Styling</h4>
                      <ul className='space-y-1.5 text-sm text-muted-foreground'>
                        <li>• Tailwind CSS 4</li>
                        <li>• shadcn/ui</li>
                        <li>• Radix UI</li>
                        <li>• Lucide React</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className='mb-3 text-lg font-semibold text-foreground'>
                    Design Patterns
                  </h3>
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 text-primary'>•</span>
                      <span>
                        <strong className='text-foreground'>Custom Hooks Pattern</strong>:
                        Business logic extracted into reusable hooks (e.g., useMarketData,
                        useMintToken, useCooldown)
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 text-primary'>•</span>
                      <span>
                        <strong className='text-foreground'>Provider Pattern</strong>:
                        Context providers wrap the application for global state (React
                        Query, RainbowKit, Theme)
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 text-primary'>•</span>
                      <span>
                        <strong className='text-foreground'>Protected Routes</strong>:
                        Route protection handled at the layout level for authenticated
                        features
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 text-primary'>•</span>
                      <span>
                        <strong className='text-foreground'>Error Boundaries</strong>:
                        React Error Boundaries catch and display errors gracefully
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 text-primary'>•</span>
                      <span>
                        <strong className='text-foreground'>
                          Schema-First Validation
                        </strong>
                        : Zod schemas define data contracts for API responses and forms
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-1 text-primary'>•</span>
                      <span>
                        <strong className='text-foreground'>Query Key Factory</strong>:
                        Centralized, type-safe query key management prevents key
                        mismatches
                      </span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className='mb-3 text-lg font-semibold text-foreground'>
                    Code Quality
                  </h3>
                  <ul className='space-y-1.5 text-sm text-muted-foreground'>
                    <li>• ESLint with Next.js and Prettier configurations</li>
                    <li>• Prettier for code formatting</li>
                    <li>• TypeScript strict mode enabled</li>
                    <li>
                      • Git Hooks (via simple-git-hooks): Pre-commit lint, Pre-push type
                      check & build, Commit-msg conventional commit validation
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className='rounded-lg border bg-card p-8 shadow-sm dark:border-input dark:bg-input/30'>
              <div className='mb-6 flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <Shield className='size-5' />
                </div>
                <h2 className='text-2xl font-semibold text-foreground'>
                  Known Limitations / Tradeoffs
                </h2>
              </div>

              <div className='space-y-6'>
                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>Rate Limiting</h3>
                  <p className='mb-2 text-sm leading-6 text-muted-foreground'>
                    The market data feature uses CoinGecko&apos;s free tier API which has
                    rate limits (30 requests per minute). When rate limited, the app
                    displays a cooldown indicator and prevents further requests.
                    Mitigation includes cooldown mechanisms and configurable refresh
                    intervals.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>
                    Network Restrictions
                  </h3>
                  <p className='mb-2 text-sm leading-6 text-muted-foreground'>
                    Token minting is restricted to Sepolia testnet only. Users must switch
                    networks manually if connected to mainnet. This limits functionality
                    to testnet but ensures safety during development/testing.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>
                    Client-Side API Calls
                  </h3>
                  <p className='mb-2 text-sm leading-6 text-muted-foreground'>
                    Market data API calls are made directly from the client with no
                    backend proxy or caching layer. Simpler architecture but exposes API
                    keys and subject to browser CORS policies.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>
                    Pagination Strategy
                  </h3>
                  <p className='mb-2 text-sm leading-6 text-muted-foreground'>
                    Market data uses infinite scroll pagination with 5 items per page
                    (CoinGecko limitation). Smaller page sizes reduce initial load time
                    but require more requests for large datasets.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>
                    Wallet Connection
                  </h3>
                  <p className='mb-2 text-sm leading-6 text-muted-foreground'>
                    RainbowKit is configured with SSR support. Wallet connection state may
                    flash on initial load. Tradeoff: Better SEO and initial load
                    performance, but slight UX tradeoff during hydration.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>Error Handling</h3>
                  <p className='mb-2 text-sm leading-6 text-muted-foreground'>
                    Errors are caught at component boundaries. Some errors may not be
                    caught if they occur outside React component tree. Good coverage for
                    most cases, but not 100% comprehensive.
                  </p>
                </div>
              </div>
            </section>

            <section className='rounded-lg border bg-card p-8 shadow-sm dark:border-input dark:bg-input/30'>
              <div className='mb-6 flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <Zap className='size-5' />
                </div>
                <h2 className='text-2xl font-semibold text-foreground'>Time Spent</h2>
              </div>

              <div className='space-y-4'>
                <div>
                  <p className='mb-3 text-lg font-semibold text-foreground'>
                    Total: ~8 hours
                  </p>
                </div>
                <div>
                  <h3 className='mb-2 font-medium text-foreground'>
                    Feature Implementation: ~6 hours
                  </h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Each challenge took approximately 1-2 hours to implement. Includes
                    token minting, market data display, transaction history, and wallet
                    integration.
                  </p>
                </div>
                <div>
                  <h3 className='mb-2 font-medium text-foreground'>
                    Research, Documentation & Setup: ~2 hours
                  </h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Tooling, repo setup, getting API keys, reading Wagmi/Viem/RainbowKit
                    documentation, researching CoinGecko API integration, and
                    understanding React Query patterns and best practices.
                  </p>
                </div>
              </div>
            </section>

            <section className='rounded-lg border bg-card p-8 shadow-sm dark:border-input dark:bg-input/30'>
              <div className='mb-6 flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <Sparkles className='size-5' />
                </div>
                <h2 className='text-2xl font-semibold text-foreground'>
                  Recommended Improvements
                </h2>
              </div>

              <div className='space-y-4'>
                <div>
                  <h3 className='mb-2 font-medium text-foreground'>Theming</h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Use theme generators to customize the design system
                    (shadcnstudio.com/theme-generator, tweakcn.com)
                  </p>
                </div>
                <div>
                  <h3 className='mb-2 font-medium text-foreground'>
                    Connect Wallet Flicker
                  </h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Customize rainbowkit authentication and implement session so it can be
                    accessed during SSR to fix connect wallet button flicker on
                    authenticated session page refresh.
                  </p>
                </div>
                <div>
                  <h3 className='mb-2 font-medium text-foreground'>Security</h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Once deployed, restrict ALCHEMY_KEY to specific domains or IPs in
                    Alchemy dashboard settings.
                  </p>
                </div>
                <div>
                  <h3 className='mb-2 font-medium text-foreground'>
                    Multi-Tab Synchronization
                  </h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Use broadcastQueryClient from TanStack Query to support multi-tab
                    query invalidation and state synchronization.
                  </p>
                </div>
                <div>
                  <h3 className='mb-2 font-medium text-foreground'>Analytics</h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Implement analytics events for page loads, Alchemy RPC calls, rate
                    limit errors, mint events, and wallet connection/disconnection events.
                  </p>
                </div>
                <div>
                  <h3 className='mb-2 font-medium text-foreground'>SEO Optimizations</h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Add page-specific metadata for each route, implement JSON-LD, and SSR
                    first page of the list.
                  </p>
                </div>
              </div>
            </section>

            <section className='rounded-lg border bg-card p-8 shadow-sm dark:border-input dark:bg-input/30'>
              <div className='mb-6 flex items-center gap-3'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <Code className='size-5' />
                </div>
                <h2 className='text-2xl font-semibold text-foreground'>
                  Issues & Tradeoffs
                </h2>
              </div>

              <div className='space-y-6'>
                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>
                    RainbowKit Theme SSR Hydration Issue
                  </h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Theme hydration mismatch between server and client in development.
                    Only occurs in development environment, not in production.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>
                    RainbowKit RPC Provider Rate Limiting
                  </h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    RainbowKit uses public RPC providers by default, which are rate
                    limited. Solution: Purchase access to a dedicated RPC provider
                    (Alchemy, QuickNode) and update transports in RainbowKit config.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>
                    ReferenceError: indexedDB is not defined
                  </h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    SSR environment doesn&apos;t have indexedDB available, causing errors
                    with WalletConnect wallets. Workaround: Conditional wallet loading
                    based on indexedDB availability. Reference: rainbow-me/rainbowkit#2476
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>
                    ERC20 Transfer Event Rate Limiting
                  </h3>
                  <p className='text-sm leading-6 text-muted-foreground'>
                    Direct RPC calls for transfer events are rate limited (1000 blocks per
                    request). Solution: Switched to Alchemy API for transfer event queries
                    instead of direct RPC calls.
                  </p>
                </div>

                <div>
                  <h3 className='mb-2 font-semibold text-foreground'>
                    CoinGecko API Limitations
                  </h3>
                  <p className='mb-2 text-sm leading-6 text-muted-foreground'>
                    Query priority: id &gt; names &gt; symbols. Cannot query names and
                    symbols in a single request. Rate limits: 30 requests per minute on
                    free tier. Implemented cooldown mechanism to handle rate limiting
                    gracefully.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

# Inverter Network Task

A Next.js application for interacting with ERC-20 tokens on Ethereum and displaying cryptocurrency market data.

## Setup

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd inverter-network-task
```

2. Install dependencies:

```bash
pnpm install
```

3. Setup git hooks:

```bash
npx simple-git-hooks
```

4. Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_ALCHEMY_KEY=your_alchemy_api_key
```

**Getting API Keys:**

- **WalletConnect Project ID**: Sign up at [WalletConnect Cloud](https://cloud.walletconnect.com/) and create a new project
- **Alchemy Key**: Sign up at [Alchemy](https://www.alchemy.com/) and create an app to get your API key

5. Verify environment variables are properly configured (the app will throw an error on startup if they're missing or invalid)

## How to Run

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Production Build

Build the application for production:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start
```

## Architecture Decisions

### Feature-Based Structure

The codebase follows a feature-based architecture pattern where each feature is self-contained within its own directory:

```
src/features/
  ├── market/          # Market data feature
  │   ├── api/         # API calls
  │   ├── components/  # Feature-specific components
  │   ├── hooks/       # Feature-specific hooks
  │   ├── pages/       # Page components
  │   ├── queries.ts   # React Query definitions
  │   └── schemas.ts   # Zod validation schemas
  ├── token/           # Token minting feature
  └── wallet/          # Wallet connection feature
```

**Rationale**: This structure promotes:

- Clear separation of concerns
- Easier code navigation and maintenance
- Better scalability as features grow
- Reduced coupling between features

### Technology Choices

**Framework & Core:**

- **Next.js 16** with App Router - Server-side rendering, routing, and optimization
- **React 19** - Latest React features and performance improvements
- **TypeScript** - Type safety and better developer experience

**Blockchain Integration:**

- **Wagmi** - React hooks for Ethereum interactions
- **Viem** - TypeScript Ethereum library
- **RainbowKit** - Wallet connection UI and management
- **Alchemy** - Ethereum RPC provider

**State Management & Data Fetching:**

- **TanStack Query (React Query)** - Server state management, caching, and synchronization
- **@lukemorales/query-key-factory** - Type-safe query key management
- **Zod** - Schema validation and type inference

**UI & Styling:**

- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Radix UI** - Unstyled, accessible component primitives
- **Lucide React** - Icon library

**Other:**

- **React Error Boundary** - Error handling and recovery
- **Sonner** - Toast notifications
- **next-themes** - Theme management (light/dark mode)

### Design Patterns

1. **Custom Hooks Pattern**: Business logic is extracted into reusable hooks (e.g., `useMarketData`, `useMintToken`, `useCooldown`)

2. **Provider Pattern**: Context providers wrap the application for global state (React Query, RainbowKit, Theme)

3. **Protected Routes**: Route protection is handled at the layout level for authenticated features

4. **Error Boundaries**: React Error Boundaries catch and display errors gracefully

5. **Schema Validation**: Zod schemas define data contracts for API responses and forms

6. **Query Key Factory**: Centralized, type-safe query key management prevents key mismatches

### Code Quality

- **ESLint** with Next.js and Prettier configurations
- **Prettier** for code formatting
- **TypeScript** strict mode enabled
- **Git Hooks** (via simple-git-hooks):
  - Pre-commit: Lint staged files
  - Pre-push: Type check, build, and test
  - Commit-msg: Conventional commit validation

## Known Limitations / Tradeoffs

### Rate Limiting

**CoinGecko API Rate Limits:**

- The market data feature uses CoinGecko's free tier API which has rate limits
- When rate limited (429 status), the app displays a cooldown indicator and prevents further requests
- The app implements retry logic but skips retries for rate limit errors to avoid unnecessary requests
- **Tradeoff**: Free tier limitations may impact user experience during high-frequency usage

**Mitigation**:

- Cooldown mechanism prevents users from making requests during rate limit periods
- Configurable refresh intervals allow users to control update frequency

### Network Restrictions

**Sepolia Network Requirement:**

- Token minting is restricted to Sepolia testnet only
- Users must switch networks manually if connected to mainnet
- **Tradeoff**: Limits functionality to testnet, but ensures safety during development/testing

### Client-Side API Calls

**Direct API Calls:**

- Market data API calls are made directly from the client
- No backend proxy or caching layer
- **Tradeoff**: Simpler architecture but exposes API keys and subject to browser CORS policies

### Pagination Strategy

**Infinite Scroll:**

- Market data uses infinite scroll pagination
- Each page loads 5 items (CoinGecko limitation)
- **Tradeoff**: Smaller page sizes reduce initial load time but require more requests for large datasets

### Wallet Connection

**SSR Considerations:**

- RainbowKit is configured with SSR support
- Wallet connection state may flash on initial load
- **Tradeoff**: Better SEO and initial load performance, but slight UX tradeoff during hydration

### Error Handling

**Error Boundaries:**

- Errors are caught at component boundaries
- Some errors may not be caught if they occur outside React component tree
- **Tradeoff**: Good coverage for most cases, but not 100% comprehensive

## Time Spent

**Total: ~8 hours**

### Breakdown

- **Feature Implementation**: ~6 hours
  - Each challenge took approximately 1-2 hours to implement
  - Includes token minting, market data display, transaction history, and wallet integration

- **Research, Documentation & Setup**: ~2 hours
  - Tooling, repo setup getting API keys etc
  - Reading Wagmi, Viem, and RainbowKit documentation
  - Researching CoinGecko API integration
  - Searching GitHub issues and community solutions for common problems
  - Understanding React Query patterns and best practices

## Recommended Improvements

### Theming

- Use theme generators to customize the design system:
  - [shadcnstudio.com/theme-generator](https://shadcnstudio.com/theme-generator)
  - [tweakcn.com](https://tweakcn.com/)

### Connect Wallet Flicker

- **Issue**: Connect wallet button flickers on authenticated session page refresh
- **Solution**: Customize rainbowkit authentication and implement session so it can be accessed during SSR

### Security

- **Alchemy API Key**: Once deployed, restrict `ALCHEMY_KEY` to specific domains or IPs in Alchemy dashboard settings

### Multi-Tab Synchronization

- Use `broadcastQueryClient` from TanStack Query to support multi-tab query invalidation and state synchronization

### Analytics

Implement analytics events for:

- Page loads
- Requests involving Alchemy (RPC calls)
- Rate limit errors
- Mint events
- Wallet connection/disconnection events

### SEO Optimizations

- Add page-specific metadata for each route
- Implement JSON-LD
- SSR first page of the list

## Issues & Tradeoffs

### RainbowKit Theme SSR Hydration Issue

- **Issue**: Theme hydration mismatch between server and client in development
- **Note**: Only occurs in development environment, not in production

### RainbowKit RPC Provider Rate Limiting

- **Issue**: RainbowKit uses public RPC providers by default, which are rate limited
- **Solution**: Purchase access to a dedicated RPC provider (Alchemy, QuickNode) and update transports in RainbowKit config
- **Reference**: See `src/features/wallet/config/rainbowkit-config.ts`

### ReferenceError: indexedDB is not defined

- **Issue**: SSR environment doesn't have `indexedDB` available, causing errors with WalletConnect wallets
- **Workaround**: Conditional wallet loading based on `indexedDB` availability
- **Reference**: [rainbow-me/rainbowkit#2476](https://github.com/rainbow-me/rainbowkit/issues/2476)
- **Implementation**: See `src/features/wallet/config/rainbowkit-config.ts` line 26

### Module not found: @react-native-async-storage/async-storage

- **Issue**: RainbowKit dependency issue causing build errors
- **Reference**: [rainbow-me/rainbowkit#2555](https://github.com/rainbow-me/rainbowkit/issues/2555)

### ERC20 Transfer Event Rate Limiting

- **Issue**: Direct RPC calls for transfer events are rate limited (1000 blocks per request)
- **Solution**: Switched to Alchemy API for transfer event queries instead of direct RPC calls
- **Implementation**: See `src/features/token/api/get-token-transfers.ts`

### CoinGecko API Limitations

**Priority Order:**

- Query priority: `id` > `names` > `symbols`
- Cannot query `names` and `symbols` in a single request

**Rate Limits:**

- 30 requests per minute on free tier
- Implemented cooldown mechanism to handle rate limiting gracefully

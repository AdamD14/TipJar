const fs = require('fs');
const path = require('path');

const srcDir = '/home/tipjar/TipJar/tipjar+-creator-studio/pages';
const destDir = '/home/tipjar/TipJar/frontend/src/app';

// Read all files from srcDir
const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.tsx'));

const routeMapping = {
  'Dashboard.tsx': 'studio/page.tsx',
  'CreatorStudio.tsx': 'studio/creator-studio/page.tsx',
  'WalletPage.tsx': 'studio/wallet/page.tsx',
  'ProfilePage.tsx': 'studio/profile/page.tsx',
  'SettingsPage.tsx': 'studio/settings/page.tsx',
  'InsightsPage.tsx': 'studio/insights/page.tsx',
  'MonetizationPage.tsx': 'studio/monetization/page.tsx',
  'FeedPage.tsx': 'studio/feed/page.tsx',
  'InteractionsPage.tsx': 'studio/interactions/page.tsx',
  'SupportersPage.tsx': 'studio/supporters/page.tsx',
  'AutomationPage.tsx': 'studio/automation/page.tsx',
  'ModerationPage.tsx': 'studio/moderation/page.tsx',
  'MediaKitPage.tsx': 'studio/mediakit/page.tsx',
  'TeamPage.tsx': 'studio/team/page.tsx',
  'EventsPage.tsx': 'studio/events/page.tsx',
  'AITrainingPage.tsx': 'studio/ai-training/page.tsx',
  'PredictiveAIPage.tsx': 'studio/predictive/page.tsx',
  'AIClipStudioPage.tsx': 'studio/clips/page.tsx',
  'TTSStudioPage.tsx': 'studio/tts/page.tsx',
  'MarketplacePage.tsx': 'studio/marketplace/page.tsx',
  'CommunityRewardsPage.tsx': 'studio/rewards/page.tsx',
  'CampaignsPage.tsx': 'studio/campaigns/page.tsx',
  'BusinessCRMPage.tsx': 'studio/crm/page.tsx',
  'DistributionHubPage.tsx': 'studio/distribution/page.tsx',
  'FulfillmentCenterPage.tsx': 'studio/fulfillment/page.tsx',
  'TaxCenterPage.tsx': 'studio/tax/page.tsx',
  'CompliancePage.tsx': 'studio/compliance/page.tsx',
  'GovernancePage.tsx': 'studio/governance/page.tsx',
  'LegalCenterPage.tsx': 'studio/legal/page.tsx',
  'FanPollsPage.tsx': 'studio/polls/page.tsx',
  'SecurityAuditPage.tsx': 'studio/audit/page.tsx',
  'DevCenterPage.tsx': 'studio/dev/page.tsx',
  'AssetVaultPage.tsx': 'studio/vault/page.tsx',
  'RevenueHealthPage.tsx': 'studio/health/page.tsx',
  'PartnerPage.tsx': 'studio/partners/page.tsx',
  'MobileControlPage.tsx': 'studio/remote/page.tsx',
  'BrandConnectPage.tsx': 'studio/brand-connect/page.tsx',
  'WidgetPreview.tsx': 'studio/widget/preview/page.tsx',
  'OverlayPage.tsx': 'studio/overlay/[creatorId]/page.tsx',
  // Marketing / Legal pages
  'WhyPage.tsx': '(marketing)/why/page.tsx',
  'HowPage.tsx': '(marketing)/how/page.tsx',
  'AIPage.tsx': '(marketing)/ai/page.tsx',
  'SupportPage.tsx': '(marketing)/support/page.tsx',
  'ContactPage.tsx': '(marketing)/contact/page.tsx',
  'HelpPage.tsx': '(marketing)/help/page.tsx',
  'StatusPage.tsx': '(marketing)/status/page.tsx',
  'LegalTermsPage.tsx': '(marketing)/legal/terms/page.tsx',
  'LegalPrivacyPage.tsx': '(marketing)/legal/privacy/page.tsx',
  'LegalCookiesPage.tsx': '(marketing)/legal/cookies/page.tsx',
  'LegalDMCAPage.tsx': '(marketing)/legal/dmca/page.tsx',
  'NotFoundPage.tsx': 'not-found.tsx',
};

// Viewer pages map to dynamic routes that already exist or are new context
// ViewerProfilePage -> already handled by app/[username]/page.tsx
// ViewerInteractionPage -> not strictly studio, mapped to app/interact/[id]/page.tsx

files.forEach(file => {
  const mapping = routeMapping[file];
  if (!mapping) {
    console.log(`Skipping ${file}`);
    return;
  }
  
  const content = fs.readFileSync(path.join(srcDir, file), 'utf8');
  
  let newContent = `"use client";\n\n` + content;
  
  // Replace imports
  newContent = newContent
    .replace(/import { Link([^}]*)} from 'react-router-dom';/g, "import Link from 'next/link';")
    .replace(/import {([^}]*)Link([^}]*)} from 'react-router-dom';/g, "import {$1$2} from 'next/navigation';\nimport Link from 'next/link';")
    .replace(/import {([^}]*)} from 'react-router-dom';/g, "import { useParams, useRouter, usePathname, useSearchParams } from 'next/navigation';")
    .replace(/from '\.\.\/components\/([^']+)'/g, "from '@/components/studio/$1'")
    .replace(/from '\.\.\/stores\/([^']+)'/g, "from '@/lib/store/$1'")
    .replace(/from '\.\.\/types\/([^']+)'/g, "from '@/lib/types/$1'")
    .replace(/from '\.\.\/types'/g, "from '@/lib/types/studio'")
    .replace(/from '\.\.\/constants'/g, "from '@/lib/constants/studio'");
    
  // Hooks
  newContent = newContent
    .replace(/const navigate = useNavigate\(\);/g, "const router = useRouter();")
    .replace(/navigate\(/g, "router.push(")
    .replace(/const location = useLocation\(\);/g, "const pathname = usePathname();")
    .replace(/location\.pathname/g, "pathname");

  const destPath = path.join(destDir, mapping);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, newContent);
  console.log(`Migrated ${file} -> ${mapping}`);
});
